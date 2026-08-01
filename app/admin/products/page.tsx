import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { getProductsForAdmin, getCategoriesForAdmin } from "@/lib/supabase/queries";
import StockBadge from "@/components/StockBadge";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ActiveToggle from "@/components/admin/ActiveToggle";

export const dynamic = "force-dynamic";

interface SearchParams {
  search?: string;
  category?: string;
  stock?: "all" | "in-stock" | "low-stock" | "out-of-stock";
  featured?: string;
  bestSeller?: string;
  active?: "all" | "active" | "inactive";
}

function stockStatusOf(stockQuantity: number, lowStockThreshold: number) {
  if (stockQuantity === 0) return "out-of-stock" as const;
  if (stockQuantity <= lowStockThreshold) return "low-stock" as const;
  return "in-stock" as const;
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [products, categories] = await Promise.all([
    getProductsForAdmin({
      search: searchParams.search,
      categoryId: searchParams.category,
      stock: searchParams.stock ?? "all",
      featured: searchParams.featured === "1",
      bestSeller: searchParams.bestSeller === "1",
      active: searchParams.active ?? "all",
    }),
    getCategoriesForAdmin(),
  ]);

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display font-bold text-2xl text-ink">Products</h1>
        <Link
          href="/admin/products/new"
          className="btn-primary !text-white text-eyebrow px-5 py-2.5 flex items-center gap-2"
        >
          <Plus size={16} aria-hidden="true" /> Add Product
        </Link>
      </div>
      <p className="text-sm text-graphite mb-6">{products.length} product(s)</p>

      {/* Search & Filters */}
      <form className="bg-paper border border-line p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-graphite mb-1.5">Search</label>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" aria-hidden="true" />
            <input
              type="text"
              name="search"
              defaultValue={searchParams.search}
              placeholder="Name or article number…"
              className="w-full border border-line pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-ink"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-graphite mb-1.5">Category</label>
          <select name="category" defaultValue={searchParams.category ?? ""} className="border border-line px-3 py-2 text-sm focus:outline-none focus:border-ink">
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-graphite mb-1.5">Stock</label>
          <select name="stock" defaultValue={searchParams.stock ?? "all"} className="border border-line px-3 py-2 text-sm focus:outline-none focus:border-ink">
            <option value="all">All</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-graphite mb-1.5">Status</label>
          <select name="active" defaultValue={searchParams.active ?? "all"} className="border border-line px-3 py-2 text-sm focus:outline-none focus:border-ink">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-graphite pb-2">
          <input type="checkbox" name="featured" value="1" defaultChecked={searchParams.featured === "1"} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-graphite pb-2">
          <input type="checkbox" name="bestSeller" value="1" defaultChecked={searchParams.bestSeller === "1"} />
          Best Seller
        </label>

        <button type="submit" className="btn-secondary text-eyebrow px-5 py-2">
          Apply
        </button>
        {(searchParams.search || searchParams.category || searchParams.stock || searchParams.featured || searchParams.bestSeller || searchParams.active) && (
          <Link href="/admin/products" className="text-sm text-graphite hover:text-ink underline">
            Clear
          </Link>
        )}
      </form>

      <div className="bg-paper border border-line overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-stone uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Article No.</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Flags</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-graphite">
                  No products match these filters.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${p.id}/edit`} className="text-ink hover:text-clay transition-colors font-medium">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-graphite">{p.article_number}</td>
                  <td className="px-4 py-3 text-graphite">{(p as { category?: { name: string } }).category?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-graphite">Rs. {p.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StockBadge status={stockStatusOf(p.stock_quantity, p.low_stock_threshold)} />
                  </td>
                  <td className="px-4 py-3 text-xs text-stone space-x-1">
                    {p.is_featured && <span className="bg-canvas px-1.5 py-0.5">Featured</span>}
                    {p.is_new_arrival && <span className="bg-canvas px-1.5 py-0.5">New</span>}
                    {p.is_best_seller && <span className="bg-canvas px-1.5 py-0.5">Best Seller</span>}
                  </td>
                  <td className="px-4 py-3">
                    <ActiveToggle productId={p.id} isActive={p.is_active} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/products/${p.id}/edit`} className="text-sm text-graphite hover:text-ink underline">
                        Edit
                      </Link>
                      <DeleteProductButton productId={p.id} productName={p.name} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
