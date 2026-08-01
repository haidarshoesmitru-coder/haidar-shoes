import type { Category, Product } from "@/lib/supabase/types";

export default function ProductForm({
  categories,
  product,
  action,
  error,
}: {
  categories: Category[];
  product?: Product;
  action: (formData: FormData) => void;
  error?: string;
}) {
  return (
    <form action={action} className="space-y-8">
      {error && (
        <p className="text-sm text-clay bg-clay/10 border border-clay/30 px-3 py-2">{error}</p>
      )}

      {/* Identity */}
      <section className="bg-paper border border-line p-6">
        <h2 className="text-eyebrow mb-4">Product Identity</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Product Name" required>
            <input name="name" defaultValue={product?.name} required className="input" />
          </Field>
          <Field label="Article Number (unique)" required>
            <input name="article_number" defaultValue={product?.article_number} required className="input" />
          </Field>
          <Field label="SKU">
            <input name="sku" defaultValue={product?.sku ?? ""} className="input" />
          </Field>
          <Field label="Category">
            <select name="category_id" defaultValue={product?.category_id ?? ""} className="input">
              <option value="">— Select category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Brand">
            <input name="brand" defaultValue={product?.brand ?? "Haidar Shoes"} className="input" />
          </Field>
          <Field label="Gender">
            <select name="gender" defaultValue={product?.gender ?? ""} className="input">
              <option value="">— Select —</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="unisex">Unisex</option>
            </select>
          </Field>
          <Field label="Season">
            <select name="season" defaultValue={product?.season ?? ""} className="input">
              <option value="">— Select —</option>
              <option value="all-season">All Season</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
            </select>
          </Field>
        </div>
      </section>

      {/* Pricing & Stock */}
      <section className="bg-paper border border-line p-6">
        <h2 className="text-eyebrow mb-4">Pricing &amp; Stock</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Price (Rs.)" required>
            <input name="price" type="number" min="0" step="0.01" defaultValue={product?.price} required className="input" />
          </Field>
          <Field label="Sale Price (Rs.)">
            <input name="sale_price" type="number" min="0" step="0.01" defaultValue={product?.sale_price ?? ""} className="input" />
          </Field>
          <Field label="Cost Price (Rs.) — admin only">
            <input name="cost_price" type="number" min="0" step="0.01" defaultValue={product?.cost_price ?? ""} className="input" />
          </Field>
          <Field label="Stock Quantity" required>
            <input name="stock_quantity" type="number" min="0" defaultValue={product?.stock_quantity ?? 0} required className="input" />
          </Field>
          <Field label="Low Stock Alert Threshold">
            <input name="low_stock_threshold" type="number" min="0" defaultValue={product?.low_stock_threshold ?? 5} className="input" />
          </Field>
        </div>
      </section>

      {/* Variants */}
      <section className="bg-paper border border-line p-6">
        <h2 className="text-eyebrow mb-4">Sizes, Colors &amp; Material</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Sizes (comma-separated)" hint="e.g. 40, 41, 42, 43">
            <input name="sizes" defaultValue={product?.sizes?.join(", ")} className="input" />
          </Field>
          <Field label="Colors (comma-separated)" hint="e.g. Black, Brown">
            <input name="colors" defaultValue={product?.colors?.join(", ")} className="input" />
          </Field>
          <Field label="Material">
            <input name="material" defaultValue={product?.material ?? ""} className="input" />
          </Field>
        </div>
      </section>

      {/* Descriptions */}
      <section className="bg-paper border border-line p-6">
        <h2 className="text-eyebrow mb-4">Description</h2>
        <div className="space-y-4">
          <Field label="Short Description" hint="Shown on product cards and listings">
            <textarea name="short_description" defaultValue={product?.short_description ?? ""} rows={2} className="input" />
          </Field>
          <Field label="Full Description" hint="Shown on the product detail page">
            <textarea name="full_description" defaultValue={product?.full_description ?? ""} rows={5} className="input" />
          </Field>
        </div>
      </section>

      {/* Flags */}
      <section className="bg-paper border border-line p-6">
        <h2 className="text-eyebrow mb-4">Visibility &amp; Flags</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Checkbox name="is_active" label="Active (visible on storefront)" defaultChecked={product?.is_active ?? true} />
          <Checkbox name="is_featured" label="Featured Product" defaultChecked={product?.is_featured ?? false} />
          <Checkbox name="is_new_arrival" label="New Arrival" defaultChecked={product?.is_new_arrival ?? false} />
          <Checkbox name="is_best_seller" label="Best Seller" defaultChecked={product?.is_best_seller ?? false} />
        </div>
      </section>

      <button type="submit" className="btn-primary !text-white text-eyebrow px-8 py-3.5">
        {product ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-graphite mb-1.5">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-stone mt-1">{hint}</span>}
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-ink border border-line px-3 py-2.5">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}
