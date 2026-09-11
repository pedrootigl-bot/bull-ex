import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Em produção (Hostinger) o site fica em /bullex/.
 * No `next dev` local, basePath fica vazio para abrir em http://localhost:3000/pt-br/
 *
 * Override: BASE_PATH=/bullex npm run dev
 * Sem subpasta no build: BASE_PATH= npm run build
 */
const isDev = process.env.NODE_ENV === "development";
const rawBasePath =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : isDev
      ? ""
      : "/bullex";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85, 90, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
