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
        className="hero-photo object-cover"
      />

      <HeroLights />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
    </div>
  );
}
