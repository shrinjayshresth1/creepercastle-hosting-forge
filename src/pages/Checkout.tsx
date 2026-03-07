import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, Lock, ArrowLeft } from "lucide-react";
import { createOrder } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const { user, accessToken } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const amount      = Number(searchParams.get("amount") ?? 0);
  const description = searchParams.get("description") ?? "CreeperCastle Service";
  const plan        = searchParams.get("plan") ?? "";

  if (!amount || amount <= 0) {
    return (
      <div className="min-h-screen bg-navy-dark text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">Invalid payment request — no amount provided.</p>
          <Button asChild variant="outline" className="border-white/20 text-gray-300">
            <Link to="/dashboard">← Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function handlePay() {
    if (!accessToken) {
      toast({ variant: "destructive", title: "Not logged in", description: "Please log in to continue." });
      return;
    }
    setLoading(true);
    try {
      const { paymentUrl } = await createOrder({ amount, description }, accessToken);
      // Full-page redirect to HDFC's hosted payment page
      window.location.href = paymentUrl;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not initiate payment.";
      toast({ variant: "destructive", title: "Payment Error", description: msg });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Back link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl p-8">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-creeper/20 border border-creeper flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-creeper" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Checkout</h1>
              <p className="text-xs text-gray-400">Powered by HDFC SmartGateway</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-[#0a1020] rounded-xl p-5 mb-6 border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Order Summary</p>
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">{description}</p>
                {plan && <p className="text-xs text-gray-400 mt-0.5">Plan: {plan}</p>}
              </div>
              <p className="text-2xl font-bold text-creeper flex-shrink-0">₹{amount}</p>
            </div>
          </div>

          {/* Billing info */}
          <div className="mb-6 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Name</span>
              <span className="text-white">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span className="text-white">{user?.email}</span>
            </div>
          </div>

          {/* Security badges */}
          <div className="flex items-center gap-5 mb-7 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-green-400" /> 256-bit SSL
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-400" /> PCI-DSS Compliant
            </span>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-creeper to-green-400 hover:from-green-600 hover:to-green-500 text-black font-bold py-6 text-base rounded-xl"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Connecting to bank..." : `Pay ₹${amount} Securely`}
          </Button>

          <p className="text-center text-xs text-gray-500 mt-3">
            You will be redirected to HDFC's secure payment page
          </p>
        </div>
      </div>
    </div>
  );
}
