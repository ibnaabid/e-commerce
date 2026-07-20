"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

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

      // Special Admin Check (Gmail দিয়ে Admin ঢুকবে)
      const adminEmails = [
        "mdmosabbirrahman07@gmail.com",
    
      ];

      if (adminEmails.includes(form.email.toLowerCase())) {
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
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Demo Button
  const fillDemo = () => {
    setForm({ 
      email: "mdmosabbirrahman07@gmail.com", 
      password: "123456789" 
    });
    toast.success("Demo Admin credentials filled!");
  };

  const fillCustomerDemo = () => {
    setForm({ 
      email: "customer@ecoworldbajar.com", 
      password: "demo1234" 
    });
    toast.info("Customer demo credentials filled!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-neutral-50 to-emerald-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 to-maroon-700 rounded-2xl flex items-center justify-center">
              <Leaf size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">EcoWorld</h1>
              <p className="text-maroon-700 text-sm -mt-1">Ghore Bajar</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-neutral-900">Welcome Back</h1>
            <p className="text-neutral-600 mt-2">Sign in to your account</p>
          </div>

          {/* Demo Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={fillDemo}
              className="py-2.5 border border-amber-500 text-amber-700 rounded-2xl text-sm font-medium hover:bg-amber-50 transition"
            >
              Admin Demo
            </button>
            <button
              onClick={fillCustomerDemo}
              className="py-2.5 border border-emerald-600 text-emerald-700 rounded-2xl text-sm font-medium hover:bg-emerald-50 transition"
            >
              Customer Demo
            </button>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl mb-6 text-center text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">Email Address</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-3.5 text-neutral-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-11 py-3.5 border border-neutral-300 rounded-2xl focus:border-emerald-600 focus:ring-1 outline-none transition"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-neutral-700">Password</label>
                <a href="/forgot-password" className="text-sm text-emerald-700 hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-3.5 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 border border-neutral-300 rounded-2xl focus:border-emerald-600 focus:ring-1 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-emerald-700 to-maroon-700 hover:from-emerald-800 hover:to-maroon-800 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Google Login */}
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-500">OR</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-4 border border-neutral-300 rounded-2xl flex items-center justify-center gap-3 hover:bg-neutral-50 font-medium transition disabled:opacity-70"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z" />
              {/* ... other paths same as before */}
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-8">
          New to EcoWorld?{" "}
          <a href="/register" className="text-emerald-700 font-medium hover:underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}