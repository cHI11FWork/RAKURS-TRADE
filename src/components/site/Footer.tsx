"use client";

import type { SiteSettings } from "@/lib/supabase/types";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { pick } from "@/lib/i18n/localize";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const { locale, dict } = useLocale();
  const year = new Date().getFullYear();

  const note1 = settings ? pick(settings.footer_note_1, settings.footer_note_1_en, locale) : "";
  const note2 = settings ? pick(settings.footer_note_2, settings.footer_note_2_en, locale) : "";

  return (
    <footer className="border-t border-white/5 bg-ink py-10">
      <Reveal y={12} className="container-page flex flex-col items-center gap-6 text-center">
        <Logo />

        <p className="text-xs text-white/40">
          © {year} RAKURS TRADE. {dict.site.footer.rights}
        </p>

        {(note1 || note2) && (
          <p className="max-w-xl text-xs leading-relaxed text-white/30">
            {note1}
            {note1 && note2 && <br />}
            {note2}
          </p>
        )}
      </Reveal>
    </footer>
  );
}
