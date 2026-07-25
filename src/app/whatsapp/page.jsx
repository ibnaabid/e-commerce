"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppBtn({ product }) {
  // 📱 ফোন নাম্বার থেকে স্পেস ও ড্যাশ ফিল্টার করে ক্লিন নাম্বার তৈরি
  const rawPhoneNumber = "880 1823-633271"; 
  const phoneNumber = rawPhoneNumber.replace(/[^0-9]/g, ""); // আউটপুট: "8801823633271"

  // 📦 প্রোডাক্ট অবজেক্ট এভেলেবল কিনা চেক করা
  const isProductAvailable = Boolean(
    product && (product._id || product.id || product.name || product.title)
  );

  const productId = product?._id || product?.id || "N/A";
  const productName = product?.name || product?.title || "Product";

  // 💬 ব্যাকটিক ( Template Literal ) ঠিক করে মেসেজ ফরম্যাট করা হয়েছে
  const customMessage = isProductAvailable
    ? `Hello EcoWorld! শুভ দিন! আপনার মনের মতো প্রোডাক্ট খুঁজে পেতে সাহায্য লাগবে? আমাদের সরাসরি মেসেজ দিন।\n\n📌 Product: ${productName}\n🆔 Product ID: ${productId}`
    : "হ্যালো! আপনার কেনাকাটাকে আরও সহজ করতে আমরা আছি আপনার সাথে। কীভাবে সাহায্য করব বলুন?";

  const defaultMessage = encodeURIComponent(customMessage);

  // WhatsApp Link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-3 rounded-full shadow-2xl shadow-emerald-950/80 transition-all duration-300 hover:scale-105 group border border-emerald-400/30 backdrop-blur-md"
      title="Contact us on WhatsApp"
    >
      {/* Pulse Effect সহ Icon */}
      <div className="relative flex items-center justify-center">
        <MessageCircle size={24} className="fill-white/20 stroke-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>
      </div>

      {/* Text Label */}
      <span className="text-sm font-medium tracking-wide pr-1">
        Chat with us
      </span>
    </a>
  );
}