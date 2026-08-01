-- ============================================================================
-- Haidar Shoes — Supabase schema (v1.3.0)
--
-- Run this entire file once in the Supabase SQL Editor for a new project.
-- It is written to be safe to re-run (uses IF NOT EXISTS / OR REPLACE where
-- possible), but review before running against a database that already has
-- data.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- Helper: shared updated_at trigger
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ----------------------------------------------------------------------------
-- admin_profiles
--
-- Every row here is a user allowed into /admin. There is deliberately no
-- public sign-up flow for this table — an admin is created by:
--   1. Adding the user in Supabase Dashboard → Authentication → Users
--   2. Running: insert into admin_profiles (id, full_name) values ('<uid>', 'Name');
-- ----------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'owner')),
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

drop policy if exists "Admins can read their own profile" on public.admin_profiles;
create policy "Admins can read their own profile"
  on public.admin_profiles for select
  using (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- categories
-- ----------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_display_order_idx on public.categories (display_order);

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

alter table public.categories enable row level security;

drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories"
  on public.categories for select
  using (is_active = true);

drop policy if exists "Admins can read all categories" on public.categories;
create policy "Admins can read all categories"
  on public.categories for select
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can insert categories" on public.categories;
create policy "Admins can insert categories"
  on public.categories for insert
  with check (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can update categories" on public.categories;
create policy "Admins can update categories"
  on public.categories for update
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can delete categories" on public.categories;
create policy "Admins can delete categories"
  on public.categories for delete
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

-- ----------------------------------------------------------------------------
-- products
-- ----------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  article_number text not null unique,
  sku text,
  category_id uuid references public.categories(id) on delete set null,
  brand text not null default 'Haidar Shoes',
  gender text check (gender in ('men', 'women', 'kids', 'unisex')),
  season text check (season in ('all-season', 'summer', 'winter')),
  price numeric(10, 2) not null check (price >= 0),
  sale_price numeric(10, 2) check (sale_price is null or sale_price >= 0),
  cost_price numeric(10, 2) check (cost_price is null or cost_price >= 0),
  stock_quantity int not null default 0 check (stock_quantity >= 0),
  low_stock_threshold int not null default 5,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  material text,
  short_description text,
  full_description text,
  is_featured boolean not null default false,
  is_new_arrival boolean not null default false,
  is_best_seller boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);
create index if not exists products_active_idx on public.products (is_active);
create index if not exists products_article_number_idx on public.products (article_number);
create index if not exists products_name_idx on public.products using gin (to_tsvector('english', name));

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products for select
  using (is_active = true);

drop policy if exists "Admins can read all products" on public.products;
create policy "Admins can read all products"
  on public.products for select
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
  on public.products for insert
  with check (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products for update
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
  on public.products for delete
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

-- ----------------------------------------------------------------------------
-- product_images
-- ----------------------------------------------------------------------------
create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  storage_path text not null,
  display_order int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_idx on public.product_images (product_id, display_order);

-- Only one featured image per product.
create unique index if not exists product_images_one_featured_idx
  on public.product_images (product_id)
  where (is_featured = true);

alter table public.product_images enable row level security;

drop policy if exists "Public can read images of active products" on public.product_images;
create policy "Public can read images of active products"
  on public.product_images for select
  using (
    exists (
      select 1 from public.products
      where products.id = product_images.product_id
        and products.is_active = true
    )
  );

drop policy if exists "Admins can read all product images" on public.product_images;
create policy "Admins can read all product images"
  on public.product_images for select
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can insert product images" on public.product_images;
create policy "Admins can insert product images"
  on public.product_images for insert
  with check (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can update product images" on public.product_images;
create policy "Admins can update product images"
  on public.product_images for update
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

drop policy if exists "Admins can delete product images" on public.product_images;
create policy "Admins can delete product images"
  on public.product_images for delete
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

-- ----------------------------------------------------------------------------
-- store_settings — single-row table (id is always 1)
-- ----------------------------------------------------------------------------
create table if not exists public.store_settings (
  id int primary key default 1,
  store_name text not null default 'Haidar Shoes',
  whatsapp_number text not null default '923142965191',
  phone_display text not null default '+92 314 2965191',
  address text,
  maps_url text,
  business_hours jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint store_settings_singleton check (id = 1)
);

insert into public.store_settings (id) values (1)
  on conflict (id) do nothing;

drop trigger if exists set_store_settings_updated_at on public.store_settings;
create trigger set_store_settings_updated_at
  before update on public.store_settings
  for each row execute function public.set_updated_at();

alter table public.store_settings enable row level security;

drop policy if exists "Public can read store settings" on public.store_settings;
create policy "Public can read store settings"
  on public.store_settings for select
  using (true);

drop policy if exists "Admins can update store settings" on public.store_settings;
create policy "Admins can update store settings"
  on public.store_settings for update
  using (exists (select 1 from public.admin_profiles where id = auth.uid()));

-- ============================================================================
-- Storage buckets
-- ============================================================================
insert into storage.buckets (id, name, public)
  values ('product-images', 'product-images', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('category-images', 'category-images', true)
  on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );

drop policy if exists "Public can view category images" on storage.objects;
create policy "Public can view category images"
  on storage.objects for select
  using (bucket_id = 'category-images');

drop policy if exists "Admins can upload category images" on storage.objects;
create policy "Admins can upload category images"
  on storage.objects for insert
  with check (
    bucket_id = 'category-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );

drop policy if exists "Admins can delete category images" on storage.objects;
create policy "Admins can delete category images"
  on storage.objects for delete
  using (
    bucket_id = 'category-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );

-- ============================================================================
-- Seed categories matching the current storefront (safe to skip/edit)
-- ============================================================================
insert into public.categories (name, slug, description, display_order) values
  ('Winter Collection', 'winter', 'Insulated boots and fleece-lined footwear built for the coldest months.', 1),
  ('Men''s Collection', 'men', 'Formal Oxfords, loafers and everyday sneakers crafted from genuine leather.', 2),
  ('Ladies Collection', 'ladies', 'Pumps, flats and sandals designed for everyday elegance.', 3),
  ('Kids Collection', 'kids', 'Durable, comfortable footwear built for little feet on the move.', 4),
  ('Sandals & Slippers', 'sandals', 'Open, breathable comfort for warm days and easy evenings.', 5)
on conflict (slug) do nothing;
