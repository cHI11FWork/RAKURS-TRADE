import type { DirectionWithItems } from "@/lib/supabase/types";
import { DirectionCard } from "./DirectionCard";

export function Directions({ directions }: { directions: DirectionWithItems[] }) {
  if (directions.length === 0) return null;

  return (
    <section id="directions" className="bg-ink-soft py-20 lg:py-28">
      <div className="container-page">
        <h2 className="text-center font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
          Наші напрями
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {directions.map((direction) => (
            <DirectionCard key={direction.id} direction={direction} />
          ))}
        </div>
      </div>
    </section>
  );
}
