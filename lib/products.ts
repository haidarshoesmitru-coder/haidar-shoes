import { Product, Review } from "./types";

/**
 * Product photography — real footwear images sourced from Unsplash
 * (Unsplash License: free for commercial use, no attribution required).
 * A shared query string keeps crop/quality/format consistent across every
 * photo so the catalog reads as one coherent shoot rather than a stock-photo
 * grab bag. See lib/collection-images.ts for the matching category banners.
 *
 * Where a product only has one sourced photo, the same image is used twice
 * as a placeholder for a second angle — flagged here so it's easy to find
 * and swap once real product photography is available.
 */
const q = "auto=format&fit=crop&q=80";

const img = {
  oxford: `https://images.unsplash.com/photo-1472591651607-70e2d88ae3c4?${q}&w=900&h=1100`,
  loafer: `https://images.unsplash.com/photo-1616406432452-07bc5938759d?${q}&w=900&h=1100`,
  sneakerA: `https://images.unsplash.com/photo-1544441892-794166f1e3be?${q}&w=900&h=1100`,
  sneakerB: `https://images.unsplash.com/photo-1698919585873-8c6852de9b96?${q}&w=900&h=1100`,
  winterBoot: `https://images.unsplash.com/photo-1616244916660-d135a013d1f8?${q}&w=900&h=1100`,
  sandal: `https://images.unsplash.com/photo-1594520770886-6910adf052c6?${q}&w=900&h=1100`,
  kidsShoe: `https://images.unsplash.com/photo-1637230870581-b70067e5ecd0?${q}&w=900&h=1100`,
  ladiesHeel: `https://images.unsplash.com/photo-1670938258821-2956d4ce9c9b?${q}&w=900&h=1100`,
};

const BRAND = "Haidar Shoes";

