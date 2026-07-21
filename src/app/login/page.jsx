"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
// import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.password || form.password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        setErrors({ general: error.message || "Invalid email or password" });
        return;
      }

      toast.success("Login successful!");

      // Admin Email Check & Redirect Logic
      const adminEmail = "mdmosabbirrahman07@gmail.com";

      if (form.email.toLowerCase() === adminEmail.toLowerCase()) {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/customer");
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "",
      });
    } catch (err) {
      toast.error("Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Leaf size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">EcoWorld</h1>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider -mt-1">Ghore Bajar</p>
            </div>
          </div>
        </div>

        {/* Card Box */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none p-6 sm:p-8 border border-gray-100 dark:border-neutral-800 transition-all">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-gray-500 dark:text-neutral-400 text-sm mt-1">Sign in to your account</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3.5 rounded-2xl mb-6 text-center text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-neutral-300 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-neutral-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-neutral-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-neutral-900 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-neutral-800" />
            <span className="text-xs text-gray-400 dark:text-neutral-500 font-medium uppercase">Or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-neutral-800" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3 bg-gray-50 dark:bg-neutral-800/60 hover:bg-gray-100 dark:hover:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl text-gray-700 dark:text-neutral-200 font-medium text-sm flex items-center justify-center gap-3 transition active:scale-[0.99] disabled:opacity-70"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13.5 24 13.5c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 16.3 3 9.6 7.8 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 45c5.2 0 10-1.9 13.6-5.1l-6.3-5.2c-2.1 1.4-4.7 2.3-7.3 2.3-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.5 40.1 16.2 45 24 45z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.3 5.2c3.7-3.4 6-8.5 6-14.9 0-1.4-.1-2.4-.4-3.5z" />
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-gray-500 dark:text-neutral-400 text-sm mt-6">
          New to EcoWorld?{" "}
          <a href="/register" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
}