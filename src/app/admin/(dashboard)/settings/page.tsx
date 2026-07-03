import { getSiteSettingsAdmin } from "@/lib/admin-data";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveButton } from "@/components/admin/SaveButton";
import { updateSiteSettings } from "./actions";

export const metadata = { title: "Контакти та соцмережі — RAKURS TRADE" };

export default async function SettingsAdminPage() {
  const settings = await getSiteSettingsAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-white">Контакти та соцмережі</h1>
        <p className="mt-1 text-sm text-white/50">
          Ці дані показуються в шапці, у секції контактів та у футері сайту.
        </p>
      </div>

      <form
        action={updateSiteSettings}
        className="space-y-4 rounded-none border border-ink-border bg-ink-card p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Телефон">
            <input name="phone" defaultValue={settings?.phone} className={inputClass} />
          </Field>
          <Field label="Email">
            <input name="email" defaultValue={settings?.email} className={inputClass} />
          </Field>
        </div>

        <Field label="Адреса">
          <input name="address" defaultValue={settings?.address} className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Telegram (посилання)">
            <input name="telegram_url" defaultValue={settings?.telegram_url} className={inputClass} />
          </Field>
          <Field label="WhatsApp (посилання)">
            <input name="whatsapp_url" defaultValue={settings?.whatsapp_url} className={inputClass} />
          </Field>
          <Field label="LinkedIn (посилання)">
            <input name="linkedin_url" defaultValue={settings?.linkedin_url} className={inputClass} />
          </Field>
        </div>

        <Field label="Текст у футері (рядок 1)">
          <input name="footer_note_1" defaultValue={settings?.footer_note_1} className={inputClass} />
        </Field>
        <Field label="Текст у футері (рядок 2)">
          <input name="footer_note_2" defaultValue={settings?.footer_note_2} className={inputClass} />
        </Field>

        <SaveButton />
      </form>
    </div>
  );
}
