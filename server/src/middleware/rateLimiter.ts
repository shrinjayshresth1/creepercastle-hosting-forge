import rateLimit from "express-rate-limit";

/** Strict limit for OTP send endpoints (prevent SMS/email abuse) */
export const otpSendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: { message: "Too many OTP requests. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

/** General auth endpoint limit */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
