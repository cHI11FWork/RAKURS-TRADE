import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/supabase/types";
import { LinkedinIcon } from "@/lib/icons";
import { ContactForm } from "./ContactForm";

export function ContactSection({ settings }: { settings: SiteSettings | null }) {
  if (!settings) return null;

  return (
    <section id="contacts" className="bg-ink-soft py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
            Контакти
          </h2>

          <div className="mt-8 space-y-5">
            {settings.phone && (
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <Phone className="h-5 w-5 text-brand" />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <Mail className="h-5 w-5 text-brand" />
                {settings.email}
              </a>
            )}
            {settings.address && (
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-brand" />
                {settings.address}
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {settings.telegram_url && (
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-border text-white/70 transition-colors hover:border-brand hover:text-brand"
              >
                <Send className="h-5 w-5" />
              </a>
            )}
            {settings.whatsapp_url && (
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-border text-white/70 transition-colors hover:border-brand hover:text-brand"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            )}
            {settings.linkedin_url && (
              <a
                href={settings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-border text-white/70 transition-colors hover:border-brand hover:text-brand"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-ink-border bg-ink-card p-6 sm:p-8">
          <h3 className="font-heading text-lg font-bold text-white">Надішліть запит</h3>
          <p className="mt-1 text-sm text-white/55">
            Заповніть форму, і наші спеціалісти зв&apos;яжуться з вами найближчим часом.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {settings.whatsapp_url && (
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-border py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-brand hover:text-brand"
              >
                <MessageCircle className="h-4 w-4" />
                Написати у WhatsApp
              </a>
            )}
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-border py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-brand hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                Зателефонувати
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
