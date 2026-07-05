"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { DirectionWithItems } from "@/lib/supabase/types";
import { AppIcon } from "@/lib/icons";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { pick } from "@/lib/i18n/localize";

const DEFAULT_DIRECTION_IMAGES: Record<string, string> = {
  bolt: "/images/direction-power.jpg",
  "shield-lightning": "/images/direction-lightning.jpg",
  crosshair: "/images/direction-defense.jpg",
};

export function DirectionCard({ direction }: { direction: DirectionWithItems }) {
  const { locale } = useLocale();
  const imageSrc = direction.image_url ?? DEFAULT_DIRECTION_IMAGES[direction.icon] ?? null;
  const title = pick(direction.title, direction.title_en, locale);
  const buttonText = pick(direction.button_text, direction.button_text_en, locale);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-none border border-ink-border transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] ${
        direction.enable_lightning_effect ? "lightning-card" : ""
      }`}
      tabIndex={direction.enable_lightning_effect ? 0 : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ink-soft to-black">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={`object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105 ${
              direction.enable_lightning_effect ? "lightning-photo" : ""
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.18),transparent_60%)]" />
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,11,14,0.15)_0%,rgba(10,11,14,0.55)_30%,rgba(10,11,14,0.88)_50%,#0a0b0e_68%)]" />

      {direction.enable_lightning_effect && (
        <div className="lightning-flash pointer-events-none absolute inset-0 bg-white" />
      )}

      <div className="relative z-10 flex h-40 shrink-0 items-start p-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-none border border-brand/40 bg-black/35 backdrop-blur-sm">
          {direction.icon === "bolt" ? (
            <Image src="/images/logo-bolt.png" alt="" width={24} height={29} className="h-6 w-auto shrink-0" />
          ) : (
            <AppIcon name={direction.icon} className="h-6 w-6 shrink-0 text-brand" />
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-6">
        <h3 className="break-words font-heading text-lg font-extrabold uppercase tracking-wide text-white">
          {title}
        </h3>

        {direction.items.length > 0 && (
          <ul className="mt-4 flex-1 space-y-2.5">
            {direction.items.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{pick(item.text, item.text_en, locale)}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={direction.button_link}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:text-white"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
