import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import * as api from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface KycModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

function formatAadhaar(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export default function KycModal({ open, onClose, onComplete }: KycModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [stage, setStage] = useState<"aadhaar" | "otp">("aadhaar");
  const [aadhaar, setAadhaar] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "??";

  async function handleGenerateOtp() {
    const digits = aadhaar.replace(/\s/g, "");
    if (!/^\d{12}$/.test(digits)) {
      toast({
        title: "Invalid Aadhaar",
        description: "Enter a valid 12-digit Aadhaar number.",
        variant: "destructive",
      });
      return;
    }
    setBusy(true);
    try {
      const res = await api.kycSendOtp(digits);
      setTransactionId(res.transactionId);
      setStage("otp");
      toast({ title: "OTP Sent", description: "Check the mobile linked with your Aadhaar." });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to send OTP.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyOtp() {
    if (!/^\d{6}$/.test(otp)) {
      toast({ title: "Invalid OTP", description: "Enter the 6-digit OTP.", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      await api.kycVerifyOtp(transactionId, otp);
      toast({ title: "KYC Submitted", description: "Your KYC is under review." });
      onComplete();
    } catch (err) {
      toast({
        title: "Verification failed",
        description: err instanceof Error ? err.message : "Invalid OTP.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleResendOtp() {
    const digits = aadhaar.replace(/\s/g, "");
    setBusy(true);
    try {
      const res = await api.kycSendOtp(digits);
      setTransactionId(res.transactionId);
      setOtp("");
      toast({ title: "OTP Resent", description: "A new OTP has been sent." });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to resend OTP.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  function handleClose() {
    setStage("aadhaar");
    setAadhaar("");
    setOtp("");
    setTransactionId("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#0f1a2e] border border-white/10 text-white sm:max-w-lg p-0 overflow-hidden">
        {/* User identity header */}
        <div className="px-8 pt-8 pb-5 border-b border-white/10">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-white text-lg leading-tight">{user?.name}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-bold">Complete Your KYC</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-8 py-6 space-y-5">
          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300">
            Please verify your identity using your Aadhaar details. This process requires OTP
            verification.
          </div>

          {/* Aadhaar input */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Aadhaar Number</Label>
            <Input
              value={aadhaar}
              onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
              placeholder="XXXX XXXX XXXX"
              maxLength={14}
              disabled={stage === "otp"}
              className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-creeper/50 disabled:opacity-60"
            />
          </div>

          {/* OTP input — visible after Generate OTP */}
          {stage === "otp" && (
            <div className="space-y-2">
              <Label className="text-white font-medium">Enter OTP</Label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="bg-[#0a0f1a] border-creeper/50 text-white placeholder:text-gray-600 focus-visible:ring-creeper/50"
              />
              <p className="text-xs text-gray-400">
                OTP has been sent to your registered mobile number linked with Aadhaar
              </p>
            </div>
          )}

          {/* Actions */}
          {stage === "aadhaar" ? (
            <div className="flex items-center justify-between pt-2">
              <Button
                onClick={handleGenerateOtp}
                disabled={busy || aadhaar.replace(/\s/g, "").length < 12}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0"
              >
                {busy ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Generate OTP"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-white/20 text-white hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-3">
                <Button
                  onClick={handleVerifyOtp}
                  disabled={busy || otp.length < 6}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0"
                >
                  {busy ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleResendOtp}
                  disabled={busy}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Resend OTP
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border-white/20 text-white hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
