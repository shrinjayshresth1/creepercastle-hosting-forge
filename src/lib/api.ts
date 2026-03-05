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
  role: "customer" | "admin";
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

/** Step 2 — complete registration (name, password, billing address) */
export interface CompleteRegisterPayload {
  name: string;
  phone: string;
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
  pendingEmailToken: string;
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
