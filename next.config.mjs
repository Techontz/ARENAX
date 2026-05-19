/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.sofascore.com',
      },
      {
        protocol: 'https',
        hostname: 'api.sofascore.app',
      },
    ],
  },
};

export default nextConfig;