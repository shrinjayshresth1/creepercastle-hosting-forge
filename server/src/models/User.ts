import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  kycStatus: "pending" | "submitted" | "approved" | "rejected";
  aadhaarLast4?: string;
  twoFactorEnabled: boolean;
  lastLoginAt?: Date;
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
  refreshTokenHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    kycStatus: { type: String, enum: ["pending", "submitted", "approved", "rejected"], default: "pending" },
    aadhaarLast4: String,
    twoFactorEnabled: { type: Boolean, default: false },
    lastLoginAt: Date,
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    companyName: String,
    taxId: String,
    address: {
      street: String,
      city: String,
      state: String,
      postCode: String,
      country: String,
    },
    refreshTokenHash: String,
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
