/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এটি সব ওয়েবসাইট থেকে ইমেজ এলাও করবে
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;