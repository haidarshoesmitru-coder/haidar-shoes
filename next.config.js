/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // picsum.photos is used for placeholder product photography only.
    // Add the real CDN/storage domain here (and remove this one) once
    // production photography is in place — see README "Before Going Live".
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

module.exports = nextConfig;
