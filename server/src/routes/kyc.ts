import crypto from "crypto";
import { Router, Response } from "express";
import { User } from "../models/User";
import { requireAuth, type AuthRequest } from "../middleware/auth";
import { otpSendLimiter, authLimiter } from "../middleware/rateLimiter";

const router = Router();

// In-memory transaction store (replace with Redis in production)
interface KycTransaction {
  userId: string;
  aadhaarLast4: string;
  expiresAt: Date;
}
const pendingTx = new Map<string, KycTransaction>();

// ─── POST /api/kyc/send-otp ───────────────────────────────────────────────────

router.post(
  "/send-otp",
  requireAuth,
  otpSendLimiter,
  async (req: AuthRequest, res: Response) => {
    try {
      const { aadhaarNumber } = req.body as { aadhaarNumber?: string };
      const digits = (aadhaarNumber ?? "").replace(/\s/g, "");

      if (!/^\d{12}$/.test(digits)) {
        res.status(400).json({ message: "Enter a valid 12-digit Aadhaar number" });
        return;
      }

      const last4 = digits.slice(-4);
      const transactionId = crypto.randomBytes(16).toString("hex");

      pendingTx.set(transactionId, {
        userId: req.userId!,
        aadhaarLast4: last4,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      });

      // TODO: replace with licensed Aadhaar OTP provider (e.g. Sandbox.co.in)
      // In production:
      //   const { transactionId: txId } = await aadhaarProvider.generateOtp(digits);
      // Dev mode: OTP would be sent to Aadhaar-linked mobile — we accept any 6-digit below.
      console.log(`[kyc/send-otp] Dev: OTP would be sent to Aadhaar-linked mobile for xxxx${last4}`);

      res.json({
        message: "OTP sent to your Aadhaar-linked mobile number",
        transactionId,
      });
    } catch (err) {
      console.error("[kyc/send-otp]", err);
      res.status(500).json({ message: "Failed to initiate KYC. Please try again." });
    }
  }
);

// ─── POST /api/kyc/verify-otp ─────────────────────────────────────────────────

router.post(
  "/verify-otp",
  requireAuth,
  authLimiter,
  async (req: AuthRequest, res: Response) => {
    try {
      const { transactionId, otp } = req.body as {
        transactionId?: string;
        otp?: string;
      };

      if (!transactionId || !otp) {
        res.status(400).json({ message: "transactionId and OTP are required" });
        return;
      }

      if (!/^\d{6}$/.test(otp)) {
        res.status(400).json({ message: "Enter a valid 6-digit OTP" });
        return;
      }

      const tx = pendingTx.get(transactionId);
      if (!tx) {
        res.status(400).json({ message: "Invalid or expired session. Please start over." });
        return;
      }

      if (tx.expiresAt < new Date()) {
        pendingTx.delete(transactionId);
        res.status(400).json({ message: "OTP expired. Please request a new one." });
        return;
      }

      if (tx.userId !== req.userId) {
        res.status(403).json({ message: "Unauthorized" });
        return;
      }

      // TODO: In production verify OTP with Aadhaar provider
      // await aadhaarProvider.verifyOtp(transactionId, otp);

      pendingTx.delete(transactionId);

      const user = await User.findByIdAndUpdate(
        tx.userId,
        { kycStatus: "submitted", aadhaarLast4: tx.aadhaarLast4 },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({
        message: "KYC submitted. Verification is under review.",
        kycStatus: user.kycStatus,
      });
    } catch (err) {
      console.error("[kyc/verify-otp]", err);
      res.status(500).json({ message: "Verification failed. Please try again." });
    }
  }
);

export default router;
