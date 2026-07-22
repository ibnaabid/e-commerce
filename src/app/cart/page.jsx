"use client";

import { useEffect, useState, useCallback } from "react";
// import { useSession } from "next-auth/react";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "../lib/auth-client";

export default function CartPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // 📡 Cart Items Fetching
  const fetchCart = useCallback(async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/cart?email=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        setCartItems(data);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (status !== "loading") {
      fetchCart();
    }
  }, [status, fetchCart]);

  // 🗑️ Delete Item Handler
  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`http://localhost:5000/cart/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // 💰 Total Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const shipping = cartItems.length > 0 ? 60 : 0; // Standard Shipping Fee
  const grandTotal = subtotal + shipping;

  // 🔄 Loading State
  if (status === "loading" || loading) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex flex-col items-center justify-center gap-3 text-white">
        <Loader2 className="animate-spin text-emerald-400" size={36} />
        <p className="text-sm text-neutral-400 font-medium">Loading your cart...</p>
      </div>
    );
  }

  // 🔒 Not Logged In State
  if (!userEmail) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex items-center justify-center px-4 text-white">
        <div className="text-center p-8 bg-neutral-900/80 border border-white/10 rounded-3xl max-w-md w-full">
          <ShoppingBag className="mx-auto text-emerald-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-2">Please Login First</h2>
          <p className="text-neutral-400 text-sm mb-6">
            You need to be logged in to view and manage your shopping cart.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-2xl transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <ShoppingBag className="text-emerald-400" /> Your Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* 🛒 Empty Cart State */
          <div className="text-center py-20 bg-neutral-900/50 border border-white/5 rounded-3xl">
            <ShoppingBag className="mx-auto text-neutral-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Looks like you haven't added any eco-friendly items yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-xl text-white transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          /* 📦 Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-neutral-900/80 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition duration-300"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Image */}
                    <div className="relative h-20 w-20 bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={item.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"}
                        alt={item.name || "Product Image"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="font-semibold text-white text-base line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">Price: ৳{item.price}</p>
                      <p className="text-xs font-semibold text-emerald-400 mt-1">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>
                  </div>

                  {/* Total & Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-neutral-400 block sm:inline">Total: </span>
                      <span className="text-base font-bold text-white">
                        ৳{(item.price || 0) * (item.quantity || 1)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={actionLoading === item._id}
                      className="p-2.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition disabled:opacity-50"
                      title="Remove Item"
                    >
                      {actionLoading === item._id ? (
                        <Loader2 size={18} className="animate-spin text-red-400" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-white/10">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Shipping Fee</span>
                    <span className="text-white font-medium">৳{shipping}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold text-white">
                    <span>Total Amount</span>
                    <span className="text-emerald-400 text-xl">৳{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Proceeding to Checkout!")}
                  className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-2xl transition active:scale-[0.98] shadow-lg shadow-emerald-900/30"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
                  <ShieldCheck size={14} className="text-emerald-400" /> Guaranteed Safe & Secure Checkout
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}