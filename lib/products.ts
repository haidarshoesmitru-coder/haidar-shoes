import { Product, Review } from "./types";

const img = (seed: string, n: number) =>
  Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/${seed}-${i}/900/1100`);

export const products: Product[] = [
  {
    id: "1",
    slug: "oxford-noir-formal",
    name: "Oxford Noir Formal",
    article: "HS-OX-101",
    category: "men",
    price: 6499,
    compareAtPrice: 7999,
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
    images: img("oxford-noir", 3),
    tags: ["bestseller"],
  },
  {
    id: "2",
    slug: "highland-suede-chelsea",
    name: "Highland Suede Chelsea",
    article: "HS-CH-204",
    category: "winter",
    price: 7299,
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Camel", "Charcoal"],
    description:
      "Premium suede Chelsea boot with fleece-lined interior, designed to keep you warm through winter without giving up on style.",
    details: [
      "Water-resistant suede exterior",
      "Fleece thermal lining",
      "Elastic side gores for easy wear",
      "Reinforced heel counter",
    ],
    images: img("highland-chelsea", 3),
    tags: ["winter", "new"],
  },
  {
    id: "3",
    slug: "everest-trek-boot",
    name: "Everest Trek Boot",
    article: "HS-TB-310",
    category: "winter",
    price: 8999,
    compareAtPrice: 10499,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Olive", "Black"],
    description:
      "A rugged winter trekking boot with a lugged outsole and insulated lining — built for the coldest days without sacrificing comfort.",
    details: [
      "Insulated waterproof shell",
      "High-grip lugged outsole",
      "Padded ankle collar",
      "Reinforced toe cap",
    ],
    images: img("everest-trek", 3),
    tags: ["winter", "bestseller"],
  },
  {
    id: "4",
    slug: "monarch-loafer",
    name: "Monarch Leather Loafer",
    article: "HS-LF-118",
    category: "men",
    price: 5799,
    sizes: ["40", "41", "42", "43"],
    colors: ["Tan", "Black"],
    description:
      "A refined slip-on loafer in supple leather — the easy choice for smart-casual days that still demand polish.",
    details: [
      "Soft nappa leather upper",
      "Lightweight EVA sole",
      "Breathable leather lining",
      "Signature gold-tone buckle",
    ],
    images: img("monarch-loafer", 3),
    tags: ["new"],
  },
  {
    id: "5",
    slug: "aurora-heeled-pump",
    name: "Aurora Heeled Pump",
    article: "HS-LD-221",
    category: "ladies",
    price: 5299,
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Nude", "Black", "Maroon"],
    description:
      "An elegant pointed-toe pump with a 3-inch heel, finished in soft matte leather for evenings that call for a little more shine.",
    details: [
      "Matte leather finish",
      "Cushioned footbed",
      "Sturdy 3-inch block heel",
      "Padded ankle strap",
    ],
    images: img("aurora-pump", 3),
    tags: ["bestseller"],
  },
  {
    id: "6",
    slug: "velvet-rose-flat",
    name: "Velvet Rose Flat",
    article: "HS-LD-133",
    category: "ladies",
    price: 3899,
    sizes: ["36", "37", "38", "39"],
    colors: ["Rose Gold", "Ivory", "Black"],
    description:
      "A dainty velvet flat with a soft round toe, perfect for everyday elegance from morning errands to evening dinners.",
    details: [
      "Plush velvet upper",
      "Memory-foam cushioning",
      "Flexible non-slip sole",
      "Delicate gold trim",
    ],
    images: img("velvet-rose", 3),
    tags: ["new"],
  },
  {
    id: "7",
    slug: "winter-fur-boot-ladies",
    name: "Snowline Fur Boot",
    article: "HS-LD-256",
    category: "winter",
    price: 6899,
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Grey", "Beige"],
    description:
      "A cosy fur-lined boot for ladies, made to handle Punjab's coldest evenings while keeping every outfit polished.",
    details: [
      "Faux-fur thermal lining",
      "Water-resistant suede shell",
      "Anti-slip winter sole",
      "Side zip closure",
    ],
    images: img("snowline-fur", 3),
    tags: ["winter"],
  },
  {
    id: "8",
    slug: "junior-explorer-sneaker",
    name: "Junior Explorer Sneaker",
    article: "HS-KD-410",
    category: "kids",
    price: 2899,
    sizes: ["28", "29", "30", "31", "32", "33"],
    colors: ["Blue/White", "Red/Black"],
    description:
      "Lightweight, durable and easy to fasten — built for kids who don't sit still, with a velcro strap for quick on-off.",
    details: [
      "Breathable mesh panels",
      "Velcro quick-strap closure",
      "Shock-absorbing sole",
      "Reinforced toe bumper",
    ],
    images: img("junior-explorer", 3),
    tags: ["bestseller"],
  },
  {
    id: "9",
    slug: "little-star-mary-jane",
    name: "Little Star Mary Jane",
    article: "HS-KD-315",
    category: "kids",
    price: 2599,
    sizes: ["26", "27", "28", "29", "30"],
    colors: ["Pink", "White"],
    description:
      "A sweet, comfortable Mary Jane for little ones, with a soft buckle strap and cushioned sole for first steps and school days alike.",
    details: [
      "Soft synthetic leather upper",
      "Adjustable buckle strap",
      "Cushioned comfort insole",
      "Non-marking outsole",
    ],
    images: img("little-star", 3),
    tags: ["new"],
  },
  {
    id: "10",
    slug: "riviera-leather-sandal",
    name: "Riviera Leather Sandal",
    article: "HS-SD-509",
    category: "sandals",
    price: 3299,
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
    images: img("riviera-sandal", 3),
    tags: ["bestseller"],
  },
  {
    id: "11",
    slug: "coastal-slide-slipper",
    name: "Coastal Slide Slipper",
    article: "HS-SD-611",
    category: "sandals",
    price: 1999,
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["Black", "Navy", "Grey"],
    description:
      "An everyday slide built for comfort at home or on quick errands, with a soft footbed that moulds to your step.",
    details: [
      "Soft EVA footbed",
      "Lightweight water-friendly build",
      "Textured anti-slip base",
      "Wide comfort strap",
    ],
    images: img("coastal-slide", 3),
    tags: [],
  },
  {
    id: "12",
    slug: "regent-derby-formal",
    name: "Regent Derby Formal",
    article: "HS-OX-142",
    category: "men",
    price: 6199,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Chestnut"],
    description:
      "A classic Derby silhouette in polished leather — the everyday formal shoe that carries you from office to occasion.",
    details: [
      "Polished genuine leather",
      "Open lacing for a relaxed fit",
      "Leather-lined interior",
      "Slip-resistant leather sole",
    ],
    images: img("regent-derby", 3),
    tags: [],
  },
  {
    id: "13",
    slug: "frostpeak-insulated-boot",
    name: "Frostpeak Insulated Boot",
    article: "HS-TB-330",
    category: "winter",
    price: 9499,
    compareAtPrice: 10999,
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Black", "Grey/Orange"],
    description:
      "Our warmest boot yet — built with a thick insulated lining and grip-heavy sole for winter terrain and icy mornings.",
    details: [
      "Thermal-insulated lining",
      "Deep-lug winter outsole",
      "Padded collar and tongue",
      "Reinforced water-resistant shell",
    ],
    images: img("frostpeak-boot", 3),
    tags: ["winter", "new"],
  },
  {
    id: "14",
    slug: "pearl-strap-sandal",
    name: "Pearl Strap Sandal",
    article: "HS-LD-347",
    category: "ladies",
    price: 4199,
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Ivory", "Gold"],
    description:
      "A delicate strappy sandal finished with pearl detailing, made for weddings, mehndis, and celebration nights.",
    details: [
      "Hand-applied pearl trim",
      "Cushioned satin-lined footbed",
      "Secure ankle buckle",
      "Elegant kitten heel",
    ],
    images: img("pearl-strap", 3),
    tags: ["new", "bestseller"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ahmed Raza",
    location: "Multan",
    rating: 5,
    text: "The Oxford Noir I bought for my brother's wedding was worth every rupee — comfortable the whole night and the leather looks even better a year on.",
  },
  {
    id: "r2",
    name: "Sana Fatima",
    location: "Mitro",
    rating: 5,
    text: "Bought the Aurora pumps and a pair of school shoes for my daughter in the same visit. Genuinely honest quality, not what I expected from a local store.",
  },
  {
    id: "r3",
    name: "Bilal Hussain",
    location: "Vehari",
    rating: 4,
    text: "Ordered the Frostpeak boots on WhatsApp and they were delivered within two days, well packed. Warm and sturdy for the winter fields.",
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
    description: "Formal Oxfords, Derbies and loafers crafted from genuine leather.",
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
