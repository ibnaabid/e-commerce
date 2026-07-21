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

import { authClient } from '@/app/lib/auth-client';

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
    <div className="w-full max-w-full space-y-8 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      
      {/* 🚀 Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-800/40"
      >
        <div className="space-y-1.5">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs px-3.5 py-1 rounded-full font-semibold border border-emerald-500/30">
            অ্যাডমিন ড্যাশবোর্ড
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mt-1">
            ওয়েলকাম ব্যাক, {userName}! 👋
          </h1>
          <p className="text-emerald-100/80 text-sm max-w-xl">
            আজকের স্টোর আপডেট এবং সেলস ওভারভিউ নিচে দেওয়া হলো।
          </p>
        </div>
        
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all duration-200 active:scale-95 whitespace-nowrap">
          <PlusCircle className="w-5 h-5" /> নতুন প্রোডাক্ট যোগ করুন
        </button>
      </motion.div>

      {/* 📊 Stats Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'মোট বিক্রি', val: '৳ ১,৫৮,৪০০', icon: DollarSign, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
          { label: 'মোট অর্ডার', val: '১,২৪৫টি', icon: ShoppingBag, color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
          { label: 'পেন্ডিং আইটেম', val: '৮৬টি', icon: Package, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
          { label: 'সক্রিয় গ্রাহক', val: '৪৫০ জন', icon: Users, color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="w-full bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{stat.val}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 📈 Sales Chart Section */}
      <div className="w-full bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">সেলস ওভারভিউ</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">গত ৬ মাসের বিক্রি ট্র্যাকিং রিলেটেড ডেটা</p>
          </div>
          <span className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3.5 py-1.5 rounded-full font-bold border border-emerald-500/20">
            ২০২৬ রিপোর্ট
          </span>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0F172A', 
                  borderRadius: '16px', 
                  border: '1px solid #334155', 
                  color: '#fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#10B981" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}