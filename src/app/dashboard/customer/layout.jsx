'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function CustomerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const userName = user?.name || 'Customer';
  const userInitial = userName.charAt(0).toUpperCase();

  const navItems = [
    { name: 'My Profile', href: '/dashboard/customer', icon: User },
    { name: 'My Orders', href: '/dashboard/customer/orders', icon: ShoppingBag },
    { name: 'Wishlist', href: '/dashboard/customer/wishlist', icon: Heart },
    { name: 'Addresses', href: '/dashboard/customer/address', icon: MapPin },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = '/login';
  };

  return (
    /* 🎯 Parent Container: Screen height locked */
    <div className="min-h-screen h-screen bg-[#F8F6F0] dark:bg-neutral-950 flex text-gray-900 dark:text-gray-100 overflow-hidden">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
        />
      )}

      {/* 🎯 Customer Sidebar: Top to Bottom Full Height Fixed */}
      <aside className={`
        fixed lg:static top-0 left-0 h-screen w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 z-50 transition-transform duration-300 flex flex-col justify-between shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Sidebar Header */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 dark:border-neutral-800 shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-gray-900 dark:text-white">EcoWorld</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                    <div className={`
                      flex items-center gap-3 px-4 py-3 rounded-2xl transition font-medium text-sm
                      ${isActive 
                        ? 'bg-[#2D5A27] text-white shadow-md' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'}
                    `}>
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer (Bottom Fixed) */}
          <div className="p-4 border-t border-gray-100 dark:border-neutral-800 space-y-2 shrink-0">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-2xl transition text-sm font-medium">
              <Home className="w-5 h-5" /> হোমে ফিরে যান
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition text-sm font-medium">
              <LogOut className="w-5 h-5" /> লগআউট
            </button>
          </div>
        </div>
      </aside>

      {/* 🎯 Main Content Container with Internal Scroll */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Header */}
        <header className="h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700 dark:text-gray-200">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maroon-600 to-rose-600 text-white font-bold flex items-center justify-center shadow-md">
              {userInitial}
            </div>
            <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{userName}</span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6 md:p-8 max-w-6xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}