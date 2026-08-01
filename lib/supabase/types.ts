export type Gender = "men" | "women" | "kids" | "unisex";
export type Season = "all-season" | "summer" | "winter";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  article_number: string;
  sku: string | null;
  category_id: string | null;
  brand: string;
  gender: Gender | null;
  season: Season | null;
  price: number;
  sale_price: number | null;
  cost_price: number | null;
  stock_quantity: number;
  low_stock_threshold: number;
  sizes: string[];
  colors: string[];
  material: string | null;
  short_description: string | null;
  full_description: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  storage_path: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface StoreSettings {
  id: number;
  store_name: string;
  whatsapp_number: string;
  phone_display: string;
  address: string | null;
  maps_url: string | null;
  business_hours: { day: string; time: string }[];
  social_links: { instagram?: string; facebook?: string; tiktok?: string };
  updated_at: string;
}

export interface AdminProfile {
  id: string;
  full_name: string | null;
  role: "admin" | "owner";
  created_at: string;
}

/** Product joined with its images — the shape most queries actually return. */
export interface ProductWithImages extends Product {
  category?: Category | null;
  images: ProductImage[];
}

// Minimal Supabase `Database` generic — enough for typed `.from("table")`
// calls without needing the full generated type (which requires introspecting
// a live project via the Supabase CLI).
export interface Database {
  public: {
    Tables: {
      admin_profiles: { Row: AdminProfile; Insert: Partial<AdminProfile>; Update: Partial<AdminProfile> };
      categories: { Row: Category; Insert: Partial<Category>; Update: Partial<Category> };
      products: { Row: Product; Insert: Partial<Product>; Update: Partial<Product> };
      product_images: { Row: ProductImage; Insert: Partial<ProductImage>; Update: Partial<ProductImage> };
      store_settings: { Row: StoreSettings; Insert: Partial<StoreSettings>; Update: Partial<StoreSettings> };
    };
  };
}
