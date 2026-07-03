import type { SiteSettings } from "@/lib/supabase/types";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink py-10">
      <Reveal y={12} className="container-page flex flex-col items-center gap-6 text-center">
        <Logo />

        <p className="text-xs text-white/40">© {year} RAKURS TRADE. Всі права захищені.</p>

        {(settings?.footer_note_1 || settings?.footer_note_2) && (
          <p className="max-w-xl text-xs leading-relaxed text-white/30">
            {settings.footer_note_1}
            {settings.footer_note_1 && settings.footer_note_2 && <br />}
            {settings.footer_note_2}
          </p>
        )}
      </Reveal>
    </footer>
  );
}
