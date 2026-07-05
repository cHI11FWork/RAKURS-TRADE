import { getSiteSettingsAdmin } from "@/lib/admin-data";
import { Field, inputClass } from "@/components/admin/Field";
import { SaveButton } from "@/components/admin/SaveButton";
import { getServerLocale } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionary";
import { updateSiteSettings } from "./actions";

export const metadata = { title: "Контакти та соцмережі — RAKURS TRADE" };

export default async function SettingsAdminPage() {
  const [settings, locale] = await Promise.all([getSiteSettingsAdmin(), getServerLocale()]);
  const dict = dictionaries[locale].admin;
  const t = dict.settings;
  const ukSuffix = dict.common.contentUkSuffix;
  const enSuffix = dict.common.contentEnSuffix;

  return (
    <div className="admin-fade-up space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-white">{t.title}</h1>
        <p className="mt-1 text-sm text-white/50">{t.subtitle}</p>
      </div>

      <form
        action={updateSiteSettings}
        className="admin-card-hover space-y-4 rounded-none border border-ink-border bg-ink-card p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label={t.phoneLabel}>
            <input name="phone" defaultValue={settings?.phone} className={inputClass} />
          </Field>
          <Field label={t.phone2Label}>
            <input name="phone_2" defaultValue={settings?.phone_2} className={inputClass} />
          </Field>
          <Field label={t.emailLabel}>
            <input name="email" defaultValue={settings?.email} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={`${t.addressLabel}${ukSuffix}`}>
            <input name="address" defaultValue={settings?.address} className={inputClass} />
          </Field>
          <Field label={`${t.addressLabel}${enSuffix}`}>
            <input name="address_en" defaultValue={settings?.address_en} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={`${t.legalNameLabel}${ukSuffix}`}>
            <input name="legal_name" defaultValue={settings?.legal_name} className={inputClass} />
          </Field>
          <Field label={`${t.legalNameLabel}${enSuffix}`}>
            <input name="legal_name_en" defaultValue={settings?.legal_name_en} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label={t.edrpouLabel}>
            <input name="edrpou" defaultValue={settings?.edrpou} className={inputClass} />
          </Field>
          <Field label={`${t.mailingAddressLabel}${ukSuffix}`}>
            <input name="mailing_address" defaultValue={settings?.mailing_address} className={inputClass} />
          </Field>
          <Field label={`${t.mailingAddressLabel}${enSuffix}`}>
            <input name="mailing_address_en" defaultValue={settings?.mailing_address_en} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label={t.telegramLabel}>
            <input name="telegram_url" defaultValue={settings?.telegram_url} className={inputClass} />
          </Field>
          <Field label={t.whatsappLabel}>
            <input name="whatsapp_url" defaultValue={settings?.whatsapp_url} className={inputClass} />
          </Field>
          <Field label={t.linkedinLabel}>
            <input name="linkedin_url" defaultValue={settings?.linkedin_url} className={inputClass} />
          </Field>
          <Field label={t.instagramLabel}>
            <input name="instagram_url" defaultValue={settings?.instagram_url} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={`${t.footer1Label}${ukSuffix}`}>
            <input name="footer_note_1" defaultValue={settings?.footer_note_1} className={inputClass} />
          </Field>
          <Field label={`${t.footer1Label}${enSuffix}`}>
            <input name="footer_note_1_en" defaultValue={settings?.footer_note_1_en} className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={`${t.footer2Label}${ukSuffix}`}>
            <input name="footer_note_2" defaultValue={settings?.footer_note_2} className={inputClass} />
          </Field>
          <Field label={`${t.footer2Label}${enSuffix}`}>
            <input name="footer_note_2_en" defaultValue={settings?.footer_note_2_en} className={inputClass} />
          </Field>
        </div>

        <SaveButton locale={locale} />
      </form>
    </div>
  );
}
