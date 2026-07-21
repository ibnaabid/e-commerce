// components/Footer.js
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-maroon-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="text-emerald-500" size={32} />
              <span className="text-2xl font-bold text-white">EcoWorld</span>
            </div>
            <p className="text-sm">ঘরে বসে সবুজ বাজার করুন</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
              <li><Link href="/About" className="hover:text-white">About Us</Link></li>
      
              <li><Link href="/FAQ" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">+880 1823-633271</p>
            <p className="text-sm">mdmosabbirrahman07@gmail.com</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-neutral-900 border border-maroon-800 rounded-2xl px-5 py-3 w-full text-sm"
            />
          </div>
        </div>

        <div className="text-center mt-16 pt-8 border-t border-neutral-800 text-xs">
          © 2026 EcoWorld Ghore Bajar • All Rights Reserved
        </div>
      </div>
    </footer>
  );
}