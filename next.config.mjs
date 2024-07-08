/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.angara.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
