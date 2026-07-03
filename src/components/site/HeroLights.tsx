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
  { top: "18%", left: "58%", size: 5, color: "#ffd166", duration: 3.2, delay: 0 },
  { top: "24%", left: "66%", size: 4, color: "#fff3c4", duration: 4.1, delay: 0.6, fast: true },
  { top: "15%", left: "74%", size: 6, color: "#ffb703", duration: 2.6, delay: 1.1 },
  { top: "30%", left: "81%", size: 4, color: "#ffe066", duration: 3.8, delay: 0.3 },
  { top: "40%", left: "62%", size: 5, color: "#ffd166", duration: 2.9, delay: 1.6, fast: true },
  { top: "12%", left: "88%", size: 3, color: "#fff3c4", duration: 4.6, delay: 0.9 },
  { top: "48%", left: "90%", size: 4, color: "#ffb703", duration: 3.3, delay: 2.0 },
  { top: "22%", left: "40%", size: 3, color: "#ffe066", duration: 5.2, delay: 0.4 },
  { top: "35%", left: "28%", size: 4, color: "#ffd166", duration: 3.6, delay: 1.3, fast: true },
  { top: "8%", left: "52%", size: 3, color: "#fff3c4", duration: 4.4, delay: 0.7 },
];

export function HeroLights() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
    </div>
  );
}
