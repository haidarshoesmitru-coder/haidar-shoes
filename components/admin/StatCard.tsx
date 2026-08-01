import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent = false,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  accent?: boolean;
}) {
  const content = (
    <div className="bg-paper border border-line p-6 h-full transition-shadow duration-200 hover:shadow-card">
      <div className="flex items-center justify-between mb-3">
        <Icon size={20} className={accent ? "text-clay" : "text-ink"} aria-hidden="true" />
      </div>
      <p className={`text-3xl font-display font-bold ${accent ? "text-clay" : "text-ink"}`}>{value}</p>
      <p className="text-sm text-graphite mt-1">{label}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
