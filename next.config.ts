import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/truck/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
