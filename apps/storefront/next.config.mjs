/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@jereme/shared", "@jereme/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;
