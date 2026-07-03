import Link from "next/link";
import { Zap, Layers, Building2, Settings, Inbox } from "lucide-react";
import { getUnreadLeadsCount } from "@/lib/admin-data";
import { getServerLocale } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionary";

export default async function AdminHome() {
  const [unread, locale] = await Promise.all([getUnreadLeadsCount(), getServerLocale()]);
  const t = dictionaries[locale].admin.overview;

  const CARDS = [
    { href: "/admin/hero", ...t.cards.hero, icon: Zap },
    { href: "/admin/directions", ...t.cards.directions, icon: Layers },
    { href: "/admin/about", ...t.cards.about, icon: Building2 },
    { href: "/admin/settings", ...t.cards.settings, icon: Settings },
    { href: "/admin/leads", ...t.cards.leads, icon: Inbox },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold text-white">{t.title}</h1>
      <p className="mt-1 text-sm text-white/50">{t.subtitle}</p>

      {unread > 0 && (
        <div className="mt-6 rounded-none border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
          {t.newLeadsPrefix} {unread} {t.newLeadsSuffix}{" "}
          <Link href="/admin/leads" className="font-bold underline">
            {t.viewLink}
          </Link>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-none border border-ink-border bg-ink-card p-5 transition-colors hover:border-brand/40"
          >
            <card.icon className="h-6 w-6 text-brand" />
            <p className="mt-3 font-heading text-sm font-bold text-white">{card.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/50">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
