/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    // fontLoaders: [
    //   {
    //     loader: "@next/font/google/",
    //     options: {
    //       weight: ["400", "700"],
    //       subsets: ["vietnamese"],
    //       style: ["normal"],
    //     },
    //   },
    // ],
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
