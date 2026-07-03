import type { AboutContent, AboutStat } from "@/lib/supabase/types";
import { AppIcon } from "@/lib/icons";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

export function About({
  about,
  stats,
}: {
  about: AboutContent | null;
  stats: AboutStat[];
}) {
  if (!about) return null;

  return (
    <section id="about" className="bg-ink py-20 lg:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <Reveal>
          <div>
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
              {about.heading}
            </h2>
            {about.paragraph_1 && (
              <p className="mt-6 leading-relaxed text-white/70">{about.paragraph_1}</p>
            )}
            {about.paragraph_2 && (
              <p className="mt-4 leading-relaxed text-white/70">{about.paragraph_2}</p>
            )}
          </div>
        </Reveal>

        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.id} delay={index * 90} y={16}>
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <AppIcon name={stat.icon} className="h-7 w-7 text-brand" />
                  <p className="mt-3 font-heading text-2xl font-extrabold text-white sm:text-3xl">
                    <CountUp text={stat.number_text} />
                  </p>
                  <p className="mt-1 max-w-[10rem] text-xs leading-snug text-white/55">
                    {stat.label_text}
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
