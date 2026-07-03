import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { DirectionWithItems } from "@/lib/supabase/types";
import { AppIcon } from "@/lib/icons";

export function DirectionCard({ direction }: { direction: DirectionWithItems }) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink-border bg-ink-card transition-transform duration-300 hover:-translate-y-1.5 ${
        direction.enable_lightning_effect ? "lightning-card" : ""
      }`}
      tabIndex={direction.enable_lightning_effect ? 0 : undefined}
    >
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-ink-soft to-black">
        {direction.image_url ? (
          <Image
            src={direction.image_url}
            alt={direction.title}
            fill
            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,0.18),transparent_60%)]" />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/15 ring-1 ring-brand/30 backdrop-blur-sm">
            <AppIcon name={direction.icon} className="h-7 w-7 text-brand" />
          </div>
        </div>

        {direction.enable_lightning_effect && (
          <>
            <div className="lightning-flash pointer-events-none absolute inset-0 bg-white" />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 200 160"
              fill="none"
            >
              <path
                className="lightning-bolt-path"
                d="M108 8 L60 82 L92 82 L74 152 L142 66 L104 66 Z"
                stroke="#fff3c4"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="rgba(255,243,196,0.15)"
              />
            </svg>
          </>
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
