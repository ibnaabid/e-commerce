'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  TrendingUp, DollarSign, Users, ShoppingBag, ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';

// মাসিক রেভিনিউ ডাটা
const monthlyRevenueData = [
  { month: 'জানু', sales: 4000, revenue: 24000 },
  { month: 'ফেব্রু', sales: 3000, revenue: 19800 },
  { month: 'মার্চ', sales: 5000, revenue: 38000 },
  { month: 'এপ্রিল', sales: 4780, revenue: 32000 },
  { month: 'মে', sales: 5890, revenue: 45000 },
  { month: 'জুন', sales: 4390, revenue: 31000 },
  { month: 'জুলাই', sales: 6500, revenue: 52000 },
];

// ক্যাটাগরি অনুযায়ী বিক্রির ডাটা
const categoryData = [
  { name: 'বাঁশের ফার্নিচার', value: 45, color: '#800020' },
  { name: 'ডেকোরেটিভ আইটেম', value: 25, color: '#2D5A27' },
  { name: 'কাটলারি ও ট্রে', value: 20, color: '#D97706' },
  { name: 'অন্যান্য', value: 10, color: '#6B7280' },
];

// ডেইলি অর্ডার ট্র্যাকিং
const dailyOrderData = [
  { day: 'শনি', orders: 45 },
  { day: 'রবি', orders: 52 },
  { day: 'সোম', orders: 38 },
  { day: 'মঙ্গল', orders: 65 },
  { day: 'বুধ', orders: 48 },
  { day: 'বৃহঃ', orders: 70 },
  { day: 'শুক্র', orders: 85 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-8 p-1 sm:p-4">
      
      {/* 🏷️ পেজ হেডার */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">অ্যানালিটিক্স ও রিপোর্ট</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">আপনার ব্যবসার রিয়েল-টাইম পারফরম্যান্স ও সেলস স্ট্যাটিস্টিক্স</p>
        </div>

        {/* ফিল্টার বাটন */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-900 p-1.5 rounded-2xl border border-gray-200 dark:border-maroon-900/50">
          <Calendar className="w-4 h-4 text-maroon-600 ml-2" />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer pr-2"
          >
            <option value="weekly" className="dark:bg-neutral-900">গত ৭ দিন</option>
            <option value="monthly" className="dark:bg-neutral-900">গত ৩০ দিন</option>
            <option value="yearly" className="dark:bg-neutral-900">গত ১ বছর</option>
          </select>
        </div>
      </div>

      {/* 📊 ৪টি কি-স্ট্যাটস অ্যানিমেটেড কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'মোট রেভিনিউ', value: '৳ ২,৪১,৮০০', change: '+১২.৫%', isUp: true, icon: DollarSign, color: 'from-emerald-500 to-teal-700' },
          { title: 'মোট অর্ডার', value: '১,৪২০ টি', change: '+৮.২%', isUp: true, icon: ShoppingBag, color: 'from-maroon-600 to-rose-700' },
          { title: 'নতুন কাস্টমার', value: '৩৪৮ জন', change: '-২.১%', isUp: false, icon: Users, color: 'from-blue-600 to-indigo-700' },
          { title: 'কনভার্সন রেট', value: '৪.৩৫%', change: '+৩.৪%', isUp: true, icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-neutral-900/90 p-5 rounded-3xl border border-gray-100 dark:border-maroon-900/40 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5 ${
                  stat.isUp ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                }`}>
                  {stat.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 📈 প্রধান এরিয়া চার্ট (রেভিনিউ গ্রোথ) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-neutral-900/90 p-6 rounded-3xl border border-gray-100 dark:border-maroon-900/40 shadow-sm"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">আয় ও বিক্রয়ের ওভারভিউ</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">মাসিক রেভিনিউ ট্রেন্ড এনালাইসিস</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#800020" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#800020" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#888888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#888888' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', borderRadius: '16px', border: '1px solid #333', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#800020" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 📊 গ্রিড: বার চার্ট & পাই চার্ট */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* বার চার্ট - সাপ্তাহিক অর্ডার */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-neutral-900/90 p-6 rounded-3xl border border-gray-100 dark:border-maroon-900/40 shadow-sm"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">দৈনিক অর্ডার সংখ্যা</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">চলতি সপ্তাহের প্রতিদিনের অর্ডারের পরিমাণ</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyOrderData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#888888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#888888' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: 'none', color: '#fff' }} />
                <Bar dataKey="orders" fill="#2D5A27" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* পাই চার্ট - ক্যাটাগরি শেয়ার */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-neutral-900/90 p-6 rounded-3xl border border-gray-100 dark:border-maroon-900/40 shadow-sm"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">ক্যাটাগরি ভিত্তিক বিক্রি (%)</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">কোন ক্যাটাগরি থেকে সবচেয়ে বেশি বিক্রি হচ্ছে</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: 'none', color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

    </div>
  );
}