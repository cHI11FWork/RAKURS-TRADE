type Light = {
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  fast?: boolean;
};

const LIGHTS: Light[] = [
  { top: "18%", left: "22%", size: 3, color: "#ffd166", duration: 3.6, delay: 0.2 },
  { top: "28%", left: "72%", size: 4, color: "#fff3c4", duration: 4.2, delay: 0.8, fast: true },
  { top: "12%", left: "58%", size: 3, color: "#ffb703", duration: 3.1, delay: 1.3 },
  { top: "62%", left: "16%", size: 4, color: "#ffe066", duration: 4.6, delay: 0.5 },
  { top: "72%", left: "80%", size: 3, color: "#ffd166", duration: 3.3, delay: 1.7, fast: true },
  { top: "45%", left: "88%", size: 3, color: "#fff3c4", duration: 4.9, delay: 0.9 },
  { top: "80%", left: "45%", size: 4, color: "#ffb703", duration: 3.8, delay: 2.1 },
  { top: "8%", left: "84%", size: 3, color: "#ffe066", duration: 4.1, delay: 0.4 },
  { top: "52%", left: "8%", size: 3, color: "#ffd166", duration: 3.5, delay: 1.5, fast: true },
];

export function LoginBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <div className="drift-slow absolute left-1/2 top-0 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(circle,rgba(245,179,1,0.14),transparent_65%)]" />
      <div className="absolute bottom-0 right-0 h-[480px] w-[480px] translate-x-1/4 translate-y-1/4 bg-[radial-gradient(circle,rgba(245,179,1,0.09),transparent_70%)]" />

      {LIGHTS.map((light, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              top: light.top,
              left: light.left,
              width: light.size,
              height: light.size,
              background: light.color,
              boxShadow: `0 0 ${light.size * 4}px ${light.size}px ${light.color}`,
              opacity: 0,
              animation: `light-power-on 0.6s ease-out ${light.delay}s both, ${
                light.fast ? "flicker-fast" : "flicker"
              } ${light.duration}s ease-in-out ${light.delay + 0.6}s infinite`,
              "--flicker-min": light.fast ? 0.1 : 0.25,
              "--flicker-max": 1,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,var(--color-ink)_100%)]" />
    </div>
  );
}
