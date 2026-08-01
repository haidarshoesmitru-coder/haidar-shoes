import Link from "next/link";
import { Package, CheckCircle2, AlertTriangle, Star, FolderTree } from "lucide-react";
import { getDashboardStats } from "@/lib/supabase/queries";
import StatCard from "@/components/admin/StatCard";
import StockBadge from "@/components/StockBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Dashboard</h1>
      <p className="text-sm text-graphite mb-8">An overview of your store.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Total Products" value={stats.totalProducts} icon={Package} href="/admin/products" />
        <StatCard label="Active Products" value={stats.activeProducts} icon={CheckCircle2} href="/admin/products?active=active" />
        <StatCard label="Low Stock" value={stats.lowStockProducts} icon={AlertTriangle} href="/admin/products?stock=low-stock" accent={stats.lowStockProducts > 0} />
        <StatCard label="Featured Products" value={stats.featuredProducts} icon={Star} href="/admin/products?featured=1" />
        <StatCard label="Categories" value={stats.totalCategories} icon={FolderTree} href="/admin/categories" />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-ink">Recent Products</h2>
          <Link href="/admin/products" className="text-sm text-graphite hover:text-ink transition-colors">
            View all →
          </Link>
        </div>

        <div className="bg-paper border border-line overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-stone uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Article No.</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-graphite">
                    No products yet.{" "}
                    <Link href="/admin/products/new" className="text-ink underline">
                      Add your first product
                    </Link>
                  </td>
                </tr>
              ) : (
                stats.recentProducts.map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-3">
                      <Link href={`/admin/products/${p.id}/edit`} className="text-ink hover:text-clay transition-colors font-medium">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-graphite">{p.article_number}</td>
                    <td className="px-4 py-3 text-graphite">Rs. {p.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-graphite">{p.stock_quantity}</td>
                    <td className="px-4 py-3">
                      <StockBadge
                        status={
                          p.stock_quantity === 0
                            ? "out-of-stock"
                            : p.stock_quantity <= p.low_stock_threshold
                            ? "low-stock"
                            : "in-stock"
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
