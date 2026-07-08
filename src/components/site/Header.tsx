"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function Header() {
  const { locale, setLocale, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_LINKS = [
    { href: "#about", label: dict.site.nav.about },
    { href: "#directions", label: dict.site.nav.directions },
    { href: "#contacts", label: dict.site.nav.contacts },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-ink/95 shadow-lg shadow-black/30" : "bg-ink/80"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-brand"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => setLocale(locale === "uk" ? "en" : "uk")}
            className="flex items-center gap-1 text-sm font-bold tracking-wide text-white/90"
            aria-label={dict.site.header.langAriaLabel}
          >
            <span className={locale === "uk" ? "text-brand" : "text-white/50"}>UA</span>
            <span className="text-white/30">|</span>
            <span className={locale === "en" ? "text-brand" : "text-white/50"}>EN</span>
          </button>
        </div>

        <button
          className="p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={dict.site.header.menuAriaLabel}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-ink lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-none px-3 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLocale(locale === "uk" ? "en" : "uk")}
              className="mt-1 flex items-center gap-1 px-3 py-2 text-sm font-bold tracking-wide text-white/90"
              aria-label={dict.site.header.langAriaLabel}
            >
              <span className={locale === "uk" ? "text-brand" : "text-white/50"}>UA</span>
              <span className="text-white/30">|</span>
              <span className={locale === "en" ? "text-brand" : "text-white/50"}>EN</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
