import Link from "next/link";
import { Zap, Layers, Building2, Settings, Inbox } from "lucide-react";
import { getUnreadLeadsCount } from "@/lib/admin-data";

const CARDS = [
  {
    href: "/admin/hero",
    label: "Головний банер",
    desc: "Заголовок, підзаголовок, кнопка та переваги на першому екрані",
    icon: Zap,
  },
  {
    href: "/admin/directions",
    label: "Наші напрями",
    desc: "Картки послуг, списки та зображення",
    icon: Layers,
  },
  {
    href: "/admin/about",
    label: "Про компанію",
    desc: "Текст про компанію та показники (10+ років тощо)",
    icon: Building2,
  },
  {
    href: "/admin/settings",
    label: "Контакти та соцмережі",
    desc: "Телефон, email, адреса, Telegram/WhatsApp/LinkedIn",
    icon: Settings,
  },
  {
    href: "/admin/leads",
    label: "Заявки з сайту",
    desc: "Повідомлення, надіслані через форму контактів",
    icon: Inbox,
  },
];

export default async function AdminHome() {
  const unread = await getUnreadLeadsCount();

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold text-white">Огляд</h1>
      <p className="mt-1 text-sm text-white/50">
        Керуйте вмістом сайту RAKURS TRADE. Усі зміни з&apos;являються на сайті одразу після
        збереження.
      </p>

      {unread > 0 && (
        <div className="mt-6 rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
          У вас {unread} нових заявок з форми контактів.{" "}
          <Link href="/admin/leads" className="font-bold underline">
            Переглянути
          </Link>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-ink-border bg-ink-card p-5 transition-colors hover:border-brand/40"
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
