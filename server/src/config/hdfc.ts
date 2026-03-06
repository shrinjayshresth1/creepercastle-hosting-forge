/**
 * HDFC SmartGateway integration
 * Docs: https://developer.hdfcbank.com/site/dev/smart-gateway
 *
 * Flow:
 *  1. Backend calls createHdfcPaymentSession() → gets sessionId + paymentUrl
 *  2. Frontend redirects user to paymentUrl (HDFC-hosted payment page)
 *  3. After payment HDFC redirects to return_url with orderId param
 *  4. HDFC also POSTs S2S webhook to notify_url (verifiable with their public key)
 */

import crypto from "crypto";
import axios from "axios";

// Read config lazily so dotenv has time to load
function cfg() {
  return {
    merchantId: process.env.HDFC_MERCHANT_ID!,
    // .env stores \n as literal backslash-n — convert to real newlines
    privateKey: (process.env.HDFC_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    publicKey: (process.env.HDFC_PUBLIC_KEY ?? "").replace(/\\n/g, "\n"),
    keyUuid: process.env.HDFC_KEY_UUID!,
    paymentPageClientId: process.env.HDFC_PAYMENT_PAGE_CLIENT_ID!,
    baseUrl: (process.env.HDFC_BASE_URL ?? "").replace(/\/$/, ""),
  };
}

/**
 * Sign outgoing request payload with merchant RSA private key.
 * Signature covers: {timestamp}|{sha256(requestBody)}
 */
function signPayload(timestamp: string, body: string): string {
  const { privateKey } = cfg();
  const bodyHash = crypto.createHash("sha256").update(body, "utf8").digest("hex");
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${timestamp}|${bodyHash}`, "utf8");
  return signer.sign(privateKey, "base64");
}

/**
 * Verify HDFC's webhook signature using their RSA public key.
 * HDFC signs: {timestamp}|{sha256(rawBody)}
 */
export function verifyHdfcWebhook(
  rawBody: string,
  signature: string,
  timestamp: string
): boolean {
  try {
    const { publicKey } = cfg();
    const bodyHash = crypto.createHash("sha256").update(rawBody, "utf8").digest("hex");
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(`${timestamp}|${bodyHash}`, "utf8");
    return verifier.verify(publicKey, signature, "base64");
  } catch {
    return false;
  }
}

export interface HdfcSessionResult {
  sessionId: string;
  paymentUrl: string;
}

/**
 * Create a payment session with HDFC SmartGateway.
 * Returns sessionId and the full redirect URL for the payment page.
 */
export async function createHdfcPaymentSession(params: {
  orderId: string;
  amountRupees: number;
  description: string;
  customerId: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  notifyUrl: string;
}): Promise<HdfcSessionResult> {
  const { merchantId, keyUuid, paymentPageClientId, baseUrl } = cfg();

  const body = JSON.stringify({
    order: {
      id: params.orderId,
      amount: params.amountRupees.toFixed(2),
      currency: "INR",
      description: params.description,
    },
    customer: {
      id: params.customerId,
      email: params.customerEmail,
      phone: params.customerPhone,
    },
    return_url: params.returnUrl,
    notify_url: params.notifyUrl,
  });

  const timestamp = Date.now().toString();
  const signature = signPayload(timestamp, body);

  const response = await axios.post(`${baseUrl}/session`, body, {
    headers: {
      "Content-Type": "application/json",
      "x-merchantid": merchantId,
      "x-timestamp": timestamp,
      "x-signature": signature,
      "x-key-id": keyUuid,
      "version": "1",
    },
  });

  // HDFC response shape: { session: { id: "..." }, ... } or { id: "..." }
  const data = response.data as Record<string, unknown>;
  const sessionId =
    (data?.session as Record<string, unknown> | undefined)?.id as string | undefined
    ?? (data?.id as string | undefined);

  if (!sessionId) {
    throw new Error(`HDFC session creation failed: ${JSON.stringify(data)}`);
  }

  const paymentUrl = `${baseUrl}/payment/${paymentPageClientId}/${sessionId}?merchantid=${encodeURIComponent(merchantId)}`;
  return { sessionId, paymentUrl };
}

/**
 * Fetch the latest status of an order from HDFC.
 * Used as a fallback when the webhook hasn't arrived yet.
 */
export async function getHdfcTransactionStatus(orderId: string): Promise<{
  status: string;
  paymentId?: string;
  amount?: string;
}> {
  const { merchantId, keyUuid, baseUrl } = cfg();
  const timestamp = Date.now().toString();
  // GET request — empty body for signing
  const signature = signPayload(timestamp, "");

  const response = await axios.get(
    `${baseUrl}/transaction/${encodeURIComponent(orderId)}`,
    {
      headers: {
        "x-merchantid": merchantId,
        "x-timestamp": timestamp,
        "x-signature": signature,
        "x-key-id": keyUuid,
        "version": "1",
      },
    }
  );

  const data = response.data as Record<string, unknown>;
  const payment = data?.payment as Record<string, unknown> | undefined;

  return {
    status:
      (payment?.status as string | undefined) ??
      (data?.status as string | undefined) ??
      "UNKNOWN",
    paymentId:
      (payment?.id as string | undefined) ??
      (data?.id as string | undefined),
    amount:
      (payment?.amount as string | undefined) ??
      (data?.amount as string | undefined),
  };
}
