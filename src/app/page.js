import Image from "next/image";

export default function Home() {
  return (
  //  <>
  <>
<section className="relative overflow-hidden bg-slate-950 text-white">

  {/* BACKGROUND BLUR */}
  <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl animate-pulse"></div>

  <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>

  <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-14 px-6 py-20 md:grid-cols-2">

    {/* LEFT */}
    <div className="space-y-8">

      <span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2 text-sm text-violet-400 backdrop-blur-md">
        🔥 Best Modern E-Commerce Store
      </span>

      <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">

        Discover
        <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
          {" "}Premium{" "}
        </span>

        Products

      </h1>

      <p className="max-w-xl text-lg leading-8 text-gray-400">
        Upgrade your lifestyle with premium electronics,
        fashion, accessories and modern collections.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-5">

        <button className="group relative overflow-hidden rounded-2xl bg-violet-600 px-8 py-4 font-semibold transition duration-300 hover:scale-105 hover:bg-violet-700">

          <span className="relative z-10">
            Shop Now
          </span>

          <div className="absolute inset-0 translate-y-full bg-white/10 transition duration-300 group-hover:translate-y-0"></div>

        </button>

        <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-md transition duration-300 hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/10">
          Explore More
        </button>

      </div>

      {/* STATS */}
      <div className="flex gap-10 pt-8">

        <div>
          <h2 className="text-3xl font-bold text-violet-400">
            10K+
          </h2>

          <p className="text-gray-400">
            Customers
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-cyan-400">
            500+
          </h2>

          <p className="text-gray-400">
            Products
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-400">
            99%
          </h2>

          <p className="text-gray-400">
            Satisfaction
          </p>
        </div>

      </div>

    </div>

    {/* RIGHT */}
    <div className="relative flex justify-center">

      {/* GLOW */}
      <div className="absolute h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-3xl"></div>

      {/* IMAGE */}
      <Image 
      alt=""
      height={400}
      width={400}
        src="/vecteezy_female-manager-using-laptop-computer-to-check-inventory-in_46673354.JPG"
        className="relative z-10 w-full max-w-md rounded-[40px] border border-white/10 shadow-2xl transition duration-500 hover:-translate-y-4 hover:rotate-1 hover:scale-105"
      />

      {/* FLOATING CARD */}
      <div className="absolute -left-10 top-10 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl animate-bounce">

        <p className="text-sm text-gray-300">
          Special Offer
        </p>

        <h3 className="text-2xl font-bold text-violet-400">
          50% OFF
        </h3>

      </div>

      {/* FLOATING REVIEW */}
      <div className="absolute -bottom-8 right-0 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl transition duration-300 hover:scale-105">

        <p className="text-yellow-400">
          ⭐⭐⭐⭐⭐
        </p>

        <h3 className="font-semibold">
          4.9 Ratings
        </h3>

      </div>

    </div>

  </div>

</section>
  </>
  );
}
