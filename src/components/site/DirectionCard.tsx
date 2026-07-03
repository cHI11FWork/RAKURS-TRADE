import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { DirectionWithItems } from "@/lib/supabase/types";
import { AppIcon } from "@/lib/icons";

const BOLT_D = "M18 3 6 18h7l-1 11 12-15h-7z";

const DEFAULT_DIRECTION_IMAGES: Record<string, string> = {
  bolt: "/images/direction-power.jpg",
  "shield-lightning": "/images/direction-lightning.jpg",
  crosshair: "/images/direction-defense.jpg",
};

const TILT_CLASSES = ["rotate-[-1.5deg]", "rotate-0", "rotate-[1.5deg]"];

export function DirectionCard({
  direction,
  tiltIndex = 1,
}: {
  direction: DirectionWithItems;
  tiltIndex?: number;
}) {
  const imageSrc = direction.image_url ?? DEFAULT_DIRECTION_IMAGES[direction.icon] ?? null;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-none border border-ink-border bg-ink-card transition-transform duration-300 ease-out hover:-translate-y-2 hover:rotate-0 hover:scale-[1.015] ${
        TILT_CLASSES[tiltIndex % 3]
      } ${direction.enable_lightning_effect ? "lightning-card" : ""}`}
      tabIndex={direction.enable_lightning_effect ? 0 : undefined}
    >
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-ink-soft to-black">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={direction.title}
            fill
            className={`object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${
              direction.enable_lightning_effect ? "lightning-photo" : ""
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.18),transparent_60%)]" />
        )}

        <div className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-none border border-brand/40 bg-black/35 backdrop-blur-sm">
          {direction.icon === "bolt" ? (
            <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden="true">
              <path d={BOLT_D} fill="#f5b301" transform="translate(1,0)" />
            </svg>
          ) : (
            <AppIcon name={direction.icon} className="h-6 w-6 shrink-0 text-brand" />
          )}
        </div>

        {direction.enable_lightning_effect && (
          <div className="lightning-flash pointer-events-none absolute inset-0 bg-white" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-extrabold uppercase tracking-wide text-white">
          {direction.title}
        </h3>

        {direction.items.length > 0 && (
          <ul className="mt-4 flex-1 space-y-2.5">
            {direction.items.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={direction.button_link}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:text-white"
        >
          {direction.button_text}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
