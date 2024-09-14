/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "export",
  images: {
    unoptimized: true,
    // loader:'cloudinary',
    // path: './src/common/components/Loader/index.js'
  },
};

module.exports = nextConfig;
