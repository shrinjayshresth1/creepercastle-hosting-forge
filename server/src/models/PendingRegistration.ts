import { Schema, model, Document } from "mongoose";

/**
 * Temporarily stores partial registration data while the user
 * completes the email → mobile OTP flow.
 * Auto-deleted after 30 minutes.
 */
export interface IPendingRegistration extends Document {
  email: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  /** Short-lived JWT token given back to the frontend after each step */
  stepToken: string;
  expiresAt: Date;
}

const pendingSchema = new Schema<IPendingRegistration>({
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  stepToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

pendingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PendingRegistration = model<IPendingRegistration>(
  "PendingRegistration",
  pendingSchema
);
