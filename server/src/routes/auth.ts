import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sendMail, otpEmailHtml } from "../config/mail";
import { sendSmsOtp } from "../config/sms";
import { User } from "../models/User";
import { PendingRegistration } from "../models/PendingRegistration";
import { createOtp, verifyOtp } from "../utils/otp";
import {
  signAccessToken,
  signRefreshToken,
  signStepToken,
  verifyRefreshToken,
  verifyStepToken,
} from "../utils/jwt";
import { requireAuth, type AuthRequest } from "../middleware/auth";
import { otpSendLimiter, authLimiter } from "../middleware/rateLimiter";

const router = Router();

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/api/auth",
};

function userPublic(user: InstanceType<typeof User>) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    emailVerified: user.emailVerified,
    phoneVerified: user.phoneVerified,
    role: user.role,
  };
}

// ─── Step 1a: Send email OTP ─────────────────────────────────────────────────

router.post(
  "/register/send-email-otp",
  otpSendLimiter,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body as { email?: string };
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ message: "Invalid email address" });
        return;
      }

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        res.status(409).json({ message: "An account with this email already exists" });
        return;
      }

      const otp = await createOtp(email.toLowerCase(), "email-verify");
      await sendMail({
        to: email,
        subject: "Your CreeperCastle verification code",
        html: otpEmailHtml(otp, "verification"),
      });

      res.json({ message: "OTP sent to your email" });
    } catch (err) {
      console.error("[send-email-otp]", err);
      res.status(500).json({ message: "Failed to send OTP. Please try again." });
    }
  }
);

// ─── Step 1b: Verify email OTP → pendingEmailToken ───────────────────────────

router.post(
  "/register/verify-email-otp",
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body as { email?: string; otp?: string };
      if (!email || !otp) {
        res.status(400).json({ message: "Email and OTP are required" });
        return;
      }

      await verifyOtp(email.toLowerCase(), "email-verify", otp);

      // Create/update pending record
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
      const stepToken = signStepToken({ purpose: "email-verified", email: email.toLowerCase() });

      await PendingRegistration.findOneAndUpdate(
        { email: email.toLowerCase() },
        { emailVerified: true, phoneVerified: false, phone: undefined, stepToken, expiresAt },
        { upsert: true, new: true }
      );

      res.json({ pendingEmailToken: stepToken });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Verification failed";
      res.status(400).json({ message: msg });
    }
  }
);

// ─── Step 2a: Send mobile OTP ─────────────────────────────────────────────────

router.post(
  "/register/send-mobile-otp",
  otpSendLimiter,
  async (req: Request, res: Response) => {
    try {
      const { phone, pendingEmailToken } = req.body as {
        phone?: string;
        pendingEmailToken?: string;
      };

      if (!phone || !pendingEmailToken) {
        res.status(400).json({ message: "Phone and pendingEmailToken are required" });
        return;
      }

      // Validate step token
      let stepData;
      try {
        stepData = verifyStepToken(pendingEmailToken);
      } catch {
        res.status(400).json({ message: "Invalid or expired session. Please start over." });
        return;
      }

      if (stepData.purpose !== "email-verified") {
        res.status(400).json({ message: "Email must be verified first" });
        return;
      }

      if (!/^[6-9]\d{9}$/.test(phone)) {
        res.status(400).json({ message: "Enter a valid 10-digit Indian mobile number" });
        return;
      }

      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        res.status(409).json({ message: "An account with this phone number already exists" });
        return;
      }

      // Update pending record with phone
      await PendingRegistration.findOneAndUpdate(
        { email: stepData.email },
        { phone },
        { new: true }
      );

      const otp = await createOtp(phone, "phone-verify");
      await sendSmsOtp(phone, otp);

      res.json({ message: "OTP sent to your mobile" });
    } catch (err) {
      console.error("[send-mobile-otp]", err);
      res.status(500).json({ message: "Failed to send OTP. Please try again." });
    }
  }
);

// ─── Step 2b: Verify mobile OTP → pendingFullToken ───────────────────────────

router.post(
  "/register/verify-mobile-otp",
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const { phone, otp, pendingEmailToken } = req.body as {
        phone?: string;
        otp?: string;
        pendingEmailToken?: string;
      };

      if (!phone || !otp || !pendingEmailToken) {
        res.status(400).json({ message: "Phone, OTP and pendingEmailToken are required" });
        return;
      }

      let stepData;
      try {
        stepData = verifyStepToken(pendingEmailToken);
      } catch {
        res.status(400).json({ message: "Invalid or expired session. Please start over." });
        return;
      }

      if (stepData.purpose !== "email-verified") {
        res.status(400).json({ message: "Invalid step token" });
        return;
      }

      await verifyOtp(phone, "phone-verify", otp);

      // Mark phone verified and issue full token
      await PendingRegistration.findOneAndUpdate(
        { email: stepData.email },
        { phoneVerified: true },
        { new: true }
      );

      const fullToken = signStepToken({
        purpose: "phone-verified",
        email: stepData.email,
        phone,
      });

      // Update stored token
      await PendingRegistration.findOneAndUpdate(
        { email: stepData.email },
        { stepToken: fullToken }
      );

      res.json({ pendingFullToken: fullToken });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Verification failed";
      res.status(400).json({ message: msg });
    }
  }
);

// ─── Step 3: Complete registration ───────────────────────────────────────────

