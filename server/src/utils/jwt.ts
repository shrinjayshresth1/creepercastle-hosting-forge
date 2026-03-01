import jwt from "jsonwebtoken";

function secret(envKey: string): string {
  const s = process.env[envKey];
  if (!s) throw new Error(`${envKey} is not set`);
  return s;
}

// ─── Access token (15 min) ────────────────────────────────────────────────────

export interface AccessPayload {
  sub: string; // User _id
  role: string;
}

export function signAccessToken(payload: AccessPayload): string {
  return jwt.sign(payload, secret("ACCESS_TOKEN_SECRET"), { expiresIn: "15m" });
}

export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, secret("ACCESS_TOKEN_SECRET")) as AccessPayload;
}

// ─── Refresh token (7 days) ───────────────────────────────────────────────────

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId }, secret("REFRESH_TOKEN_SECRET"), { expiresIn: "7d" });
}

export function verifyRefreshToken(token: string): { sub: string } {
  return jwt.verify(token, secret("REFRESH_TOKEN_SECRET")) as { sub: string };
}

// ─── Step tokens (used between OTP steps, 30 min) ────────────────────────────

export interface StepPayload {
  purpose: "email-verified" | "phone-verified";
  email: string;
  phone?: string;
}

export function signStepToken(payload: StepPayload): string {
  return jwt.sign(payload, secret("STEP_TOKEN_SECRET"), { expiresIn: "30m" });
}

export function verifyStepToken(token: string): StepPayload {
  return jwt.verify(token, secret("STEP_TOKEN_SECRET")) as StepPayload;
}
