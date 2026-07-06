type Light = {
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  fast?: boolean;
};

// Positions are hand-matched to the actual light points in
// /public/images/hero-refinery.png (refinery towers on the right,
// distant plant on the left) so the flicker sits on real lit windows
// and lamps in the photo rather than at arbitrary spots.
const LIGHTS: Light[] = [
  { top: "12%", left: "72.5%", size: 4, color: "#ffd166", duration: 3.2, delay: 0 },
  { top: "16%", left: "74.5%", size: 3, color: "#fff3c4", duration: 4.1, delay: 0.6, fast: true },
  { top: "13%", left: "77%", size: 4, color: "#ffb703", duration: 2.6, delay: 1.1 },
  { top: "13%", left: "88%", size: 4, color: "#ffe066", duration: 3.8, delay: 0.3 },
  { top: "13.5%", left: "95%", size: 3, color: "#ffd166", duration: 2.9, delay: 1.6, fast: true },
  { top: "17%", left: "92%", size: 4, color: "#fff3c4", duration: 4.6, delay: 0.9 },
  { top: "23%", left: "92%", size: 3, color: "#ffb703", duration: 3.3, delay: 2.0, fast: true },
  { top: "37%", left: "94%", size: 4, color: "#ffe066", duration: 5.2, delay: 0.4 },
  { top: "50.5%", left: "90.5%", size: 5, color: "#ffd166", duration: 3.6, delay: 1.3 },
  { top: "53%", left: "96%", size: 3, color: "#fff3c4", duration: 4.4, delay: 0.7 },
  { top: "33%", left: "8%", size: 3, color: "#ffb703", duration: 4.8, delay: 1.8 },
  { top: "41%", left: "11.5%", size: 3, color: "#ffe066", duration: 3.4, delay: 0.5, fast: true },
  { top: "51.5%", left: "4%", size: 3, color: "#ffd166", duration: 5.0, delay: 1.0 },
  { top: "50.5%", left: "12%", size: 3, color: "#fff3c4", duration: 3.9, delay: 2.2 },
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
