import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  userId: Types.ObjectId;
  /** Merchant-generated order ID, e.g. "CC-1709734800123-A1B2" */
  orderId: string;
  /** Amount in Indian Rupees (not paise) */
  amount: number;
  currency: string;
  description: string;
  status: "created" | "pending" | "paid" | "failed" | "cancelled";
  /** HDFC session ID returned on session creation */
  hdfcSessionId?: string;
  /** HDFC transaction/payment ID from webhook or status check */
  hdfcTransactionId?: string;
  /** Raw webhook payload stored for audit / dispute resolution */
  hdfcRawWebhook?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["created", "pending", "paid", "failed", "cancelled"],
      default: "created",
    },
    hdfcSessionId: String,
    hdfcTransactionId: String,
    hdfcRawWebhook: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
