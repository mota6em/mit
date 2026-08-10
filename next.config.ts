import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
    // AVIF first — typically 20-40% smaller than WebP for photography, which
    // is nearly all of this site's payload.
    formats: ["image/avif", "image/webp"],
    // Optimized derivatives are immutable in practice; keep them for a month
    // instead of re-encoding on every cache miss.
    minimumCacheTTL: 2_592_000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    // These three are barrel files: without this, importing one icon pulls the
    // whole library into the client bundle.
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "swr",
    ],
  },

  async headers() {
    return [
      {
        // Fingerprinted build output never changes under a given URL.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static art direction in /public is stable between deploys; let the
        // CDN and browser hold it rather than re-requesting on every visit.
        source: "/imgs/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
