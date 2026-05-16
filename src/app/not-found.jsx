import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      
      <div className="text-center">
        
        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-violet-500 md:text-9xl">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-400">
          Sorry, the page you are looking for does not exist.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-8 inline-block rounded-2xl bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}