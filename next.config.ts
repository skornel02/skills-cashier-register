import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  compiler: {
    removeConsole: false,
  }
};

export default nextConfig;