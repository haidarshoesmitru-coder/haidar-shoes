import { StockStatus } from "@/lib/types";

const config: Record<StockStatus, { label: string; dot: string; text: string }> = {
  "in-stock": { label: "In Stock", dot: "bg-ink", text: "text-graphite" },
  "low-stock": { label: "Low Stock — Order Soon", dot: "bg-clay", text: "text-clay" },
  "out-of-stock": { label: "Out of Stock", dot: "bg-stone", text: "text-stone" },
};

export default function StockBadge({ status }: { status: StockStatus }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
      {c.label}
    </span>
  );
}
