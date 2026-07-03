"use client";

import type { AboutContent, AboutStat } from "@/lib/supabase/types";
import { AppIcon } from "@/lib/icons";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { pick } from "@/lib/i18n/localize";

export function About({
  about,
  stats,
}: {
  about: AboutContent | null;
  stats: AboutStat[];
}) {
  const { locale } = useLocale();
  if (!about) return null;

  const heading = pick(about.heading, about.heading_en, locale);
  const paragraph1 = pick(about.paragraph_1, about.paragraph_1_en, locale);
  const paragraph2 = pick(about.paragraph_2, about.paragraph_2_en, locale);

  return (
    <section id="about" className="bg-ink py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <Reveal>
          <div>
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
              {heading}
            </h2>
            {paragraph1 && <p className="mt-6 leading-relaxed text-white/70">{paragraph1}</p>}
            {paragraph2 && <p className="mt-4 leading-relaxed text-white/70">{paragraph2}</p>}
          </div>
        </Reveal>

        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.id} delay={index * 90} y={16}>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <AppIcon name={stat.icon} className="h-7 w-7 text-brand" />
                  <p className="mt-3 font-heading text-2xl font-extrabold text-white sm:text-3xl">
                    <CountUp text={pick(stat.number_text, stat.number_text_en, locale)} />
                  </p>
                  <p className="mt-1 max-w-[10rem] text-xs leading-snug text-white/55">
                    {pick(stat.label_text, stat.label_text_en, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
