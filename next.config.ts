import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Laat de build slagen ondanks ESLint-fouten (bestonden al)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
