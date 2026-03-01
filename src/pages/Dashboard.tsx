import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-navy-dark text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, <span className="text-creeper">{user?.name ?? "User"}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="border-white/20 text-gray-300 hover:text-white hover:bg-white/5 gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
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
        <div className="mt-10 bg-[#0f1a2e] border border-white/10 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-creeper/20 border border-creeper flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-creeper" />
          </div>
          <div>
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email} &middot; +91 {user?.phone}</p>
            <p className="text-xs text-gray-600 mt-0.5 capitalize">{user?.role} account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
