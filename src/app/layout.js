import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "EcoWorld - প্রিমিয়াম বাঁশের পণ্য ও ইকো ফ্রেন্ডলি শপ",
    template: "%s | EcoWorld Bangladesh",
  },
  description: "EcoWorld থেকে কিনুন ১০০% অর্গানিক বাঁশ, জুট, হোগলা ও প্রাকৃতিক হ্যান্ডমেড পণ্য। টেকসই জীবনযাপনের জন্য সেরা অনলাইন শপ।",
  keywords: [
    "বাঁশের পণ্য", "eco friendly", "bamboo products", "জুট প্রোডাক্ট", 
    "হোগলা", "organic home decor", "eco world", "sustainable living", 
    "বাংলাদেশ", "handmade bamboo", "প্রাকৃতিক পণ্য"
  ],
  authors: [{ name: "EcoWorld BD" }],
  openGraph: {
    title: "EcoWorld - প্রকৃতির ছোঁয়ায় বাঁশের আভিজাত্য",
    description: "টেকসই ও অর্গানিক বাঁশের পণ্য কিনুন সেরা দামে।",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "EcoWorld Logo",
      },
    ],
    siteName: "EcoWorld",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoWorld - প্রিমিয়াম ইকো প্রোডাক্ট",
    description: "বাঁশের পণ্যের সেরা অনলাইন শপ",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F5F1]">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast Notification */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#1F2937',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}