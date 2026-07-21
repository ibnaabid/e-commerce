// app/register/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { authClient } from "../lib/auth-client";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.signUp.email({
        email,
        password,
        name,
      });
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (error) {
      alert("Registration failed. Try again.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-maroon-700 to-rose-700 flex items-center justify-center">
              <Leaf size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">EcoWorld</h1>
              <p className="text-maroon-400 text-sm -mt-1">Ghore Bajar</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/80 border border-maroon-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white text-center mb-2">
            Create Account
          </h2>
          <p className="text-neutral-400 text-center mb-8">
            Join the green family
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-neutral-400 text-sm block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-5 py-3 text-white focus:border-maroon-600 outline-none"
                placeholder="Md. Rahim Khan"
                required
              />
            </div>

            <div>
              <label className="text-neutral-400 text-sm block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-5 py-3 text-white focus:border-maroon-600 outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-neutral-400 text-sm block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-5 py-3 text-white focus:border-maroon-600 outline-none"
                  placeholder="Create strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-neutral-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-maroon-600 to-rose-600 hover:from-maroon-700 hover:to-rose-700 text-white font-semibold py-3.5 rounded-2xl transition-all duration-200"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 flex items-center justify-center gap-3 bg-white text-neutral-900 font-medium py-3.5 rounded-2xl hover:bg-neutral-100 transition"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="text-center text-neutral-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-maroon-400 hover:text-maroon-300 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}