"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Home,
  Info,
  Phone,
  Leaf,
  Sun,
  Moon,
  Heart,
  Sparkles,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import NavbarCart from "./cartIcon";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🚀 Scroll State: স্ক্রোল করলে নেভবার কিছুটা ছোট ও শ্যাডো যুক্ত হয়ে এনিমেশন করবে
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌓 Pure React Theme Handling
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const user = session?.user;
  const role = user?.role || "customer";
  const userName = user?.name || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  const dashboardLink = role === "admin" ? "/dashboard/admin" : "/dashboard/customer";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "About", href: "/About", icon: Info },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-2xl ${
        scrolled
          ? "bg-white/90 dark:bg-neutral-950/95 shadow-lg border-b border-gray-200/80 dark:border-emerald-900/40 py-1"
          : "bg-white/60 dark:bg-neutral-950/70 border-b border-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* 🌿 Animated EcoWorld Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 my-1 py-1.5 px-3 rounded-2xl hover:bg-emerald-500/10 transition-all duration-300 group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
              <Leaf size={22} className="animate-pulse" />
              <Sparkles size={12} className="absolute -top-1 -right-1 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-extrabold text-2xl tracking-tight leading-none bg-gradient-to-r from-emerald-600 via-teal-500 to-green-400 bg-clip-text text-transparent">
                EcoWorld
              </span>
              <span className="text-[10px] tracking-[2px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase mt-0.5">
                Handicraft
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-neutral-900/80 p-1.5 rounded-2xl border border-gray-200/60 dark:border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark / Light Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-amber-400" />
                ) : (
                  <Moon size={20} className="text-neutral-700" />
                )}
              </button>
            )}

            {isPending ? (
              <div className="w-32 h-10 rounded-2xl bg-gray-200 dark:bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-2xl bg-gray-100/80 dark:bg-neutral-900 border border-gray-200/80 dark:border-neutral-800">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {userInitial}
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-neutral-200 truncate max-w-[120px]">
                    {userName}
                  </span>
                </div>

                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <NavbarCart />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium text-gray-700 dark:text-neutral-300 hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 rounded-2xl text-sm font-medium text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all shadow-md shadow-emerald-600/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-amber-400" />
                ) : (
                  <Moon size={20} className="text-neutral-700" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-2xl text-gray-700 dark:text-neutral-300 bg-gray-100 dark:bg-neutral-900"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl px-6 py-6 space-y-2">
          {user && (
            <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-lg font-bold text-white">
                {userInitial}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 capitalize">{role}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-medium text-gray-700 dark:text-neutral-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <>
              <Link
                href={dashboardLink}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-semibold bg-emerald-600 text-white mt-4 shadow-md"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-medium text-red-500 hover:bg-red-500/10 w-full text-left transition-all"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3.5 rounded-2xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
}