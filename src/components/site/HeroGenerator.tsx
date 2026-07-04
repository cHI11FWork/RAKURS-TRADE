import Image from "next/image";

const VENT_ROWS = [0, 1, 2, 3, 4, 5];
const STEAM_WISPS = [
  { left: 96, delay: 0 },
  { left: 170, delay: 1.6 },
  { left: 244, delay: 3.1 },
];

function VentPanel({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={38} width={110} height={52} rx={3} fill="#0d0e12" stroke="rgba(245,179,1,0.15)" />
      <rect
        x={x + 6}
        y={38}
        width={98}
        height={52}
        fill="url(#ventGlowGrad)"
        filter="url(#glowBlur)"
        className="generator-vent-glow"
      />
      {VENT_ROWS.map((i) => (
        <rect
          key={i}
          x={x + 6}
          y={45 + i * 7}
          width={98}
          height={3}
          rx={1.5}
          fill="#1c1e24"
          stroke="rgba(255,255,255,0.05)"
        />
      ))}
    </g>
  );
}

export function HeroGenerator() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] shrink-0">
      <svg viewBox="0 0 340 268" className="block w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]" aria-hidden="true">
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#24272e" />
            <stop offset="100%" stopColor="#101217" />
          </linearGradient>
          <radialGradient id="ventGlowGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(245,179,1,0.9)" />
            <stop offset="100%" stopColor="rgba(245,179,1,0)" />
          </radialGradient>
          <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <filter id="glowBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="steamBlur">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <pattern id="hazard" width={14} height={14} patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width={14} height={14} fill="#0a0b0e" />
            <rect width={7} height={14} fill="#f5b301" />
          </pattern>
        </defs>

        {/* ground shadow */}
        <ellipse cx={170} cy={258} rx={150} ry={9} fill="url(#shadowGrad)" />

        {/* concrete pad */}
        <rect x={8} y={240} width={324} height={12} rx={2} fill="#2a2d35" />

        {/* feet / skid */}
        <rect x={45} y={225} width={34} height={16} fill="#111318" />
        <rect x={261} y={225} width={34} height={16} fill="#111318" />

        {/* hazard safety band */}
        <rect x={15} y={216} width={310} height={10} fill="url(#hazard)" opacity={0.85} />

        {/* main body */}
        <rect x={15} y={26} width={310} height={190} rx={8} fill="url(#bodyGrad)" stroke="rgba(245,179,1,0.22)" strokeWidth={1.5} />

        {/* corner bolts */}
        {[
          [24, 36],
          [316, 36],
          [24, 206],
          [316, 206],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.5} fill="#3a3d45" stroke="rgba(0,0,0,0.5)" />
        ))}

        {/* vents */}
        <VentPanel x={30} />
        <VentPanel x={200} />

        {/* steam wisps rising from vents */}
        {STEAM_WISPS.map((w, i) => (
          <ellipse
            key={i}
            cx={w.left}
            cy={34}
            rx={10}
            ry={5}
            fill="rgba(220,224,230,0.5)"
            filter="url(#steamBlur)"
            className="generator-steam"
            style={{ animationDelay: `${w.delay}s` }}
          />
        ))}

        {/* nameplate recess (logo sits on top via HTML overlay) */}
        <rect x={30} y={98} width={280} height={52} rx={4} fill="#0c0d10" stroke="rgba(245,179,1,0.35)" />

        {/* door panel */}
        <rect x={30} y={158} width={280} height={50} rx={4} fill="#16181d" stroke="rgba(255,255,255,0.05)" />
        <line x1={170} y1={158} x2={170} y2={208} stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
        <rect x={150} y={176} width={6} height={18} rx={2} fill="#2a2d35" stroke="rgba(245,179,1,0.3)" />
        <rect x={184} y={176} width={6} height={18} rx={2} fill="#2a2d35" stroke="rgba(245,179,1,0.3)" />

        {/* hazard sticker */}
        <rect x={42} y={178} width={24} height={14} rx={1} fill="url(#hazard)" stroke="rgba(0,0,0,0.4)" />

        {/* control box */}
        <rect x={266} y={172} width={32} height={36} rx={3} fill="#1a1c22" stroke="rgba(245,179,1,0.25)" />
        <circle cx={275} cy={183} r={4} fill="#0a0b0e" stroke="rgba(245,179,1,0.4)" />
        <circle cx={289} cy={183} r={4} fill="#0a0b0e" stroke="rgba(245,179,1,0.4)" />
        <circle cx={282} cy={198} r={3} fill="#f5b301" className="generator-led" />
      </svg>

      {/* logo nameplate — real client bolt asset + wordmark, overlaid on the recessed panel */}
      <div
        className="absolute flex items-center justify-center gap-2"
        style={{ left: "8.8%", top: "36.6%", width: "82.4%", height: "19.4%" }}
      >
        <Image src="/images/logo-bolt.png" alt="" width={18} height={22} className="logo-bolt-img h-[46%] w-auto shrink-0" />
        <div className="leading-none">
          <span className="block font-heading text-[11px] font-extrabold tracking-wide text-white sm:text-xs">
            RAKURS
          </span>
          <span className="block font-heading text-[6px] font-medium tracking-[6.8px] text-brand sm:text-[7px] sm:tracking-[7.7px]">
            TRADE
          </span>
        </div>
      </div>

      {/* ambient sheen sweeping across the housing */}
      <div
        className="generator-shine-sweep pointer-events-none absolute inset-0 overflow-hidden rounded-[6%]"
        aria-hidden="true"
      />
    </div>
  );
}
