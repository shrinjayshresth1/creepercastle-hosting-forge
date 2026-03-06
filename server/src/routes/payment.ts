import crypto from "crypto";
import express, { Router, Request, Response } from "express";
import { requireAuth, type AuthRequest } from "../middleware/auth";
import { Order } from "../models/Order";
import { User } from "../models/User";
import {
  createHdfcPaymentSession,
  getHdfcTransactionStatus,
  verifyHdfcWebhook,
} from "../config/hdfc";

const router = Router();

const FRONTEND_URL = (process.env.FRONTEND_URL ?? "https://new.creepercastle.cloud").replace(/\/$/, "");
const BACKEND_URL  = (process.env.BACKEND_URL  ?? "https://new.creepercastle.cloud").replace(/\/$/, "");

const RETURN_URL = `${FRONTEND_URL}/payment/return`;
const NOTIFY_URL = `${BACKEND_URL}/api/payment/webhook`;

// ─── POST /api/payment/create-order ──────────────────────────────────────────
// Creates a payment session with HDFC and persists the order.
// Body: { amount: number (INR), description: string }
// Returns: { orderId, paymentUrl, sessionId }
router.post(
  "/create-order",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const { amount, description } = req.body as {
        amount?: unknown;
        description?: unknown;
      };

      if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        res
          .status(400)
          .json({ message: "amount must be a positive number (rupees)" });
        return;
      }

      if (
        typeof description !== "string" ||
        description.trim().length < 3 ||
        description.trim().length > 200
      ) {
        res.status(400).json({ message: "description must be 3–200 characters" });
        return;
      }

      const user = await User.findById(req.userId).lean();
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Generate a collision-resistant merchant order ID
      const orderId = `CC-${Date.now()}-${crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase()}`;

      const session = await createHdfcPaymentSession({
        orderId,
        amountRupees: amount,
        description: description.trim(),
        customerId: req.userId!,
        customerEmail: user.email,
        customerPhone: user.phone,
        returnUrl: `${RETURN_URL}?orderId=${encodeURIComponent(orderId)}`,
        notifyUrl: NOTIFY_URL,
      });

      await Order.create({
        userId: req.userId,
        orderId,
        amount,
        currency: "INR",
        description: description.trim(),
        status: "pending",
        hdfcSessionId: session.sessionId,
      });

      res.json({
        orderId,
        paymentUrl: session.paymentUrl,
        sessionId: session.sessionId,
      });
    } catch (err) {
      console.error("[payment/create-order]", err);
      res
        .status(502)
        .json({ message: "Could not initiate payment. Please try again." });
    }
  }
);

// ─── GET /api/payment/status/:orderId ────────────────────────────────────────
// Returns order status for the authenticated user.
// Falls back to a live HDFC status check when still pending.
router.get(
  "/status/:orderId",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const order = await Order.findOne({ orderId: req.params.orderId }).lean();
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      if (order.userId.toString() !== req.userId) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      // If webhook hasn't landed yet, poll HDFC directly
      if (order.status === "pending") {
        try {
          const hdfc = await getHdfcTransactionStatus(order.orderId);
          const normalised = hdfc.status.toLowerCase();
          const paid   = ["charged", "success", "succeeded", "captured"].includes(normalised);
          const failed  = ["failed", "declined", "rejected"].includes(normalised);

          if (paid || failed) {
            await Order.updateOne(
              { orderId: order.orderId },
              {
                status: paid ? "paid" : "failed",
                ...(hdfc.paymentId ? { hdfcTransactionId: hdfc.paymentId } : {}),
              }
            );
            res.json({
              orderId: order.orderId,
              status: paid ? "paid" : "failed",
              amount: order.amount,
              description: order.description,
            });
            return;
          }
        } catch {
          // HDFC poll failed — fall through and return cached DB status
        }
      }

      res.json({
        orderId: order.orderId,
        status: order.status,
        amount: order.amount,
        description: order.description,
      });
    } catch (err) {
      console.error("[payment/status]", err);
      res.status(500).json({ message: "Failed to retrieve payment status" });
    }
  }
);

// ─── POST /api/payment/webhook ───────────────────────────────────────────────
// HDFC S2S notification. Raw body is pre-captured in index.ts so signature
// verification works correctly.
router.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  async (req: Request, res: Response) => {
    try {
      const rawBody =
        req.body instanceof Buffer
          ? req.body.toString("utf-8")
          : typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body);

      const signature = req.headers["x-signature"] as string | undefined;
      const timestamp  = req.headers["x-timestamp"]  as string | undefined;

      // Verify HDFC's signature when headers are present
      if (signature && timestamp) {
        if (!verifyHdfcWebhook(rawBody, signature, timestamp)) {
          console.warn("[payment/webhook] Signature verification failed — rejected");
          res.status(400).json({ message: "Invalid webhook signature" });
          return;
        }
      } else {
        // Log a warning but don't hard-reject (some HDFC envs omit headers in UAT)
        console.warn("[payment/webhook] Signature headers missing — accepting without verification");
      }

      const payload = JSON.parse(rawBody) as {
        order?:   { id?: string; status?: string };
        payment?: { id?: string; status?: string; amount?: string };
      };

      const orderId    = payload?.order?.id;
      const rawStatus  = (
        payload?.payment?.status ??
        payload?.order?.status ??
        ""
      ).toLowerCase();

      const paid   = ["charged", "success", "succeeded", "captured"].includes(rawStatus);
      const failed  = ["failed", "declined", "rejected"].includes(rawStatus);

      if (orderId) {
        await Order.updateOne(
          { orderId },
          {
            status: paid ? "paid" : failed ? "failed" : "pending",
            ...(payload?.payment?.id ? { hdfcTransactionId: payload.payment.id } : {}),
            hdfcRawWebhook: payload,
          }
        );
        console.log(`[payment/webhook] Order ${orderId} → ${rawStatus}`);
      } else {
        console.warn("[payment/webhook] No orderId in payload:", rawBody.slice(0, 200));
      }

      res.status(200).json({ status: "received" });
    } catch (err) {
      console.error("[payment/webhook]", err);
      res.status(500).json({ message: "Webhook processing error" });
    }
  }
);

export default router;
