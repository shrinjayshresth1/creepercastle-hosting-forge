import crypto from "crypto";
import bcrypt from "bcryptjs";
import { OtpRecord, type IOtpRecord } from "../models/OtpRecord";

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

/** Generate a 6-digit numeric OTP, persist its hash, return plaintext */
export async function createOtp(
  identifier: string,
  type: IOtpRecord["type"]
): Promise<string> {
  const otp = String(Math.floor(100000 + crypto.randomInt(900000)));
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  await OtpRecord.findOneAndUpdate(
    { identifier, type },
    { otpHash, attempts: 0, expiresAt },
    { upsert: true, new: true }
  );

  return otp;
}

/** Verify OTP. Throws with a user-friendly message on failure. */
export async function verifyOtp(
  identifier: string,
  type: IOtpRecord["type"],
  plainOtp: string
): Promise<void> {
  const record = await OtpRecord.findOne({ identifier, type });

  if (!record) throw new Error("OTP not found or expired. Please request a new one.");
  if (record.expiresAt < new Date()) {
    await record.deleteOne();
    throw new Error("OTP has expired. Please request a new one.");
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    await record.deleteOne();
    throw new Error("Too many incorrect attempts. Please request a new OTP.");
  }

  const match = await bcrypt.compare(plainOtp, record.otpHash);
  if (!match) {
    record.attempts += 1;
    await record.save();
    const remaining = MAX_ATTEMPTS - record.attempts;
    throw new Error(
      remaining > 0
        ? `Incorrect OTP. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
        : "Too many incorrect attempts. Please request a new OTP."
    );
  }

  // Valid — delete the record so it can't be reused
  await record.deleteOne();
}
