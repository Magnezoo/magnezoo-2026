import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "magnezoo.unipro-n.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
