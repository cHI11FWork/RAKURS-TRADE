"use client";

import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/supabase/types";
import { InstagramIcon, WhatsappIcon } from "@/lib/icons";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { pick } from "@/lib/i18n/localize";

export function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const { locale, dict } = useLocale();
  if (!settings) return null;

  const address = pick(settings.address, settings.address_en, locale);
  const legalName = pick(settings.legal_name, settings.legal_name_en, locale);
  const mailingAddress = pick(settings.mailing_address, settings.mailing_address_en, locale);

  return (
    <section id="contacts" className="bg-ink-soft py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
        <div>
          <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
            {dict.site.contact.heading}
          </h2>

          <div className="mt-8 space-y-5">
            {settings.phone && (
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <Phone className="h-5 w-5 text-brand" />
                {settings.phone}
              </a>
            )}
            {settings.phone_2 && (
              <a href={`tel:${settings.phone_2.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <Phone className="h-5 w-5 text-brand" />
                {settings.phone_2}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-white/80 hover:text-brand">
                <Mail className="h-5 w-5 text-brand" />
                {settings.email}
              </a>
            )}
            {address && (
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-brand" />
                {address}
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {settings.telegram_url && (
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.site.contact.telegramAria}
                className="flex h-11 w-11 items-center justify-center rounded-none border border-ink-border text-white/70 transition-colors hover:border-brand hover:text-brand"
              >
                <Send className="h-5 w-5" />
              </a>
            )}
            {settings.whatsapp_url && (
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.site.contact.whatsappAria}
                className="flex h-11 w-11 items-center justify-center rounded-none border border-ink-border text-white/70 transition-colors hover:border-brand hover:text-brand"
              >
                <WhatsappIcon className="h-5 w-5" />
              </a>
            )}
            {settings.instagram_url && (
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dict.site.contact.instagramAria}
                className="flex h-11 w-11 items-center justify-center rounded-none border border-ink-border text-white/70 transition-colors hover:border-brand hover:text-brand"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            )}
          </div>

          {(legalName || settings.edrpou || mailingAddress) && (
            <div className="mt-8 space-y-1 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/50">
              {legalName && <p>{legalName}</p>}
              {settings.edrpou && (
                <p>
                  {dict.site.contact.edrpouLabel} {settings.edrpou}
                </p>
              )}
              {mailingAddress && (
                <p>
                  {dict.site.contact.mailingLabel} {mailingAddress}
                </p>
              )}
            </div>
          )}
        </div>
        </Reveal>

        <Reveal delay={120}>
        <div className="rounded-none border border-ink-border bg-ink-card p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(245,179,1,0.25)]">
          <h3 className="font-heading text-lg font-bold text-white">{dict.site.contact.formHeading}</h3>
          <p className="mt-1 text-sm text-white/55">{dict.site.contact.formSubtitle}</p>
          <div className="mt-6">
            <ContactForm />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {settings.whatsapp_url && (
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-none border border-ink-border py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-brand hover:text-brand"
              >
                <MessageCircle className="h-4 w-4" />
                {dict.site.contact.whatsappButton}
              </a>
            )}
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-none border border-ink-border py-3 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-brand hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                {dict.site.contact.callButton}
              </a>
            )}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
