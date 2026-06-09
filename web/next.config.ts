import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Fotos de produtos hospedadas no Supabase Storage
      { protocol: "https", hostname: "*.supabase.co" },
      // Imagens de demonstração (charcutaria) usadas no seed
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
