import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mobueekjsvaqefzuhdsu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  allowedDevOrigins: ["192.168.1.95", "http://192.168.1.95:3000"],
};

export default nextConfig;
