import nodemailer from "nodemailer";

/**
 * Self-hosted SMTP transport.
 * Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

// Guards against nodemailer address-parser CVEs by rejecting
// any `to` value that isn't a plain RFC-5321 address before it
// reaches the internal address parser.
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export async function sendMail(opts: MailOptions): Promise<void> {
  if (!EMAIL_RE.test(opts.to)) {
    throw new Error(`sendMail: invalid recipient address: ${opts.to}`);
  }
  await transporter.sendMail({
    from: `"CreeperCastle" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
}

/**
 * Email OTP template
 */
export function otpEmailHtml(otp: string, purpose: "verification" | "reset"): string {
  const heading = purpose === "verification" ? "Verify your email" : "Reset your password";
  const body =
    purpose === "verification"
      ? "Use the code below to complete your CreeperCastle registration."
      : "Use the code below to reset your CreeperCastle account password.";
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family:sans-serif;background:#0a0f1a;color:#fff;margin:0;padding:32px;">
        <div style="max-width:480px;margin:0 auto;background:#0f1a2e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px;">
          <h1 style="color:#50C878;margin-top:0;">${heading}</h1>
          <p style="color:#9ca3af;">${body}</p>
          <div style="background:#0a0f1a;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
            <span style="font-size:36px;font-weight:700;letter-spacing:12px;color:#50C878;">${otp}</span>
          </div>
          <p style="color:#6b7280;font-size:13px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0;" />
          <p style="color:#4b5563;font-size:12px;margin:0;">CreeperCastle.cloud &mdash; Secure Game Server Hosting</p>
        </div>
      </body>
    </html>
  `;
}
