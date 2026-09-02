import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    qualities: [75, 100],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
