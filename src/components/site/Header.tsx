"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "#about", label: "Про компанію" },
  { href: "#directions", label: "Наші напрями" },
  { href: "#contacts", label: "Контакти" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [langHint, setLangHint] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative">
            <button
              onClick={() => setLangHint((v) => !v)}
              className="flex items-center gap-1 text-sm font-bold tracking-wide text-white/90"
              aria-label="Мова сайту"
            >
              <span className="text-brand">UA</span>
              <span className="text-white/30">|</span>
              <span className="text-white/50">EN</span>
            </button>
            {langHint && (
              <div className="absolute right-0 top-8 w-48 rounded-lg border border-ink-border bg-ink-card px-3 py-2 text-xs text-white/70 shadow-xl">
                Англійська версія скоро з&apos;явиться
              </div>
            )}
          </div>
        </div>

        <button
          className="p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
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
                className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:bg-white/5 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
