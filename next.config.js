/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // images.unsplash.com hosts all footwear photography used across the
    // site (hero, collections, products, About page). Add the real
    // CDN/storage domain here (and remove this one) once production
    // photography is in place — see README "Before Going Live".
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
