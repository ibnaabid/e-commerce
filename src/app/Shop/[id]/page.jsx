'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Loader2, Plus, Minus, ShoppingCart, Heart, ShieldCheck, Leaf } from "lucide-react";
import AddToCart from "../AddToCart";
import FavoriteBtn from "./Favbtn";
import WhatsAppBtn from "@/app/whatsapp/page";
// import AddToCart from "@/components/AddToCart";   // তোমার AddToCart কম্পোনেন্ট

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/products/${id}`);

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
        setMainImage(data.images?.[0] || data.image);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={50} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <p>Product not found or error loading.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-neutral-900 rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={mainImage || "https://placehold.co/800x800?text=Eco+Product"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-6">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${
                      mainImage === img ? "border-emerald-500" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                <ShieldCheck size={18} />
                <span>Eco Verified • Sustainable</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
              <p className="text-emerald-400 mt-2 text-lg font-medium">
                {product.category}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">৳{product.price}</span>
              {product.discount && (
                <span className="text-red-400 line-through text-2xl">
                  ৳{Math.round(product.price * 1.2)}
                </span>
              )}
            </div>

            <div className="prose prose-invert max-w-none text-neutral-300">
              <p>{product.description}</p>
            </div>

            {/* Add to Cart Component */}
            <div className="pt-6 border-t border-white/10">
              <AddToCart product={product} />
            </div>

            <div className="pt-6 border-t border-white/10">
              <FavoriteBtn product={product} />
              <WhatsAppBtn product={product}/>
            </div>
            

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-center">
              <div>
                <Leaf className="mx-auto text-emerald-400 mb-2" />
                <p className="text-xs text-neutral-400">Natural Material</p>
              </div>
              <div>
                <ShieldCheck className="mx-auto text-emerald-400 mb-2" />
                <p className="text-xs text-neutral-400">Eco Certified</p>
              </div>
              <div>
                <span className="block text-emerald-400 font-bold">Handcrafted</span>
                <p className="text-xs text-neutral-400">In Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}