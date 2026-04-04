import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // Use 'export' for GitHub Pages, 'standalone' for Vercel
  output: isGitHubPages ? 'export' : 'standalone',
  
  // Base path for GitHub Pages (repo name)
  basePath: basePath,
  
  // Image optimization settings
  images: {
    unoptimized: isGitHubPages, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // TypeScript settings
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // React settings
  reactStrictMode: false,
  
  // Trailing slashes for static hosting
  trailingSlash: isGitHubPages,
};

export default nextConfig;
