import Image from "next/image";
import { HeroLights } from "./HeroLights";

const DEFAULT_HERO_IMAGE = "/images/hero-refinery.png";

export function HeroScene({ backgroundImageUrl }: { backgroundImageUrl: string | null }) {
  return (
    <div className="absolute inset-x-0 top-0 -z-10 h-[560px] overflow-hidden bg-ink sm:h-[640px] lg:inset-0 lg:h-auto">
      <Image
        src={backgroundImageUrl ?? DEFAULT_HERO_IMAGE}
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="hero-photo object-cover object-[68%_38%] lg:object-center"
      />

      <HeroLights />

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent lg:from-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
    </div>
  );
}
