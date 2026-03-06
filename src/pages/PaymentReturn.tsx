import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Clock, LayoutDashboard, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrderStatus } from "@/lib/api";

type PaymentStatus = "checking" | "paid" | "failed" | "pending";

export default function PaymentReturn() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [status, setStatus]         = useState<PaymentStatus>("checking");
  const [amount, setAmount]         = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const pollCount = useRef(0);

  useEffect(() => {
    if (!orderId) {
      setStatus("failed");
      return;
    }

    let cancelled = false;

    async function poll() {
      if (cancelled) return;
      pollCount.current += 1;

      try {
        const data = await getOrderStatus(orderId!);
        setAmount(data.amount);
        setDescription(data.description);

        if (data.status === "paid") {
          setStatus("paid");
          return;
        }
        if (data.status === "failed" || data.status === "cancelled") {
          setStatus("failed");
          return;
        }

        // Retry up to 6 times (~18 s total) before showing "pending"
        if (pollCount.current < 6) {
          setTimeout(poll, 3000);
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("failed");
      }
    }

    poll();
    return () => { cancelled = true; };
  }, [orderId]);

  const config = {
    checking: {
      icon: <Clock className="w-14 h-14 text-yellow-400 animate-spin" />,
      title: "Verifying Payment…",
      message: "Please wait while we confirm your payment with HDFC.",
      color: "text-yellow-400",
    },
    paid: {
      icon: <CheckCircle2 className="w-14 h-14 text-green-400" />,
      title: "Payment Successful!",
      message: `₹${amount ?? "—"} received. Your service is being activated.`,
      color: "text-green-400",
    },
    failed: {
      icon: <XCircle className="w-14 h-14 text-red-400" />,
      title: "Payment Failed",
      message: "Your payment could not be processed. No amount has been charged.",
      color: "text-red-400",
    },
    pending: {
      icon: <Clock className="w-14 h-14 text-yellow-400" />,
      title: "Payment Pending",
      message: "Your payment is still being processed. We'll update your account once confirmed.",
      color: "text-yellow-400",
    },
  } as const;

  const { icon, title, message, color } = config[status];

  return (
    <div className="min-h-screen bg-navy-dark text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0f1a2e] border border-white/10 rounded-2xl p-10 text-center">

        <div className="flex justify-center mb-6">{icon}</div>

        <h1 className={`text-2xl font-bold mb-3 ${color}`}>{title}</h1>
        <p className="text-gray-400 mb-2 leading-relaxed">{message}</p>

        {description && status === "paid" && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}

        {orderId && (
          <p className="text-xs text-gray-600 mt-4 font-mono">Order: {orderId}</p>
        )}

        <div className="flex flex-col gap-3 mt-8">
          <Button
            asChild
            className="bg-creeper hover:bg-green-600 text-black font-bold w-full"
          >
            <Link to="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          {status === "failed" && (
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-gray-300 hover:text-white w-full"
            >
              <Link to="/checkout">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
