// components/Navbar.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Home,
  ShoppingBasket,
  Info,
  Phone,
  Leaf,
} from "lucide-react";
import { authClient } from "../lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const role = user?.role || "customer";
  const userName = user?.name || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  const dashboardLink = role === "admin" ? "/dashboard/admin" : "/dashboard";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: ShoppingBasket },
    { label: "Categories", href: "/categories", icon: Leaf },
    { label: "About", href: "/About", icon: Info },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/90 border-b border-maroon-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-maroon-700 to-rose-700 flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight">
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
                className="px-5 py-2 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-32 h-9 rounded-xl bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* User Info */}
                <div className="flex items-center gap-2 pl-3 pr-5 py-1.5 rounded-2xl bg-neutral-900 border border-maroon-800">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-600 to-rose-600 flex items-center justify-center text-sm font-bold text-white">
                    {userInitial}
                  </div>
                  <span className="text-sm text-neutral-200 truncate max-w-[150px]">
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

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm text-neutral-300 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 rounded-2xl text-sm text-neutral-300 hover:bg-white/5 transition-all"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-2"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-maroon-900 bg-neutral-950/95 backdrop-blur-xl px-4 py-5 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-4 py-4 mb-4 bg-neutral-900 border border-maroon-800 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maroon-600 to-rose-600 flex items-center justify-center text-xl font-bold text-white">
                {userInitial}
              </div>
              <div>
                <p className="font-semibold text-white">{userName}</p>
                <p className="text-xs text-maroon-400 capitalize">{role}</p>
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
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base text-neutral-300 hover:bg-maroon-950 hover:text-white transition-all"
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
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-base text-red-400 hover:bg-red-500/10 w-full text-left"
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
                className="text-center py-4 rounded-2xl border border-neutral-700 text-neutral-300 font-medium"
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