router.post(
  "/register/complete",
  authLimiter,
  async (req: Request, res: Response) => {
    try {
      const { name, password, companyName, address, taxId, pendingFullToken } =
        req.body as {
          name?: string;
          password?: string;
          companyName?: string;
          address?: {
            street: string;
            city: string;
            state: string;
            postCode: string;
            country: string;
          };
          taxId?: string;
          pendingFullToken?: string;
        };

      if (!name || !password || !address || !pendingFullToken) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      let stepData;
      try {
        stepData = verifyStepToken(pendingFullToken);
      } catch {
        res.status(400).json({ message: "Invalid or expired session. Please start over." });
        return;
      }

      if (stepData.purpose !== "phone-verified" || !stepData.phone) {
        res.status(400).json({ message: "Both email and phone must be verified first" });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 characters" });
        return;
      }

      // Final duplicate check
      const dup = await User.findOne({
        $or: [{ email: stepData.email }, { phone: stepData.phone }],
      });
      if (dup) {
        res.status(409).json({ message: "Account already exists. Please log in." });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.create({
        name: name.trim(),
        email: stepData.email,
        phone: stepData.phone,
        passwordHash,
        emailVerified: true,
        phoneVerified: true,
        companyName: companyName?.trim() || undefined,
        taxId: taxId?.trim() || undefined,
        address,
      });

      // Clean up pending record
      await PendingRegistration.deleteOne({ email: stepData.email });

      const accessToken = signAccessToken({ sub: String(user._id), role: user.role });
      const refreshToken = signRefreshToken(String(user._id));

      // Store hashed refresh token
      user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
      await user.save();

      res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
      res.status(201).json({ accessToken, user: userPublic(user) });
    } catch (err) {
      console.error("[register-complete]", err);
      res.status(500).json({ message: "Registration failed. Please try again." });
    }
  }
);

// ─── Login ────────────────────────────────────────────────────────────────────

router.post("/login", authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const accessToken = signAccessToken({ sub: String(user._id), role: user.role });
    const refreshToken = signRefreshToken(String(user._id));

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.json({ accessToken, user: userPublic(user) });
  } catch (err) {
    console.error("[login]", err);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

// ─── Refresh token ────────────────────────────────────────────────────────────

router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken as string | undefined;
    if (!token) {
      res.status(401).json({ message: "No refresh token" });
      return;
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      res.status(401).json({ message: "Invalid or expired refresh token" });
      return;
    }

    const user = await User.findById(payload.sub);
    if (!user || !user.refreshTokenHash) {
      res.status(401).json({ message: "Session not found. Please log in again." });
      return;
    }

    const match = await bcrypt.compare(token, user.refreshTokenHash);
    if (!match) {
      res.status(401).json({ message: "Token mismatch. Please log in again." });
      return;
    }

    // Rotate refresh token
    const newAccessToken = signAccessToken({ sub: String(user._id), role: user.role });
    const newRefreshToken = signRefreshToken(String(user._id));
    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    res.cookie("refreshToken", newRefreshToken, REFRESH_COOKIE_OPTIONS);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("[refresh]", err);
    res.status(500).json({ message: "Token refresh failed" });
  }
});

// ─── Logout ───────────────────────────────────────────────────────────────────

router.post("/logout", async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken as string | undefined;
    if (token) {
      let payload;
      try {
        payload = verifyRefreshToken(token);
        await User.findByIdAndUpdate(payload.sub, { $unset: { refreshTokenHash: 1 } });
      } catch {
        // Token invalid — still clear the cookie
      }
    }
    res.clearCookie("refreshToken", { path: "/api/auth" });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("[logout]", err);
    res.status(500).json({ message: "Logout failed" });
  }
});

// ─── Get current user ─────────────────────────────────────────────────────────

router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash -refreshTokenHash");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ user: userPublic(user) });
  } catch (err) {
    console.error("[me]", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// ─── Forgot password — send OTP ───────────────────────────────────────────────

router.post(
  "/forgot-password",
  otpSendLimiter,
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body as { email?: string };
      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      // Always respond OK to prevent email enumeration
      if (!user) {
        res.json({ message: "If that email exists, a reset code has been sent" });
        return;
      }

      const otp = await createOtp(email.toLowerCase(), "password-reset");
      await sendMail({
        to: email,
        subject: "Reset your CreeperCastle password",
        html: otpEmailHtml(otp, "reset"),
      });

      res.json({ message: "If that email exists, a reset code has been sent" });
    } catch (err) {
      console.error("[forgot-password]", err);
      res.status(500).json({ message: "Failed to send reset code. Please try again." });
    }
  }
);

// ─── Reset password ───────────────────────────────────────────────────────────

router.post("/reset-password", authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body as {
      email?: string;
      otp?: string;
      newPassword?: string;
    };

    if (!email || !otp || !newPassword) {
      res.status(400).json({ message: "Email, OTP and new password are required" });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters" });
      return;
    }

    await verifyOtp(email.toLowerCase(), "password-reset", otp);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).json({ message: "Account not found" });
      return;
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    user.refreshTokenHash = undefined; // Invalidate all sessions
    await user.save();

    res.clearCookie("refreshToken", { path: "/api/auth" });
    res.json({ message: "Password reset successfully. Please log in." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Reset failed";
    res.status(400).json({ message: msg });
  }
});

export default router;
