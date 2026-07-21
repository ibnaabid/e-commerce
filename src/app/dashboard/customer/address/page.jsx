'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  Building, 
  Globe, 
  Save, 
  Check, 
  Home, 
  Briefcase 
} from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';
// import { authClient } from '@/lib/auth-client';

export default function CustomerAddressPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [saved, setSaved] = useState(false);
  const [addressType, setAddressType] = useState('home'); // 'home' or 'office'

  // ঠিকানা সেভ হ্যান্ডলার
  const handleSaveAddress = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* 🏷️ পেজ হেডার */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">ডেলিভারি ঠিকানা ও প্রোফাইল</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          আপনার প্রোডাক্ট ডেলিভারি সংক্রান্ত সঠিক বিবরণ এবং যোগাযোগের তথ্য পরিবর্তন করুন
        </p>
      </div>

      {/* 💳 কাস্টমার প্রোফাইল সামারি কার্ড (Auth Data থেকে) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-r from-[#1B3B18] to-[#2D5A27] text-white shadow-xl flex flex-col sm:flex-row items-center gap-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-extrabold text-2xl text-[#A3E635] shadow-inner border border-white/20">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-center sm:text-left">
          <span className="bg-white/10 text-[#A3E635] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10">
            যাচাইকৃত অ্যাকাউন্ট
          </span>
          <h2 className="text-xl font-extrabold mt-1">{user?.name || 'লোডিং...'}</h2>
          <p className="text-xs text-white/80 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
            <Mail className="w-3.5 h-3.5" /> {user?.email || 'ইমেইল লোড হচ্ছে...'}
          </p>
        </div>
      </motion.div>

      {/* 📝 ফুল এড্রেস ফর্ম */}
      <motion.form 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSaveAddress}
        className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm space-y-6"
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 pb-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2D5A27] dark:text-emerald-400" /> বিস্তারিত শিপিং ঠিকানা
          </h3>

          {/* ঠিকানার টাইপ সিলেক্টর */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAddressType('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                addressType === 'home'
                  ? 'bg-[#2D5A27] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> বাসা
            </button>
            <button
              type="button"
              onClick={() => setAddressType('office')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                addressType === 'office'
                  ? 'bg-[#2D5A27] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> অফিস
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* নাম (Auth থেকে ডিফল্ট ভ্যালু) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">পূর্ণ নাম</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                defaultValue={user?.name || ''} 
                placeholder="আপনার নাম লিখুন"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#2D5A27]"
                required
              />
            </div>
          </div>

          {/* ফোন নম্বর */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">মোবাইল নম্বর</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="tel" 
                defaultValue="01700000000" 
                placeholder="০১৭xxxxxxxx"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#2D5A27]"
                required
              />
            </div>
          </div>

          {/* জেলা / বিভাগ */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">জেলা / বিভাগ</label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#2D5A27] cursor-pointer">
                <option value="dhaka">ঢাকা</option>
                <option value="chittagong">চট্টগ্রাম</option>
                <option value="rajshahi">রাজশাহী</option>
                <option value="rangpur">রংপুর</option>
                <option value="khulna">খুলনা</option>
                <option value="sylhet">সিলেট</option>
              </select>
            </div>
          </div>

          {/* থানা / এরিয়া */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">থানা / পোস্ট কোড</label>
            <div className="relative">
              <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                defaultValue="ধানমন্ডি, ১২০৯" 
                placeholder="থানা ও জিপ কোড"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#2D5A27]"
                required
              />
            </div>
          </div>
        </div>

        {/* সম্পুর্ণ রোড/বাসা নম্বর */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">বাসা নম্বর / রোড নম্বর / বাড়ি ট্র্যাকিং</label>
          <textarea 
            rows="3" 
            defaultValue="রোড নং ৮/এ, বাসা নং ৪২ (ফ্ল্যাট বি-৩), ধানমন্ডি, ঢাকা।"
            placeholder="আপনার সম্পূর্ণ ঠিকানা এখানে দিন..."
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#2D5A27] resize-none"
            required
          />
        </div>

        {/* 💾 সাবমিট বাটন */}
        <div className="pt-2 flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> ঠিকানা আপডেট সম্পন্ন হয়েছে!
            </span>
          ) : <span />}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2D5A27] hover:bg-[#1B3B18] text-white font-bold text-sm transition shadow-lg ml-auto"
          >
            <Save className="w-4 h-4" /> ঠিকানা সেভ করুন
          </button>
        </div>

      </motion.form>

    </div>
  );
}