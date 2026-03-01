
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Discord from "./pages/Discord";
import Locations from "./pages/Locations";
import MinecraftPlans from "./pages/plans/MinecraftPlans";
import PerformancePlans from "./pages/plans/PerformancePlans";
import VPSPlans from "./pages/plans/VPSPlans";
import PerformanceVPSPlans from "./pages/plans/PerformanceVPSPlans";
import DiscordBotPlans from "./pages/plans/DiscordBotPlans";
import Datacenter from "./pages/Datacenter";
import OtherHosting from "./pages/OtherHosting";
import CreeperPanel from "./pages/CreeperPanel";
import About from "./pages/About";
import Links from "./pages/Links";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <BreadcrumbStructuredData />
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Public routes */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/discord" element={<Discord />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/plans/minecraft" element={<MinecraftPlans />} />
              <Route path="/plans/performance" element={<PerformancePlans />} />
              <Route path="/plans/ryzen9" element={<Navigate to="/plans/performance" replace />} />
              <Route path="/plans/vps" element={<VPSPlans />} />
              <Route path="/plans/performance-vps" element={<PerformanceVPSPlans />} />
              <Route path="/plans/discord-bot" element={<DiscordBotPlans />} />
              <Route path="/datacenter" element={<Datacenter />} />
              <Route path="/plans/other" element={<OtherHosting />} />
              <Route path="/creeperpanel" element={<CreeperPanel />} />
              <Route path="/about" element={<About />} />
              <Route path="/links" element={<Links />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
