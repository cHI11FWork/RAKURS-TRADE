import Link from "next/link";

const BOLT_D =
  "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className ?? ""}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="logo-bolt-svg h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <linearGradient id="logoBoltFill" x1="9" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffe08a" />
              <stop offset="0.45" stopColor="#f5b301" />
              <stop offset="1" stopColor="#c98a00" />
            </linearGradient>
            <mask id="logoBoltMask">
              <path d={BOLT_D} fill="#fff" />
            </mask>
          </defs>

          <circle className="logo-strike-ring" cx="12" cy="12" r="8" fill="none" stroke="#f5b301" strokeWidth="1.2" />

          <path d={BOLT_D} fill="url(#logoBoltFill)" />

          <g mask="url(#logoBoltMask)">
            <rect className="logo-shine-bar" x="-3" y="-4" width="5" height="32" fill="#fff" opacity="0.95" />
          </g>
        </svg>
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
