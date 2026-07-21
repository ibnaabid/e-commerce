'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Shield, Bell, CreditCard, Save, Check, Lock, Store
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  // সেভ নোটিফিকেশন হ্যান্ডলার
  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 p-1 sm:p-4 max-w-5xl mx-auto">
      
      {/* 🏷️ পেজ হেডার */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">সেটিংস</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">আপনার স্টোর ও অ্যাডমিন প্যানেলের কনফিগারেশন পরিবর্তন করুন</p>
      </div>

      {/* 🔘 নেভিগেশন ট্যাবসমূহ */}
      <div className="flex border-b border-gray-200 dark:border-neutral-800 gap-2 sm:gap-6 overflow-x-auto pb-1">
        {[
          { id: 'general', label: 'সাধারণ সেটিংস', icon: Store },
          { id: 'security', label: 'সিকিউরিটি', icon: Shield },
          { id: 'notifications', label: 'নোটিফিকেশন', icon: Bell },
          { id: 'payment', label: 'পেমেন্ট গেটওয়ে', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-maroon-600 text-maroon-600 dark:text-rose-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 📝 ফর্ম কন্টেন্ট (Tab Content) */}
      <motion.form 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSave}
        className="bg-white dark:bg-neutral-900/90 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-maroon-900/40 shadow-sm space-y-6"
      >
        
        {/* ১. জেনারেল সেটিংস */}
        {activeTab === 'general' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">স্টোর ইনফরমেশন</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">স্টোরের নাম</label>
                <input 
                  type="text" 
                  defaultValue="EcoWorld" 
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-maroon-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">সাপোর্ট ইমেইল</label>
                <input 
                  type="email" 
                  defaultValue="support@ecoworld.com" 
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-maroon-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">স্টোরের সংক্ষিপ্ত বিবরণ</label>
              <textarea 
                rows="3" 
                defaultValue="পরিবেশবান্ধব ও বাঁশের তৈরি সেরা হস্তশিল্প ই-কমার্স প্ল্যাটফর্ম।"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-maroon-600 resize-none"
              />
            </div>
          </div>
        )}

        {/* ২. সিকিউরিটি সেটিংস */}
        {activeTab === 'security' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">পাসওয়ার্ড পরিবর্তন</h3>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">বর্তমান পাসওয়ার্ড</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-maroon-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">নতুন পাসওয়ার্ড</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-maroon-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* ৩. নোটিফিকেশন সেটিংস */}
        {activeTab === 'notifications' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ইমেইল নোটিফিকেশন সেটিংস</h3>
            
            <div className="space-y-4">
              {[
                { title: 'নতুন অর্ডারের অ্যালার্ট', desc: 'কাস্টমার নতুন কোনো অর্ডার করলে ইমেইল পাবেন' },
                { title: 'লো স্টক অ্যালার্ট', desc: 'কোনো প্রোডাক্টের স্টক শেষ হয়ে এলে নোটিফিকেশন যাবে' },
                { title: 'নতুন কাস্টমার রেজিস্ট্রেশন', desc: 'নতুন কোনো ইউজার অ্যাকাউন্ট খুললে নোটিফাইড হবেন' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800/50">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-maroon-700 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ৪. পেমেন্ট সেটিংস */}
        {activeTab === 'payment' && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">পেমেন্ট মেথড কনফিগারেশন</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-gray-200 dark:border-neutral-700 flex justify-between items-center">
                <span className="font-bold text-sm text-gray-800 dark:text-gray-200">ক্যাশ অন ডেলিভারি (COD)</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">সক্রিয়</span>
              </div>
              <div className="p-4 rounded-2xl border border-gray-200 dark:border-neutral-700 flex justify-between items-center">
                <span className="font-bold text-sm text-gray-800 dark:text-gray-200">bkash / Nagad গেটওয়ে (SSLCommerz)</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">সক্রিয়</span>
              </div>
            </div>
          </div>
        )}

        {/* 💾 সেভ বাটন */}
        <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> সেটিংস সফলভাবে সেভ হয়েছে!
            </span>
          ) : <span />}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-maroon-700 to-rose-700 hover:from-maroon-800 hover:to-rose-800 text-white font-semibold text-sm transition shadow-md"
          >
            <Save className="w-4 h-4" /> পরিবর্তন সেভ করুন
          </button>
        </div>

      </motion.form>

    </div>
  );
}