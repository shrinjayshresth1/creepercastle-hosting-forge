import { Schema, model, Document } from "mongoose";

/**
 * Stores hashed OTPs with TTL.
 * Used for: email OTP, mobile OTP, password reset OTP.
 */
export interface IOtpRecord extends Document {
  identifier: string;  // email or phone
  type: "email-verify" | "phone-verify" | "password-reset";
  otpHash: string;
  attempts: number;
  expiresAt: Date;
}

const otpRecordSchema = new Schema<IOtpRecord>({
  identifier: { type: String, required: true },
  type: { type: String, required: true, enum: ["email-verify", "phone-verify", "password-reset"] },
  otpHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
});

// Auto-delete expired documents
otpRecordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// Unique per (identifier, type) — one active OTP at a time
otpRecordSchema.index({ identifier: 1, type: 1 }, { unique: true });

export const OtpRecord = model<IOtpRecord>("OtpRecord", otpRecordSchema);
