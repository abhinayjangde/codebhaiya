import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "codebhaiya.s3.ap-south-1.amazonaws.com",
        protocol: "https",
      },
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname: "drive.google.com",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;