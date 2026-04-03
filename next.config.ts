import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" for Vercel deployment (supports API routes)
  // Switch to "export" for GitHub Pages static deployment (API routes disabled)
  output: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "export" : "standalone",

  // GitHub Pages base path (auto-set via environment in CI)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Disable image optimization for static export compatibility
  images: {
    unoptimized: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true",
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
