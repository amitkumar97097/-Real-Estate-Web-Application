/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch bugs early
  swcMinify: true,       // Faster builds with SWC compiler

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ],
    formats: ["image/avif", "image/webp"], // Better image optimization
  },

  eslint: {
    ignoreDuringBuilds: true, // Prevents deployment failures due to linting
  },

  typescript: {
    ignoreBuildErrors: true, // Prevents deployment failures if TS is not strict
  }
};

module.exports = nextConfig;
