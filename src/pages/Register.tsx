import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronRight, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountdown } from "@/hooks/use-countdown";

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = ["Account", "Email OTP", "Mobile OTP", "Profile", "Done"] as const;
type Step = 0 | 1 | 2 | 3 | 4;

// ─── Schemas ──────────────────────────────────────────────────────────────────

const accountSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

const profileSchema = z.object({
  companyName: z.string().optional(),
  street: z.string().min(3, "Required"),
  postCode: z.string().min(4, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  country: z.string().min(2, "Required"),
  taxId: z.string().optional(),
});

type AccountValues = z.infer<typeof accountSchema>;
type ProfileValues = z.infer<typeof profileSchema>;

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              i < current
                ? "bg-creeper border-creeper text-black"
                : i === current
                ? "border-creeper text-creeper bg-transparent"
                : "border-white/20 text-gray-600 bg-transparent"
            }`}
          >
            {i < current ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-6 h-0.5 ${i < current ? "bg-creeper" : "bg-white/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── OTP input helper ─────────────────────────────────────────────────────────

function OtpStep({
  title,
  description,
  onVerify,
  onResend,
  isVerifying,
}: {
  title: string;
  description: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isVerifying: boolean;
}) {
  const [otp, setOtp] = useState("");
  const { seconds, reset } = useCountdown(60);

  async function handleResend() {
    await onResend();
    reset();
    setOtp("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="bg-[#0a0f1a] border-white/10 text-white text-lg w-12 h-12 focus:border-creeper"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="button"
        onClick={() => onVerify(otp)}
        disabled={otp.length < 6 || isVerifying}
        className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold"
      >
        {isVerifying ? (
          <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            Verify <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-gray-400">
        {seconds > 0 ? (
          <span>Resend OTP in {seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-creeper hover:underline inline-flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Resend OTP
          </button>
        )}
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Register() {
  const [step, setStep] = useState<Step>(0);
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Tokens passed between steps
  const [pendingEmailToken, setPendingEmailToken] = useState("");
  const [pendingFullToken, setPendingFullToken] = useState("");

  // Preserve account data across steps
  const [accountData, setAccountData] = useState<AccountValues | null>(null);

  const { setSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ─── Account form ──────────────────────────────────────────────────────────

  const accountForm = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  async function submitAccount(values: AccountValues) {
    setBusy(true);
    try {
      await api.sendEmailOtp(values.email);
      setAccountData(values);
      setStep(1);
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

  // ─── Email OTP ────────────────────────────────────────────────────────────

  async function verifyEmailOtp(otp: string) {
    setBusy(true);
    try {
      const { pendingEmailToken: token } = await api.verifyEmailOtp(
        accountData!.email,
        otp
      );
      setPendingEmailToken(token);
      // Now send mobile OTP
      await api.sendMobileOtp(accountData!.phone, token);
      setStep(2);
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

  async function resendEmailOtp() {
    try {
      await api.sendEmailOtp(accountData!.email);
      toast({ title: "OTP resent", description: "Check your inbox." });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to resend OTP.",
        variant: "destructive",
      });
    }
  }

  // ─── Mobile OTP ───────────────────────────────────────────────────────────

  async function verifyMobileOtp(otp: string) {
    setBusy(true);
    try {
      const { pendingFullToken: token } = await api.verifyMobileOtp(
        accountData!.phone,
        otp,
        pendingEmailToken
      );
      setPendingFullToken(token);
      setStep(3);
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

  async function resendMobileOtp() {
    try {
      await api.sendMobileOtp(accountData!.phone, pendingEmailToken);
      toast({ title: "OTP resent", description: "Check your messages." });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to resend OTP.",
        variant: "destructive",
      });
    }
  }

  // ─── Profile form ─────────────────────────────────────────────────────────

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: "",
      street: "",
      postCode: "",
      city: "",
      state: "",
      country: "IN",
      taxId: "",
    },
  });

  async function submitProfile(values: ProfileValues) {
    setBusy(true);
    try {
      const { accessToken, user } = await api.completeRegister({
        name: accountData!.name,
        password: accountData!.password,
        companyName: values.companyName || undefined,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          postCode: values.postCode,
          country: values.country,
        },
        taxId: values.taxId || undefined,
        pendingFullToken,
      });
      setSession(accessToken, user);
      setStep(4);
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Registration failed.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none bg-auth-glow" />

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-creeper">Creeper</span>Castle
          </Link>
          <p className="text-gray-400 text-sm mt-1">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl p-8 shadow-xl">
          <StepIndicator current={step} />

          {/* ── Step 0: Account details ────────────────────────────────── */}
          {step === 0 && (
            <Form {...accountForm}>
              <form onSubmit={accountForm.handleSubmit(submitAccount)} className="space-y-4">
                <FormField
                  control={accountForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Alex Johnson"
                          autoComplete="name"
                          className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={accountForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={accountForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Phone Number</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <span className="flex items-center px-3 rounded-md border border-white/10 bg-[#0a0f1a] text-gray-400 text-sm select-none">
                            +91
                          </span>
                          <Input
                            type="tel"
                            placeholder="9876543210"
                            autoComplete="tel"
                            maxLength={10}
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={accountForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 chars, 1 uppercase, 1 number"
                            autoComplete="new-password"
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold mt-2 gap-2"
                >
                  {busy ? (
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>Register <ChevronRight className="w-4 h-4" /></>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-400 pt-1">
                  Already have an account?{" "}
                  <Link to="/login" className="text-creeper hover:underline font-medium">
                    Login
                  </Link>
                </p>
              </form>
            </Form>
          )}

          {/* ── Step 1: Email OTP ─────────────────────────────────────── */}
          {step === 1 && (
            <OtpStep
              title="Verify your email"
              description={`We sent a 6-digit code to ${accountData?.email ?? "your email"}.`}
              onVerify={verifyEmailOtp}
              onResend={resendEmailOtp}
              isVerifying={busy}
            />
          )}

          {/* ── Step 2: Mobile OTP ───────────────────────────────────── */}
          {step === 2 && (
            <OtpStep
              title="Verify your mobile"
              description={`We sent a 6-digit code to +91 ${accountData?.phone ?? "your number"}.`}
              onVerify={verifyMobileOtp}
              onResend={resendMobileOtp}
              isVerifying={busy}
            />
          )}

          {/* ── Step 3: Complete profile ──────────────────────────────── */}
          {step === 3 && (
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(submitProfile)} className="space-y-4">
                <div>
                  <h2 className="text-white font-semibold text-lg">Complete your profile</h2>
                  <p className="text-gray-400 text-sm mt-1">We need your billing address for invoicing.</p>
                </div>

                <FormField
                  control={profileForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Company Name <span className="text-gray-500">(optional)</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Acme Pvt Ltd"
                          className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Street Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 MG Road"
                          className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={profileForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Mumbai"
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="postCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Post Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="400001"
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={profileForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">State</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Maharashtra"
                            className="bg-[#0a0f1a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-creeper/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Country</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="bg-[#0a0f1a] border-white/10 text-white focus:ring-creeper/50">
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0f1a2e] border-white/10 text-white">
                              <SelectItem value="IN">India</SelectItem>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="GB">United Kingdom</SelectItem>
                              <SelectItem value="SG">Singapore</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="DE">Germany</SelectItem>
                              <SelectItem value="NL">Netherlands</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">GST / Tax ID <span className="text-gray-500">(optional)</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="27AAAAA0000A1Z5"
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
                  className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold mt-2 gap-2"
                >
                  {busy ? (
                    <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                  ) : (
                    "Submit Details"
                  )}
                </Button>
              </form>
            </Form>
          )}

          {/* ── Step 4: Success ───────────────────────────────────────── */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-creeper/20 border border-creeper flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-creeper" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Welcome aboard!</h2>
                <p className="text-gray-400 text-sm mt-2">
                  Your account has been created successfully.
                </p>
              </div>
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
