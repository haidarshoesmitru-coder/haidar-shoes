/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // picsum.photos is used for placeholder product photography only.
    // images.unsplash.com hosts the real footwear photography used on the
    // Collections page. Add the real CDN/storage domain here (and remove
    // both) once production photography is in place — see README
    // "Before Going Live".
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
