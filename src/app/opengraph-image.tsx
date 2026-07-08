import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BOLT_D = "M18 3 6 18h7l-1 11 12-15h-7z";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: "#0a0b0e",
          padding: "0 100px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 260,
            background: "#f5b301",
            opacity: 0.16,
            filter: "blur(140px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <svg width={140} height={175} viewBox="0 0 32 32">
            <path d={BOLT_D} fill="#f5b301" transform="translate(1,0)" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 96,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              RAKURS
            </span>
            <span
              style={{
                fontSize: 42,
                fontWeight: 600,
                color: "#f5b301",
                letterSpacing: 22,
                marginTop: 10,
              }}
            >
              TRADE
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 32,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 980,
            lineHeight: 1.5,
          }}
        >
          Autonomous Power Supply · Lightning Protection · Critical Infrastructure
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: "#f5b301",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
