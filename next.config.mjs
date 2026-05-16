/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
    images: {
    localPatterns: [
      {
        pathname: '**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
