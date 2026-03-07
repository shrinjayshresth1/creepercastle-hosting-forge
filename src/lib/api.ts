/**
 * Typed API client — all calls go through here so the base URL is
 * never hardcoded in component files.
 *
 * Set VITE_API_URL in your .env.local, e.g.:
 *   VITE_API_URL=http://localhost:5000
 */

const BASE = import.meta.env.VITE_API_URL ?? "";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include", // send httpOnly refresh-token cookie
    ...options,
  });

  let body: unknown;
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  if (!res.ok) {
    const msg =
      typeof body === "object" && body !== null && "message" in body
        ? (body as { message: string }).message
        : "Something went wrong. Please try again.";
    throw new Error(msg);
  }

  return body as T;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  kycStatus: "pending" | "submitted" | "approved" | "rejected";
  twoFactorEnabled: boolean;
  lastLoginAt?: string;
  role: "customer" | "admin";
  companyName?: string;
  taxId?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
  };
}

export interface MeResponse {
  user: User;
}

/** Step 1a — send OTP to email */
export function sendEmailOtp(email: string) {
  return request<{ message: string }>("/api/auth/register/send-email-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/** Step 1b — verify email OTP → receive a short-lived pendingEmailToken */
export function verifyEmailOtp(email: string, otp: string) {
  return request<{ pendingEmailToken: string }>(
    "/api/auth/register/verify-email-otp",
    { method: "POST", body: JSON.stringify({ email, otp }) }
  );
}

/** Step 2a — send OTP to mobile */
export function sendMobileOtp(phone: string, pendingEmailToken: string) {
  return request<{ message: string }>("/api/auth/register/send-mobile-otp", {
    method: "POST",
    body: JSON.stringify({ phone, pendingEmailToken }),
  });
}

/** Step 2b — verify mobile OTP → receive pendingFullToken */
export function verifyMobileOtp(phone: string, otp: string, pendingEmailToken: string) {
  return request<{ pendingFullToken: string }>(
    "/api/auth/register/verify-mobile-otp",
    { method: "POST", body: JSON.stringify({ phone, otp, pendingEmailToken }) }
  );
}

/** Step 3 — complete registration (name, password, billing address) */
export interface CompleteRegisterPayload {
  name: string;
  password: string;
  companyName?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
  };
  taxId?: string;
  pendingFullToken: string;
}

export function completeRegister(payload: CompleteRegisterPayload) {
  return request<AuthTokens & { user: User }>("/api/auth/register/complete", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Login */
export function login(email: string, password: string) {
  return request<AuthTokens & { user: User }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/** Refresh access token using httpOnly cookie */
export function refreshToken() {
  return request<AuthTokens>("/api/auth/refresh", { method: "POST" });
}

/** Logout — clears refresh token cookie server-side */
export function logout() {
  return request<{ message: string }>("/api/auth/logout", { method: "POST" });
}

/** Get authed user */
export function getMe(accessToken: string) {
  return request<MeResponse>("/api/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** Send forgot-password OTP */
export function sendPasswordResetOtp(email: string) {
  return request<{ message: string }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/** Reset password */
export function resetPassword(email: string, otp: string, newPassword: string) {
  return request<{ message: string }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, otp, newPassword }),
  });
}

// ─── KYC ─────────────────────────────────────────────────────────────────────

/** Initiate Aadhaar OTP */
export function kycSendOtp(aadhaarNumber: string) {
  return request<{ message: string; transactionId: string }>("/api/kyc/send-otp", {
    method: "POST",
    body: JSON.stringify({ aadhaarNumber }),
  });
}

/** Verify Aadhaar OTP */
export function kycVerifyOtp(transactionId: string, otp: string) {
  return request<{ message: string; kycStatus: string }>("/api/kyc/verify-otp", {
    method: "POST",
    body: JSON.stringify({ transactionId, otp }),
  });
}

// ─── Payment ──────────────────────────────────────────────────────────────────

export interface CreateOrderResponse {
  orderId: string;
  paymentUrl: string;
  sessionId: string;
}

export interface OrderStatusResponse {
  orderId: string;
  status: "created" | "pending" | "paid" | "failed" | "cancelled";
  amount: number;
  description: string;
}

/** Create a payment order and get the HDFC redirect URL */
export function createOrder(body: { amount: number; description: string }, accessToken: string) {
  return request<CreateOrderResponse>("/api/payment/create-order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** Poll payment status for a given orderId */
export function getOrderStatus(orderId: string) {
  return request<OrderStatusResponse>(
    `/api/payment/status/${encodeURIComponent(orderId)}`
  );
}
