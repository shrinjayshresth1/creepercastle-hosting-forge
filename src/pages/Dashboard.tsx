import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Home, LogOut, User } from "lucide-react";
import KycModal from "@/components/KycModal";

export default function Dashboard() {
  const { user, logout, refreshUser } = useAuth();
  const [kycDismissed, setKycDismissed] = useState(false);
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const kycOpen = !user?.phoneVerified && !kycDismissed && !kycModalOpen;

  async function handleKycComplete() {
    setKycModalOpen(false);
    await refreshUser();
  }

  return (
    <div className="min-h-screen bg-navy-dark text-white">

      {/* ── KYC Pending Dialog ─────────────────────────────────────────────── */}
      <Dialog open={kycOpen} onOpenChange={() => setKycDismissed(true)}>
        <DialogContent className="bg-[#0f1a2e] border border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-400 text-lg">
              <AlertCircle className="w-5 h-5" />
              KYC Pending
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              To continue enjoying our services seamlessly, please complete your
              KYC verification.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-4">
            <Button
              variant="secondary"
              onClick={() => setKycDismissed(true)}
              className="bg-[#1e2d45] hover:bg-[#253550] text-white border-0"
            >
              Dismiss
            </Button>
            <Button
              onClick={() => { setKycDismissed(true); setKycModalOpen(true); }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0"
            >
              Complete KYC
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* KYC banner — shown after dialog is dismissed */}
          {!user?.phoneVerified && kycDismissed && (
            <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-200">
                  Your KYC verification is pending. Complete it to unlock all services.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setKycModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold border-0 flex-shrink-0"
              >
                Complete KYC
              </Button>
            </div>
          )}

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, <span className="text-creeper">{user?.name ?? "User"}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              asChild
              className="border-white/20 text-gray-300 hover:text-white hover:bg-white/5 gap-2"
            >
              <Link to="/"><Home className="w-4 h-4" /> Homepage</Link>
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="border-white/20 text-gray-300 hover:text-white hover:bg-white/5 gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Active Services", value: "—" },
            { label: "Open Tickets", value: "—" },
            { label: "Unpaid Invoices", value: "—" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-[#0f1a2e] border border-white/10 rounded-xl p-6 flex flex-col gap-2"
            >
              <p className="text-gray-400 text-sm">{card.label}</p>
              <p className="text-4xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Profile card */}
        <Link
          to="/profile"
          className="mt-10 bg-[#0f1a2e] border border-white/10 rounded-xl p-6 flex items-center gap-4 hover:border-creeper/40 transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-creeper/20 border border-creeper flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-creeper" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email} &middot; +91 {user?.phone}</p>
            <p className="text-xs text-gray-600 mt-0.5 capitalize">{user?.role} account</p>
          </div>
          <span className="text-xs text-gray-500 group-hover:text-creeper transition-colors">View Profile →</span>
        </Link>
      </div>
    </div>
  );
}
