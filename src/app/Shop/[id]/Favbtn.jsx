// components/FavoriteBtn.jsx
'use client';

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useSession } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";

export default function FavoriteBtn({ product }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  const productId = product?._id;

  // 1. চেক করা হচ্ছে প্রোডাক্টটি ইউজারের উইশলিস্টে আগে থেকেই আছে কিনা
  useEffect(() => {
    if (!userEmail || !productId) return;

    const checkWishlist = async () => {
      try {
        const res = await fetch(`https://e-commerce-backend-kappa-nine.vercel.app/wishlist/check?email=${userEmail}&productId=${productId}`);
        if (res.ok) {
          const data = await res.json();
          setIsFav(data.isFavorite);
        }
      } catch (err) {
        console.error("Wishlist check error:", err);
      }
    };

    checkWishlist();
  }, [userEmail, productId]);

  // 2. Toggle Favorite (Add/Remove) Handler
  const handleToggleFav = async (e) => {
    e.stopPropagation();

    if (!userEmail) {
      alert("Please login to save favorites!");
      return;
    }

    setLoading(true);

    const wishlistItem = {
      productId: product?._id,
      name: product?.name,
      price: product?.price,
      image: Array.isArray(product?.images) && product.images.length > 0 ? product.images[0] : product?.image || "",
      userEmail: userEmail,
    };

    try {
      const res = await fetch("https://e-commerce-backend-kappa-nine.vercel.app/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishlistItem),
      });

      if (res.ok) {
        const data = await res.json();
        setIsFav(data.isFavorite);
        toast.success("add to favorite")
         // Backend returns updated status true/false
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleFav}
      disabled={loading}
      className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
        isFav
          ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20 scale-105"
          : "bg-neutral-800/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-700"
      } active:scale-95 disabled:opacity-50`}
      title={isFav ? "Remove from Favorites" : "Add to Favorites"}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin text-neutral-400" />
      ) : (
        <Heart
          size={18}
          className={`transition-all duration-300 ${
            isFav ? "fill-red-500 stroke-red-500" : "stroke-current"
          }`}
        />
      )}
<p className="text-red-500 font-bold px-2">      ADD Favourite</p>
    </button>
  );
}