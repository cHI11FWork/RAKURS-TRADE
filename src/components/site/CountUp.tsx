"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ text, duration = 1200 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const started = useRef(false);

  if (text !== prevText) {
    setPrevText(text);
    setDisplay(text);
  }

  useEffect(() => {
    const match = text.match(/^(\d+)(.*)$/);
    const el = ref.current;
    if (!match || !el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(`${Math.round(target * eased)}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, duration]);

  return <span ref={ref}>{display}</span>;
}
