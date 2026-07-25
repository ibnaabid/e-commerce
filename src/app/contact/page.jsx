"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  ArrowRight,
  Globe,
  Sparkles
} from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-800 dark:text-neutral-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* 🌿 HERO SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-4 backdrop-blur-md">
            <Sparkles size={14} /> আমাদের সাথে যুক্ত থাকুন
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            যোগাযোগ করুন
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-3 leading-relaxed">
            আপনার যেকোনো প্রশ্ন, মতামত বা সহায়তার জন্য আমরা সবসময় প্রস্তুত। নিচে দেওয়া মাধ্যমগুলোর মাধ্যমে সরাসরি আমাদের সাথে কথা বলতে পারেন।
          </p>
        </div>

        {/* 📇 QUICK CONTACT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* 💬 WHATSAPP DIRECT CHAT */}
          <div className="bg-white dark:bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">WhatsApp চ্যাট</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2 leading-relaxed">
                তাৎক্ষণিক সহায়তার জন্য সরাসরি আমাদের হোয়াটসঅ্যাপে মেসেজ পাঠান।
              </p>
            </div>

            <a
              href="https://wa.me/8801823633271?text=Hello!%20I%20have%20a%20query."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-between px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all duration-300 shadow-md active:scale-98"
            >
              <span>হোয়াটসঅ্যাপে কথা বলুন</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* ✉️ DIRECT EMAIL */}
          <div className="bg-white dark:bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-5 transition-transform">
                <Mail size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">ইমেইল করুন</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-2 leading-relaxed">
                যেকোনো অফিশিয়াল বা বিস্তারিত তথ্যের জন্য ইমেইল পাঠাতে পারেন।
              </p>
            </div>

           <Link
  href="mailto:mdmosabbirrahman07@gmail.com?subject=Inquiry%20from%20EcoWorld%20Website"
  className="mt-6 inline-flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-900 dark:bg-neutral-800 hover:bg-[#800020]  text-white font-bold text-xs transition-all duration-300 shadow-md active:scale-98"
>
  <span>ইমেইল পাঠান</span>
  <ArrowRight size={16} />
</Link>
          </div>

        </div>

        {/* 📍 ADDITIONAL INFO SECTION */}
        <div className="bg-white dark:bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-slate-300/80 dark:border-neutral-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-neutral-800 pb-3">
            অন্যান্য প্রয়োজনীয় তথ্য
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Phone Number */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">ফোন নম্বর</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 mt-0.5">+880 1823-633271</p>
              </div>
            </div>

            {/* Office Time */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">কাজের সময়</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 mt-0.5">প্রতিদিন (সকাল ১০:০০ - রাত ১০:০০)</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">অবস্থান</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 mt-0.5">ঢাকা, বাংলাদেশ</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;