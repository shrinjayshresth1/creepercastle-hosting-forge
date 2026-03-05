import axios from "axios";

/**
 * Fast2SMS DLT channel.
 * Requires: FAST2SMS_API_KEY in .env
 */
export async function sendSmsOtp(phone: string, otp: string): Promise<void> {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) throw new Error("FAST2SMS_API_KEY is not set");

  const message = `Your CreeperCastle verification code is ${otp}. Valid for 10 minutes. Do not share.`;

  const params = new URLSearchParams({
    authorization: apiKey,
    message,
    language: "english",
    route: "q", // Quick Transactional — no sender_id required
    numbers: phone,
  });

  const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    params,
    headers: { "Cache-Control": "no-cache" },
  });

  if (response.data?.return !== true) {
    throw new Error(`Fast2SMS error: ${JSON.stringify(response.data)}`);
  }
}
