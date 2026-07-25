// components/Navbar.jsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useSession } from '../lib/auth-client';
// import { useSession } from 'next-auth/react'; // 👈 NextAuth Session

export default function NavbarCart() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [cartCount, setCartCount] = useState(0);

  // 📡 কার্ট আইটেম সংখ্যা ব্যাকএন্ড থেকে ফেচ করার ফাংশন
  const fetchCartCount = useCallback(async () => {
    if (!userEmail) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/cart?email=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        const total = data.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(total);
      }
    } catch (err) {
      console.error("Navbar cart fetch error:", err);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchCartCount();

    // 🔄 AddToCart থেকে ডিসপ্যাচ করা custom event লিসেন করে রিয়েল-টাইম আপডেট করবে
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [fetchCartCount]);

  return (
    <nav className="bg-red-950 hover:bg-green-700/30 border-b border-white/10 rounded-full sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 🛒 Cart Icon with Dynamic Badge */}
        <Link 
          href="/cart" 
          className="relative flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
          title="View Cart"
        >
          <ShoppingCart size={22} className="text-white group-hover:text-emerald-400 transition-colors" />

          {/* 🔴 Cart Count Badge */}
          {userEmail && cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-neutral-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-neutral-950 animate-in zoom-in-50">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}