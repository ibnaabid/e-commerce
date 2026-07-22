"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import Cart from "./cartIcon";
import NavbarCart from "./cartIcon";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🌓 Pure React Theme Handling State
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // LocalStorage অথবা System Preference থেকে থিম চেক করা
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

  // Theme Toggle Functionality
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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-neutral-950/90 border-b border-gray-200 dark:border-maroon-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-maroon-700 to-rose-700 flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">
                EcoWorld
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 rounded-xl text-sm text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* 🌗 Dark / Light Mode Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-gray-800 dark:bg-neutral-900 border border-gray-400 dark:border-maroon-800 text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun size={19} className="text-amber-400" />
                ) : (
                  <Moon size={19} className="text-neutral-800" />
                )}
              </button>
            )}

            {isPending ? (
              <div className="w-32 h-9 rounded-xl bg-gray-200 dark:bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* User Info */}
                <div className="flex items-center gap-2 pl-3 pr-5 py-1.5 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-maroon-800">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-600 to-rose-600 flex items-center justify-center text-sm font-bold text-white">
                    {userInitial}
                  </div>
                  <span className="text-sm text-gray-800 dark:text-neutral-200 truncate max-w-[150px]">
                    {userName}
                  </span>
                </div>

                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-semibold bg-maroon-700 hover:bg-maroon-600 text-white transition-all"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>
                <NavbarCart/>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm text-gray-700 dark:text-neutral-300 hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 rounded-2xl text-sm text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 rounded-2xl text-sm font-semibold bg-gradient-to-r from-maroon-600 to-rose-600 hover:from-maroon-700 hover:to-rose-700 text-white transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-maroon-800 text-gray-700 dark:text-neutral-300"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-amber-400" />
                ) : (
                  <Moon size={20} className="text-neutral-700" />
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white p-2"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-maroon-900 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl px-4 py-5 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-4 py-4 mb-4 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-maroon-800 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon-600 to-rose-600 flex items-center justify-center text-xl font-bold text-white">
                {userInitial}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{userName}</p>
                <p className="text-xs text-maroon-600 dark:text-maroon-400 capitalize">{role}</p>
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
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-maroon-950 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <Icon size={22} />
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <>
              <Link
                href={dashboardLink}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base font-medium bg-maroon-700 text-white mt-3"
              >
                <LayoutDashboard size={22} />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base text-red-500 hover:bg-red-500/10 w-full text-left"
              >
                <LogOut size={22} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center py-4 rounded-2xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-center py-4 rounded-2xl bg-gradient-to-r from-maroon-600 to-rose-600 text-white font-semibold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}