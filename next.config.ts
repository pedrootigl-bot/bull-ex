import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    qualities: [75, 100],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
