'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X,
  Leaf
} from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const userName = user?.name || 'Admin';
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Add_Product', href: '/dashboard/admin/add-product', icon: ShoppingBag },
    { name: 'Manage Products', href: '/dashboard/admin/Manage-Product', icon: Package },
    { name: 'Customers', href: '/dashboard/admin/customers', icon: Users },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] dark:bg-neutral-950 flex text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      
      {/* 📱 Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* 🟢 Sidebar (Full Height & Deep Forest Theme) */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0B1E13] text-white z-50 transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-2xl shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-emerald-900/50">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 shadow-inner">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wide text-white leading-tight">
                  Eco<span className="text-emerald-400">World</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                  Admin Panel
                </span>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <div className={`
                    flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 font-medium text-sm
                    ${isActive 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-semibold border border-emerald-500/30' 
                      : 'text-slate-300 hover:bg-emerald-900/30 hover:text-emerald-300'}
                  `}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-emerald-900/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 rounded-2xl transition text-sm font-semibold"
          >
            <LogOut className="w-5 h-5" />
            LOGOUT
          </button>
        </div>
      </aside>

      {/* ⚪ Main Content Area (Full Width) */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-neutral-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors w-full">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-700 dark:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-xl">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="অর্ডার বা প্রোডাক্ট খুঁজুন..." 
                className="w-full bg-slate-100 dark:bg-neutral-800/80 border border-slate-200 dark:border-neutral-700 rounded-2xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-2xl relative transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-neutral-900" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-neutral-800 pl-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center shadow-md shadow-emerald-600/20">
                {userInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{userName}</p>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 capitalize font-medium">{user?.role || 'Super Admin'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content (Strictly Full Width) */}
        <main className="w-full max-w-full flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}