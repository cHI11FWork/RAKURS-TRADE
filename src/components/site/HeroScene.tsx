import Image from "next/image";
import { Zap } from "lucide-react";
import { HeroLights } from "./HeroLights";

export function HeroScene({ backgroundImageUrl }: { backgroundImageUrl: string | null }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      {backgroundImageUrl ? (
        <Image
          src={backgroundImageUrl}
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
      ) : (
        <IllustratedScene />
      )}

      <HeroLights />

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
    </div>
  );
}

function IllustratedScene() {
  return (
    <div
      className="absolute inset-0"
      style={{ animation: "drift 22s ease-in-out infinite" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#1c2230_0%,#0a0b0e_65%)]" />

      <svg
        className="absolute inset-x-0 bottom-0 h-2/3 w-full opacity-60"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <rect x="780" y="120" width="26" height="300" fill="#1a1d24" />
        <rect x="770" y="100" width="46" height="24" fill="#20242c" />
        <rect x="900" y="200" width="140" height="220" rx="4" fill="#171a20" />
        <rect x="1060" y="160" width="90" height="260" rx="4" fill="#1a1d24" />
        <circle cx="945" cy="180" r="34" fill="#171a20" />
        <rect x="650" y="260" width="18" height="160" fill="#171a20" />
        <rect x="600" y="300" width="18" height="120" fill="#171a20" />
        <line x1="618" y1="305" x2="650" y2="265" stroke="#1a1d24" strokeWidth="4" />
      </svg>

      <div className="absolute bottom-0 right-[4%] h-[55%] w-[36%] min-w-[220px]">
        <div className="relative h-full w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#23262d] to-[#111318] shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-brand-dark via-brand to-brand-dark" />
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
            <Zap className="h-10 w-10 fill-brand text-brand" strokeWidth={1.5} />
            <span className="font-heading text-xl font-extrabold tracking-wide text-white/90">
              RAKURS
            </span>
            <span className="font-heading text-[10px] font-medium tracking-[0.4em] text-brand">
              TRADE
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-brand"
                style={{
                  animation: "flicker 2.4s ease-in-out infinite",
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
