// app/about/page.js
"use client";
import { motion } from "framer-motion";
import { Leaf, Users, Award, Heart } from "lucide-react";
// import Navbar from "../../components/Navbar";

export default function About() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-neutral-950 min-h-screen text-white pt-20">
        {/* Hero */}
        <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2c9f3f1c4')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-neutral-950" />
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-6 max-w-4xl"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">প্রকৃতির সাথে বাঁচি</h1>
            <p className="text-2xl text-emerald-300">EcoWorld Ghore Bajar — সবুজের সেবায়</p>
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-8">আমাদের গল্প</h2>
              <p className="text-lg text-neutral-300 leading-relaxed">
                ২০২৬ সালে প্রতিষ্ঠিত EcoWorld Ghore Bajar শুরু হয়েছিল একটা স্বপ্ন থেকে — 
                ঘরে বসে স্বাস্থ্যকর, অর্গানিক ও পরিবেশবান্ধব পণ্য কেনার সুযোগ করে দেওয়া।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, num: "50K+", label: "Happy Customers" },
                { icon: Leaf, num: "1200+", label: "Eco Products" },
                { icon: Award, num: "98%", label: "Satisfaction Rate" },
                { icon: Heart, num: "24", label: "Cities Serving" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-neutral-900 p-8 rounded-3xl border border-maroon-800 text-center"
                >
                  <item.icon className="mx-auto mb-4 text-emerald-500" size={40} />
                  <h3 className="text-3xl font-bold text-white">{item.num}</h3>
                  <p className="text-neutral-400">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mission */}
        <div className="bg-neutral-900 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">আমাদের লক্ষ্য</h2>
            <p className="text-xl text-neutral-300">
              আমরা বিশ্বাস করি — প্রতিটি কেনাকাটা হোক পরিবেশের প্রতি ভালোবাসার প্রকাশ।
            </p>
          </div>
        </div>
      </div>
    </>
  );
}