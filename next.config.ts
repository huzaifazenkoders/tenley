import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos"
      },
      {
        protocol: "https",
        hostname: "flagcdn.com"
      },
      {
        protocol: "https",
        hostname: "example.com"
      }
    ]
  }
};

export default nextConfig;
