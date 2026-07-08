import { Mail, Phone, Building2, Trash2 } from "lucide-react";
import { getLeadsAdmin } from "@/lib/admin-data";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { ReadToggle } from "@/components/admin/ReadToggle";
import { getServerLocale } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionary";
import { deleteLead, toggleLeadRead } from "./actions";

export const metadata = { title: "Заявки — RAKURS TRADE" };

export default async function LeadsAdminPage() {
  const [leads, locale] = await Promise.all([getLeadsAdmin(), getServerLocale()]);
  const t = dictionaries[locale].admin.leads;
  const dateLocale = locale === "en" ? "en-US" : "uk-UA";

  return (
    <div className="admin-fade-up space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-white">{t.title}</h1>
        <p className="mt-1 text-sm text-white/50">{t.subtitle}</p>
      </div>

      <div className="space-y-3">
        {leads.map((lead, i) => (
          <div
            key={lead.id}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`admin-card-hover admin-stagger-in rounded-none border p-5 ${
              lead.is_read ? "border-ink-border bg-ink-card" : "border-brand/30 bg-brand/[0.04]"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-heading text-base font-bold text-white">{lead.name}</p>
                <p className="mt-0.5 text-xs text-white/40">
                  {new Date(lead.created_at).toLocaleString(dateLocale)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ReadToggle
                  isRead={lead.is_read}
                  action={toggleLeadRead.bind(null, lead.id, lead.is_read)}
                  locale={locale}
                />
                <form action={deleteLead}>
                  <input type="hidden" name="id" value={lead.id} />
                  <ConfirmSubmitButton
                    label={<Trash2 className="h-4 w-4" />}
                    confirmText={t.deleteConfirm}
                    className="flex h-8 w-8 items-center justify-center rounded-none border border-red-500/20 text-red-400 hover:bg-red-500/10"
                  />
                </form>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-white/70">
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-brand">
                <Phone className="h-3.5 w-3.5 text-brand" />
                {lead.phone}
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-brand">
                  <Mail className="h-3.5 w-3.5 text-brand" />
                  {lead.email}
                </a>
              )}
              {lead.company && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-brand" />
                  {lead.company}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/80">{lead.message}</p>
          </div>
        ))}

        {leads.length === 0 && (
          <p className="rounded-none border border-dashed border-ink-border p-10 text-center text-sm text-white/40">
            {t.empty}
          </p>
        )}
      </div>
    </div>
  );
}
