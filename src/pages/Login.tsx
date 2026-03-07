import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
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

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "Invalid credentials.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none bg-auth-glow" />

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <span className="text-creeper">Creeper</span>Castle
          </Link>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#0f1a2e] border border-white/10 rounded-2xl p-8 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
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
                    <div className="flex justify-end">
                      <Link
                        to="/forgot-password"
                        className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        Reset Password
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-creeper hover:bg-creeper/90 text-black font-semibold gap-2"
              >
                {form.formState.isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                Login
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-400 mt-6">
            New user?{" "}
            <Link to="/register" className="text-creeper hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
