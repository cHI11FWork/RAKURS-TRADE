"use client";

import { ArrowRight } from "lucide-react";
import type { Hero as HeroType, HeroFeature } from "@/lib/supabase/types";
import { HeroScene } from "./HeroScene";
import { AppIcon } from "@/lib/icons";
import { Reveal } from "./Reveal";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { pick } from "@/lib/i18n/localize";

export function Hero({ hero, features }: { hero: HeroType | null; features: HeroFeature[] }) {
  const { locale } = useLocale();
  if (!hero) return null;

  const titleMain = pick(hero.title_main, hero.title_main_en, locale);
  const titleHighlight = pick(hero.title_highlight, hero.title_highlight_en, locale);
  const subtitle = pick(hero.subtitle, hero.subtitle_en, locale);
  const ctaText = pick(hero.cta_text, hero.cta_text_en, locale);

  return (
    <section className="relative overflow-hidden pt-40 pb-16 lg:pt-48 lg:pb-24">
      <HeroScene backgroundImageUrl={hero.background_image_url} />

      <div className="container-page">
        <div className="max-w-3xl">
          <Reveal y={18}>
            <h1 className="font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {titleMain}
              <span className="text-brand">{titleHighlight}</span>
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal y={18} delay={100}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">{subtitle}</p>
            </Reveal>
          )}

          {ctaText && (
            <Reveal y={18} delay={200}>
              <a
                href={hero.cta_link}
                className="group mt-8 inline-flex items-center gap-2 rounded-none bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink shadow-[0_8px_30px_-8px_rgba(245,179,1,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(245,179,1,0.75)]"
              >
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          )}
        </div>

        {features.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 lg:mt-24 lg:grid-cols-4 lg:gap-8">
            {features.map((feature, index) => (
              <Reveal key={feature.id} y={16} delay={index * 80}>
                <div className="flex items-start gap-3">
                  <AppIcon name={feature.icon} className="h-7 w-7 shrink-0 text-brand" />
                  <div>
                    <p className="font-heading text-xs font-bold uppercase tracking-wide text-white">
                      {pick(feature.title, feature.title_en, locale)}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/55">
                      {pick(feature.subtitle, feature.subtitle_en, locale)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
