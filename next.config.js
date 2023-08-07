/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: [
      "cdn.discordapp.com",
      "media.discordapp.net",
      "firebasestorage.googleapis.com",
      "ui-avatars.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
