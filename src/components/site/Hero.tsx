import { ArrowRight } from "lucide-react";
import type { Hero as HeroType, HeroFeature } from "@/lib/supabase/types";
import { HeroScene } from "./HeroScene";
import { AppIcon } from "@/lib/icons";

export function Hero({ hero, features }: { hero: HeroType | null; features: HeroFeature[] }) {
  if (!hero) return null;

  return (
    <section className="relative overflow-hidden pt-40 pb-16 lg:pt-48 lg:pb-24">
      <HeroScene backgroundImageUrl={hero.background_image_url} />

      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {hero.title_main}
            <span className="text-brand">{hero.title_highlight}</span>
          </h1>

          {hero.subtitle && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
              {hero.subtitle}
            </p>
          )}

          {hero.cta_text && (
            <a
              href={hero.cta_link}
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[0_8px_30px_-8px_rgba(245,179,1,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(245,179,1,0.75)]"
            >
              {hero.cta_text}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>

        {features.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 lg:mt-24 lg:grid-cols-4 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-start gap-3">
                <AppIcon name={feature.icon} className="h-7 w-7 shrink-0 text-brand" />
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wide text-white">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{feature.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
