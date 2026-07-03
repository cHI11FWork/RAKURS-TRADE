"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Layers,
  Building2,
  Settings,
  Inbox,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Огляд", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Головний банер", icon: Zap },
  { href: "/admin/directions", label: "Напрями", icon: Layers },
  { href: "/admin/about", label: "Про компанію", icon: Building2 },
  { href: "/admin/settings", label: "Контакти та соцмережі", icon: Settings },
  { href: "/admin/leads", label: "Заявки", icon: Inbox },
];

export function Sidebar({ unreadCount, email }: { unreadCount: number; email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-ink-border bg-ink-soft lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="px-5 py-6">
        <p className="font-heading text-sm font-extrabold tracking-wide text-white">
          RAKURS <span className="text-brand">TRADE</span>
        </p>
        <p className="mt-0.5 text-xs text-white/40">Адмін-панель</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-brand/15 text-brand" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {item.href === "/admin/leads" && unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-ink">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-ink-border px-3 py-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Переглянути сайт
        </a>
        <p className="truncate px-3 text-xs text-white/30">{email}</p>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Вийти
          </button>
        </form>
      </div>
    </aside>
  );
}
