import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products/publisher-widgets',
        permanent: false, // temporary redirect
      },
    ]
  }
};



export default nextConfig;