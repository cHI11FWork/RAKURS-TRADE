import { Zap } from "lucide-react";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className ?? ""}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <Zap
          className="h-9 w-9 fill-brand text-brand transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
      </span>
      <span className="leading-none">
        <span className="block font-heading text-lg font-extrabold tracking-wide text-white">
          RAKURS
        </span>
        <span className="block font-heading text-[11px] font-medium tracking-[0.35em] text-brand">
          TRADE
        </span>
      </span>
    </Link>
  );
}
