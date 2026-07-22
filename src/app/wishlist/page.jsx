"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart, Trash2, ArrowLeft, Loader2, Sparkles, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "../lib/auth-client";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // 📡 Fetch Wishlist Items
  const fetchWishlist = useCallback(async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/wishlist?email=${userEmail}`);
      if (res.ok) {
        const data = await res.json();
        setWishlistItems(data);
      }
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (status !== "loading") {
      fetchWishlist();
    }
  }, [status, fetchWishlist]);

  // 🗑️ Delete Item from Wishlist
  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(`http://localhost:5000/wishlist/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setWishlistItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // 🔄 Loading State
  if (status === "loading" || loading) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex flex-col items-center justify-center gap-3 text-rose-200">
        <Loader2 className="animate-spin text-rose-500" size={36} />
        <p className="text-sm font-medium text-rose-300/80">Loading your wishlist...</p>
      </div>
    );
  }

  // 🔒 Not Logged In State
  if (!userEmail) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex items-center justify-center px-4">
        <div className="text-center p-8 bg-neutral-900 border border-rose-900/40 rounded-3xl max-w-md w-full shadow-2xl shadow-rose-950/50">
          <Heart className="mx-auto text-rose-500 mb-4 fill-rose-500/20" size={52} />
          <h2 className="text-2xl font-bold text-rose-100 mb-2">Please Login First</h2>
          <p className="text-rose-300/70 text-sm mb-6">
            Log in to access your saved favorites and collections.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3.5 bg-rose-800 hover:bg-rose-700 text-rose-100 font-semibold rounded-2xl transition shadow-lg shadow-rose-950 text-center"
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
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-rose-900/30">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-rose-100 flex items-center gap-3">
              <Heart className="text-rose-500 fill-rose-500" /> My Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-rose-300/60 mt-1">
              You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <Link
            href="/Shop"
            className="flex items-center gap-2 text-xs sm:text-sm text-rose-300/70 hover:text-rose-400 transition"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          /* 💔 Empty Wishlist State */
          <div className="text-center py-20 bg-neutral-900/50 border border-rose-900/20 rounded-3xl">
            <Heart className="mx-auto text-rose-900/60 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-rose-100 mb-2">Your wishlist is empty</h3>
            <p className="text-rose-300/60 text-sm mb-6">
              Explore our products and save your favorite items here.
            </p>
            <Link
              href="/Shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-800 hover:bg-rose-700 font-semibold rounded-xl text-rose-100 transition shadow-lg shadow-rose-950"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* 🍷 Maroon Theme Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="group relative bg-neutral-900 border border-rose-950 hover:border-rose-800/80 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/40 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Remove / Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={actionLoading === item._id}
                  className="absolute top-3 right-3 z-10 p-2 bg-neutral-950/70 hover:bg-rose-900/80 text-rose-300 hover:text-rose-100 rounded-full border border-rose-900/30 backdrop-blur-md transition disabled:opacity-50"
                  title="Remove from Wishlist"
                >
                  {actionLoading === item._id ? (
                    <Loader2 size={16} className="animate-spin text-rose-400" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>

                {/* Card Top: Image Section */}
                <div>
                  <div className="relative h-52 w-full bg-neutral-950 overflow-hidden">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"}
                      alt={item.name || "Product"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <Link
                      href={`/shop/${item.productId}`}
                      className="text-lg font-bold text-rose-100 hover:text-rose-400 transition line-clamp-1"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-rose-400">
                        ৳{item.price}
                      </span>
                      <span className="text-xs text-rose-300/50 flex items-center gap-1">
                        <Sparkles size={12} className="text-rose-500" /> Saved Item
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: View Details / Buy Now Link */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/Shop/${item.productId}`}
                    className="w-full bg-rose-900/60 hover:bg-rose-800 border border-rose-700/50 text-rose-100 font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition duration-200 active:scale-[0.98]"
                  >
                    <span>View Product Details</span>
                    <ExternalLink size={16} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}