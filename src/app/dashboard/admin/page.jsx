'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  DollarSign, 
  PlusCircle, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { authClient } from '@/lib/auth-client';

const chartData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 9800 },
  { name: 'Apr', sales: 3908 },
  { name: 'May', sales: 4800 },
  { name: 'Jun', sales: 13000 },
];

export default function AdminMainPage() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || 'অ্যাডমিন';

  return (
    <div className="space-y-8">
      
      {/* 🚀 Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2D5A27] to-[#1B3B18] text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <span className="bg-white/10 text-[#A3E635] text-xs px-3 py-1 rounded-full font-semibold border border-white/10">
            অ্যাডমিন প্যানেল
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-2">ওয়েলকাম ব্যাক, {userName}! 👋</h1>
          <p className="text-white/80 text-sm mt-1">আজকের স্টোর আপডেট এবং সেলস রিপোর্ট তৈরি রয়েছে।</p>
        </div>
        <button className="bg-[#800020] hover:bg-[#600018] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition">
          <PlusCircle className="w-4 h-4" /> নতুন প্রোডাক্ট যোগ করুন
        </button>
      </motion.div>

      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'মোট বিক্রি', val: '৳ ১,৫৮,৪০০', icon: DollarSign, color: 'bg-emerald-500/10 text-emerald-600' },
          { label: 'মোট অর্ডার', val: '১,২৪৫টি', icon: ShoppingBag, color: 'bg-blue-500/10 text-blue-600' },
          { label: 'পেন্ডিং আইটেম', val: '৮৬টি', icon: Package, color: 'bg-amber-500/10 text-amber-600' },
          { label: 'সক্রিয় গ্রাহক', val: '৪৫০ জন', icon: Users, color: 'bg-purple-500/10 text-purple-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-neutral-900 p-5 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.val}</h3>
              </div>
              <div className={`p-3.5 rounded-2xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 📈 Sales Chart Section */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">সেলস ওভারভিউ</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">গত ৬ মাসের বিক্রি ট্র্যাকিং</p>
          </div>
          <span className="text-xs bg-[#2D5A27]/10 text-[#2D5A27] dark:text-[#A3E635] px-3 py-1 rounded-full font-bold">
            ২০২৬ রিপোর্ট
          </span>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: 'none', color: '#fff' }} />
              <Area type="monotone" dataKey="sales" stroke="#2D5A27" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}