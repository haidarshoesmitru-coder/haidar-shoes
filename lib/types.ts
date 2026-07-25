export type Category =
  | "winter"
  | "men"
  | "ladies"
  | "kids"
  | "sandals";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Product {
  id: string;
  slug: string;
  name: string;
  article: string;
  brand: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  stockStatus: StockStatus;
  sizes: string[];
  colors: string[];
  description: string;
  details: string[];
  images: string[];
  tags?: Array<"new" | "bestseller" | "winter">;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}
