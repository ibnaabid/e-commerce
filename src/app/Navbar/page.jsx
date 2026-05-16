import Link from "next/link";

import { ShoppingCart, User2 } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-slate-950 text-white">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

   <Link href="/" className="flex items-center gap-2">
  <Image className="rounded-3xl border-none"
    src="/doruk-bayram-gs3duh5iqkw-unsplash.jpg"
    height={20}
    width={30}
    alt="logo"
  />

  <span className="text-2xl font-bold text-violet-500">
    AbidStore
  </span>
</Link>

        {/* Menu */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="transition hover:text-violet-400"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="transition hover:text-violet-400"
          >
            Products
          </Link>

          <Link href={"/pro"} className="transition hover:text-violet-500">
          Products-sign
          </Link>

          <Link
            href="/dashboard"
            className="transition hover:text-violet-400"
          >
            Dashboard
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-violet-400"
          >
            Contact
          </Link>

        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Cart */}
          <button className="relative rounded-full p-2 transition hover:bg-white/10">

            <ShoppingCart size={22} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-xs">
              2
            </span>

          </button>

          {/* User */}
          <button className="rounded-full p-2 transition hover:bg-white/10">
            <User2 size={22} />
          </button>

          {/* Login */}
          <Link
            href="/login"
            className="rounded-xl bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-700"
          >
            Login
          </Link>
          <Link href="/signup" className="rounded-2xl bg-green-600 px-5 py-2 font-medium transition">
        Sign Up  </Link>
          
        

        </div>

      </div>

    </nav>
  );
};

export default Navbar;