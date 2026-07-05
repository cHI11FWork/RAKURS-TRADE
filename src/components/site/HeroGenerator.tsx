"use client";

import { useState } from "react";
import Image from "next/image";

export function HeroGenerator() {
  const [active, setActive] = useState(false);

  const handleTap = () => {
    setActive(true);
    window.setTimeout(() => setActive(false), 1000);
  };

  return (
    <div
      className="generator-interactive group relative mx-auto w-full max-w-[340px] shrink-0 cursor-pointer select-none"
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label="Дизельний генератор"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleTap();
      }}
    >
      <div
        className={`generator-ambient-glow pointer-events-none absolute inset-x-[6%] bottom-[6%] top-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,179,1,0.35),transparent_70%)] blur-2xl ${
          active ? "generator-ambient-glow-active" : ""
        }`}
      />

      <div className="generator-float relative">
        <div
          className={`relative overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.045] ${
            active ? "-translate-y-1.5 scale-[1.045]" : ""
          }`}
        >
          <Image
            src="/images/hero-generator-v4.png"
            alt="Дизельний генератор"
            width={1595}
            height={1004}
            priority
            unoptimized
            className={`block w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] transition-[filter] duration-500 ease-out group-hover:drop-shadow-[0_0_28px_rgba(245,179,1,0.35)] ${
              active ? "drop-shadow-[0_0_28px_rgba(245,179,1,0.35)]" : ""
            }`}
          />
          <div
            className={`generator-shine-sweep pointer-events-none absolute inset-0 ${
              active ? "generator-shine-sweep-burst" : ""
            }`}
            aria-hidden="true"
          />
        </div>
        <div
          className={`absolute inset-x-[6%] -bottom-2 h-4 rounded-full bg-black/50 blur-md transition-transform duration-500 ease-out group-hover:scale-x-110 ${
            active ? "scale-x-110" : ""
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
