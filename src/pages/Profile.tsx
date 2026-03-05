import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Clock, Lock, ChevronLeft } from "lucide-react";
import KycModal from "@/components/KycModal";

const KYC_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: "KYC Pending",   color: "text-amber-400" },
  submitted: { label: "KYC Under Review", color: "text-blue-400" },
  approved:  { label: "Your KYC has been approved.", color: "text-green-400" },
  rejected:  { label: "KYC Rejected — please resubmit.", color: "text-red-400" },
};

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [kycOpen, setKycOpen] = useState(false);

  const kyc = KYC_LABELS[user?.kycStatus ?? "pending"];
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "??";

  const lastLogin = user?.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  async function handleKycComplete() {
    setKycOpen(false);
    await refreshUser();
  }

  return (
    <div className="min-h-screen bg-[#080e1a] text-white">
      <KycModal open={kycOpen} onClose={() => setKycOpen(false)} onComplete={handleKycComplete} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* ── Header card ───────────────────────────────────────────────── */}
        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-bold text-white text-xl leading-tight">{user?.name}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold border-0">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* ── KYC Verification bar ──────────────────────────────────────── */}
        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-semibold text-white">KYC Verification</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${kyc.color}`}>{kyc.label}</span>
              {(user?.kycStatus === "pending" || user?.kycStatus === "rejected") && (
                <Button
                  size="sm"
                  onClick={() => setKycOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0 h-8 text-xs"
                >
                  {user.kycStatus === "rejected" ? "Resubmit KYC" : "Complete KYC"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ── Last Login ────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/60 border border-blue-500/20 rounded-2xl px-6 py-5 mb-4">
          <div className="flex items-center gap-3 mb-1">
            <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="font-semibold text-white">Last Login Information</span>
          </div>
          <p className="text-sm text-gray-300 ml-8">
            {lastLogin
              ? `Last signed in on ${lastLogin}`
              : "No previous login information available."}
          </p>
        </div>

        {/* ── Two-Factor Authentication ─────────────────────────────────── */}
        <div className="bg-gradient-to-r from-teal-900/60 to-green-900/60 border border-teal-500/20 rounded-2xl px-6 py-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-300 mt-0.5">Add an extra layer of security to your account</p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold border-0 h-8 text-xs flex-shrink-0"
            >
              {user?.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
            </Button>
          </div>
        </div>

        {/* ── Profile fields grid ───────────────────────────────────────── */}
        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Mobile Number" value={user?.phone ?? "—"} />
            <Field label="Company Name" value={user?.companyName || "N/A"} />
            <Field label="Street Address" value={user?.address?.street || "—"} />
            <Field label="City" value={user?.address?.city || "—"} />
            <Field label="Post Code" value={user?.address?.postCode || "—"} />
            <Field label="State" value={user?.address?.state || "—"} />
            <Field label="Country" value={user?.address?.country || "—"} />
            <Field label="Tax ID" value={user?.taxId || "N/A"} />
          </div>

          {/* Bottom actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0">
              Update Number
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0">
              Change Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <Label className="text-gray-400 text-xs font-medium">{label}</Label>
      <Input
        readOnly
        value={value}
        className="bg-[#0a0f1a] border-white/10 text-white focus-visible:ring-0 cursor-default"
      />
    </div>
  );
}
