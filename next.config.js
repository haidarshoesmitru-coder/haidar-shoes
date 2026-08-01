/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // images.unsplash.com hosts all footwear photography used across the
    // site (hero, collections, products, About page) until real product
    // photography is uploaded via the admin panel. Once real photos exist,
    // they'll be served from Supabase Storage (the wildcard pattern below
    // matches any Supabase project, since the exact project ref isn't known
    // until the store owner creates their Supabase project) — see README
    // "Before Going Live".
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  experimental: {
    // Product photos (phone camera shots) routinely exceed the 1MB default —
    // raised so the admin image uploader (a Server Action) can accept them.
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
