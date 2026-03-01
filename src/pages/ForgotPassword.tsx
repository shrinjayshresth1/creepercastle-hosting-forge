import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCountdown } from "@/hooks/use-countdown";

type Step = "email" | "otp" | "newPassword" | "done";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type EmailValues = z.infer<typeof emailSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();
  const { seconds, reset: resetCountdown } = useCountdown(60);

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirm: "" },
  });

  async function submitEmail(values: EmailValues) {
    setBusy(true);
    try {
      await api.sendPasswordResetOtp(values.email);
      setEmail(values.email);
      setStep("otp");
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

  async function verifyOtp() {
    if (otp.length < 6) return;
    setStep("newPassword");
  }

  async function submitPassword(values: PasswordValues) {
    setBusy(true);
    try {
      await api.resetPassword(email, otp, values.password);
      setStep("done");
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Reset failed.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  async function resendOtp() {
    try {
      await api.sendPasswordResetOtp(email);
      resetCountdown();
      setOtp("");
      toast({ title: "OTP resent", description: "Check your inbox." });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none bg-auth-glow" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-creeper">Creeper</span>Castle
          </Link>
          <p className="text-gray-400 text-sm mt-1">Reset your password</p>
        </div>

        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl p-8 shadow-xl">

          {step === "email" && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(submitEmail)} className="space-y-5">
                <div>
                  <h2 className="text-white font-semibold text-lg">Forgot password?</h2>
                  <p className="text-gray-400 text-sm mt-1">Enter your email and we'll send you a reset code.</p>
                </div>
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold gap-2"
                >
                  {busy ? <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" /> : <>Send OTP <ChevronRight className="w-4 h-4" /></>}
                </Button>
                <p className="text-center text-sm text-gray-400">
                  Remembered it?{" "}
                  <Link to="/login" className="text-creeper hover:underline font-medium">Login</Link>
                </p>
              </form>
            </Form>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-lg">Enter the code</h2>
                <p className="text-gray-400 text-sm mt-1">We sent a 6-digit code to {email}.</p>
              </div>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="bg-[#0a0f1a] border-white/10 text-white text-lg w-12 h-12 focus:border-creeper" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                onClick={verifyOtp}
                disabled={otp.length < 6}
                className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
              <p className="text-center text-sm text-gray-400">
                {seconds > 0 ? (
                  <span>Resend in {seconds}s</span>
                ) : (
                  <button type="button" onClick={resendOtp} className="text-creeper hover:underline inline-flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Resend OTP
                  </button>
                )}
              </p>
            </div>
          )}

          {step === "newPassword" && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(submitPassword)} className="space-y-5">
                <div>
                  <h2 className="text-white font-semibold text-lg">New password</h2>
                  <p className="text-gray-400 text-sm mt-1">Choose a strong password for your account.</p>
                </div>
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 chars, 1 uppercase, 1 number"
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50 pr-10"
                            {...field}
                          />
                          <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200" tabIndex={-1}>
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Repeat password"
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50 pr-10"
                            {...field}
                          />
                          <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200" tabIndex={-1}>
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold gap-2"
                >
                  {busy ? <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" /> : "Reset Password"}
                </Button>
              </form>
            </Form>
          )}

          {step === "done" && (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-creeper/20 border border-creeper flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-creeper" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Password reset!</h2>
                <p className="text-gray-400 text-sm mt-1">You can now log in with your new password.</p>
              </div>
              <Link to="/login">
                <Button className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold">
                  Go to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
