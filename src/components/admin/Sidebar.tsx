"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Layers,
  Building2,
  Settings,
  Inbox,
  ExternalLink,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/app/admin/actions";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/locale";
import { dictionaries } from "@/lib/i18n/dictionary";

export function Sidebar({
  unreadCount,
  email,
  locale,
}: {
  unreadCount: number;
  email: string;
  locale: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dict = dictionaries[locale];
  const [open, setOpen] = useState(false);

  const NAV = [
    { href: "/admin", label: dict.admin.sidebar.nav.overview, icon: LayoutDashboard, exact: true },
    { href: "/admin/hero", label: dict.admin.sidebar.nav.hero, icon: Zap },
    { href: "/admin/directions", label: dict.admin.sidebar.nav.directions, icon: Layers },
    { href: "/admin/about", label: dict.admin.sidebar.nav.about, icon: Building2 },
    { href: "/admin/settings", label: dict.admin.sidebar.nav.settings, icon: Settings },
    { href: "/admin/leads", label: dict.admin.sidebar.nav.leads, icon: Inbox },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function toggleLocale() {
    const next: Locale = locale === "uk" ? "en" : "uk";
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-ink-border bg-ink-soft lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="px-5 py-4 lg:py-6">
        <div className="flex items-center justify-between gap-2">
          <Image
            src="/images/logo-full-white.png"
            alt="RAKURS TRADE"
            width={1274}
            height={355}
            className="h-6 w-auto"
            unoptimized
          />
          <div className="flex items-center gap-3">
            <Link
              href="/admin/leads"
              className="admin-icon-btn relative flex h-7 w-7 items-center justify-center rounded-none text-white/60 hover:text-brand"
              aria-label={dict.admin.sidebar.nav.leads}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="badge-pulse absolute -right-0.5 -top-0.5 flex h-2 w-2 rounded-full bg-brand" />
              )}
            </Link>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 text-xs font-bold tracking-wide text-white/90"
              aria-label={dict.admin.common.langToggleAria}
            >
              <span className={locale === "uk" ? "text-brand" : "text-white/50"}>UA</span>
              <span className="text-white/30">|</span>
              <span className={locale === "en" ? "text-brand" : "text-white/50"}>EN</span>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="admin-icon-btn flex h-8 w-8 items-center justify-center text-white lg:hidden"
              aria-label={dict.admin.common.menuAriaLabel}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <p className="mt-0.5 text-xs text-white/40 lg:block">{dict.admin.sidebar.panelLabel}</p>
      </div>

      <div className={`${open ? "block" : "hidden"} lg:flex lg:flex-1 lg:flex-col`}>
        <nav className="flex-1 space-y-1 px-3 pb-2">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link group flex items-center justify-between rounded-none px-3 py-2.5 text-sm font-medium ${
                  active ? "is-active bg-brand/15 text-brand" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_4px_rgba(245,179,1,0.6)]" />
                  {item.label}
                </span>
                {item.href === "/admin/leads" && unreadCount > 0 && (
                  <span className="badge-pulse flex h-5 min-w-5 items-center justify-center rounded-none bg-brand px-1 text-[11px] font-bold text-ink">
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
            className="admin-nav-link group flex items-center gap-2.5 rounded-none px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            {dict.admin.sidebar.viewSite}
          </a>
          <p className="truncate px-3 text-xs text-white/30">{email}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="admin-nav-link group flex w-full items-center gap-2.5 rounded-none px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              {dict.admin.sidebar.logout}
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
