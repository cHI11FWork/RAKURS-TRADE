"use client";

import type { DirectionWithItems } from "@/lib/supabase/types";
import { DirectionCard } from "./DirectionCard";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function Directions({ directions }: { directions: DirectionWithItems[] }) {
  const { dict } = useLocale();
  if (directions.length === 0) return null;

  return (
    <section id="directions" className="bg-ink-soft py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="flex justify-center">
          <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
            {dict.site.directions.heading}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {directions.map((direction, index) => (
            <Reveal key={direction.id} y={28} delay={index * 100}>
              <DirectionCard direction={direction} tiltIndex={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
