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
  X 
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const userName = user?.name || 'Admin';
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
    { name: 'Products', href: '/dashboard/admin/products', icon: Package },
    { name: 'Customers', href: '/dashboard/admin/customers', icon: Users },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] dark:bg-neutral-950 flex text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* 📱 Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* 🟢 Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-64 bg-[#1B3B18] text-white z-50 transition-transform duration-300 flex flex-col justify-between shadow-2xl shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-9 h-9 bg-[#800020] rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg">E</span>
              <span className="font-extrabold text-xl tracking-wide text-white">
                Eco<span className="text-[#A3E635]">World</span> <span className="text-[10px] bg-[#800020] px-2 py-0.5 rounded text-white font-normal ml-1">Admin</span>
              </span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
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
                    flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm
                    ${isActive 
                      ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/30 font-semibold' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'}
                  `}>
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl transition text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* ⚪ Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700 dark:text-gray-200">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="অর্ডার বা প্রোডাক্ট খুঁজুন..." 
                className="w-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#2D5A27] transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#800020] rounded-full" />
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 dark:border-neutral-800 pl-4">
              <div className="w-10 h-10 rounded-xl bg-[#800020] text-white font-bold flex items-center justify-center shadow-md">
                {userInitial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold leading-none">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{user?.role || 'Super Admin'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}