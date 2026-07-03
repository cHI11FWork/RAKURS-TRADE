import Image from "next/image";
import { HeroLights } from "./HeroLights";

const DEFAULT_HERO_IMAGE = "/images/hero-industrial-night.jpg";

export function HeroScene({ backgroundImageUrl }: { backgroundImageUrl: string | null }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      <Image
        src={backgroundImageUrl ?? DEFAULT_HERO_IMAGE}
        alt=""
        fill
        priority
        className="object-cover opacity-90"
      />

      <HeroLights />

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
    </div>
  );
}
