import Image from "next/image";

export function HeroGenerator() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] shrink-0">
      <div className="generator-ambient-glow pointer-events-none absolute inset-x-[6%] bottom-[6%] top-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,179,1,0.35),transparent_70%)] blur-2xl" />

      <div className="generator-float relative">
        <div className="relative overflow-hidden">
          <Image
            src="/images/hero-generator-v4.png"
            alt="Дизельний генератор"
            width={1595}
            height={1004}
            priority
            className="block w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
          />
          <div
            className="generator-shine-sweep pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-x-[6%] -bottom-2 h-4 rounded-full bg-black/50 blur-md" aria-hidden="true" />
      </div>
    </div>
  );
}
