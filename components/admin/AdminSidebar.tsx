"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-60 md:min-h-screen bg-ink text-white flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <span className="font-display font-extrabold text-lg tracking-tight uppercase">
          Haidar <span className="text-clay">Shoes</span>
        </span>
        <p className="text-xs text-white/50 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((l) => {
          const Icon = l.icon;
          const active = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors duration-150 ${
                active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-150 w-full"
          >
            <LogOut size={18} aria-hidden="true" />
            Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}
