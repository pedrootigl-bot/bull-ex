import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Site publicado em: https://campanhasbullex.com/bullex/
 * Sem basePath, CSS/JS apontam para /_next (raiz do domínio) e quebram.
 *
 * Para publicar na raiz do domínio, defina BASE_PATH= (vazio) no build.
 */
const rawBasePath = process.env.BASE_PATH ?? "/bullex";
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
    qualities: [75, 85, 90, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