export const products: Product[] = [
  {
    id: "1",
    slug: "classic-oxford",
    name: "Classic Oxford",
    article: "HS-101",
    brand: BRAND,
    category: "men",
    price: 6499,
    compareAtPrice: 7999,
    stockStatus: "in-stock",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Black", "Dark Brown"],
    description:
      "A hand-finished formal Oxford crafted from full-grain leather with a cushioned insole for all-day comfort. Built for boardrooms, weddings, and everything in between.",
    details: [
      "Genuine full-grain leather upper",
      "Cushioned memory-foam insole",
      "Durable non-slip rubber sole",
      "Hand-stitched detailing",
    ],
    images: [img.oxford, img.oxford],
    tags: ["bestseller"],
  },
  {
    id: "2",
    slug: "urban-runner",
    name: "Urban Runner",
    article: "HS-102",
    brand: BRAND,
    category: "men",
    price: 5299,
    stockStatus: "in-stock",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["White", "Black"],
    description:
      "A lightweight everyday sneaker built for long days on your feet — breathable upper, cushioned sole, and a clean silhouette that pairs with anything.",
    details: [
      "Breathable knit and canvas upper",
      "Shock-absorbing EVA midsole",
      "Reinforced heel counter",
      "High-grip rubber outsole",
    ],
    images: [img.sneakerA, img.sneakerB],
    tags: ["new"],
  },
  {
    id: "3",
    slug: "leather-loafer",
    name: "Leather Loafer",
    article: "HS-103",
    brand: BRAND,
    category: "men",
    price: 5799,
    stockStatus: "low-stock",
    sizes: ["40", "41", "42", "43"],
    colors: ["Tan", "Black"],
    description:
      "A refined slip-on loafer in supple leather — the easy choice for smart-casual days that still demand polish.",
    details: [
      "Soft nappa leather upper",
      "Lightweight EVA sole",
      "Breathable leather lining",
      "Signature stitched apron",
    ],
    images: [img.loafer, img.loafer],
    tags: ["new"],
  },
  {
    id: "4",
    slug: "everest-winter-boot",
    name: "Everest Winter Boot",
    article: "HS-104",
    brand: BRAND,
    category: "winter",
    price: 8999,
    compareAtPrice: 10499,
    stockStatus: "in-stock",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Brown", "Black"],
    description:
      "A rugged winter boot with a lugged outsole and insulated lining — built for the coldest days without sacrificing comfort.",
    details: [
      "Insulated water-resistant leather shell",
      "High-grip lugged outsole",
      "Padded ankle collar",
      "Reinforced toe cap",
    ],
    images: [img.winterBoot, img.winterBoot],
    tags: ["winter", "bestseller"],
  },
  {
    id: "5",
    slug: "comfort-sandal",
    name: "Comfort Sandal",
    article: "HS-105",
    brand: BRAND,
    category: "sandals",
    price: 3299,
    stockStatus: "in-stock",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Tan", "Black"],
    description:
      "An open leather sandal for warm days, combining a minimal silhouette with genuine comfort for long hours on your feet.",
    details: [
      "Genuine leather straps",
      "Contoured comfort footbed",
      "Adjustable buckle fit",
      "Durable rubber outsole",
    ],
    images: [img.sandal, img.sandal],
    tags: ["bestseller"],
  },
  {
    id: "6",
    slug: "kids-runner",
    name: "Kids Runner",
    article: "HS-106",
    brand: BRAND,
    category: "kids",
    price: 2899,
    stockStatus: "in-stock",
    sizes: ["28", "29", "30", "31", "32", "33"],
    colors: ["Pink", "White"],
    description:
      "Lightweight, durable and easy to fasten — built for kids who don't sit still, with a secure strap for quick on-off.",
    details: [
      "Breathable mesh panels",
      "Quick-fasten strap closure",
      "Shock-absorbing sole",
      "Reinforced toe bumper",
    ],
    images: [img.kidsShoe, img.kidsShoe],
    tags: ["new"],
  },
  {
    id: "7",
    slug: "heritage-pump",
    name: "Heritage Pump",
    article: "HS-107",
    brand: BRAND,
    category: "ladies",
    price: 5299,
    stockStatus: "in-stock",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["White", "Nude", "Black"],
    description:
      "An elegant pointed-toe pump finished in soft leather for evenings that call for a little more shine.",
    details: [
      "Soft leather finish",
      "Cushioned footbed",
      "Sturdy block heel",
      "Padded ankle strap",
    ],
    images: [img.ladiesHeel, img.ladiesHeel],
    tags: ["bestseller"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ahmed Raza",
    location: "Multan",
    rating: 5,
    text: "The Classic Oxford I bought for my brother's wedding was worth every rupee — comfortable the whole night and the leather looks even better a year on.",
  },
  {
    id: "r2",
    name: "Sana Fatima",
    location: "Mitro",
    rating: 5,
    text: "Bought the Heritage Pump and a pair of school shoes for my daughter in the same visit. Genuinely honest quality, not what I expected from a local store.",
  },
  {
    id: "r3",
    name: "Bilal Hussain",
    location: "Vehari",
    rating: 4,
    text: "Ordered the Everest Winter Boot on WhatsApp and it was delivered within two days, well packed. Warm and sturdy for the winter fields.",
  },
  {
    id: "r4",
    name: "Mehwish Iqbal",
    location: "Mitro",
    rating: 5,
    text: "Haidar Shoes has become our family's go-to store. The staff actually help you find the right fit instead of just pushing whatever's in stock.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export const categoryMeta: Record<
  string,
  { title: string; description: string }
> = {
  winter: {
    title: "Winter Collection",
    description: "Insulated boots and fleece-lined footwear built for the coldest months.",
  },
  men: {
    title: "Men's Collection",
    description: "Formal Oxfords, loafers and everyday sneakers crafted from genuine leather.",
  },
  ladies: {
    title: "Ladies Collection",
    description: "Pumps, flats and sandals designed for everyday elegance.",
  },
  kids: {
    title: "Kids Collection",
    description: "Durable, comfortable footwear built for little feet on the move.",
  },
  sandals: {
    title: "Sandals & Slippers",
    description: "Open, breathable comfort for warm days and easy evenings.",
  },
};
