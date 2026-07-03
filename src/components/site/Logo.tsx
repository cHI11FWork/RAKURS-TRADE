import Link from "next/link";

const BOLT_D = "M18 3 6 18h7l-1 11 12-15h-7z";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className ?? ""}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="logo-bolt-svg h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            <mask id="logoBoltMask">
              <path d={BOLT_D} fill="#fff" transform="translate(1,0)" />
            </mask>
          </defs>

          <circle className="logo-strike-ring" cx="16" cy="16" r="8" fill="none" stroke="#f5b301" strokeWidth="1.2" />

          <path d={BOLT_D} fill="#f5b301" transform="translate(1,0)" />

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
