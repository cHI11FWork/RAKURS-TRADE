import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          background: "#0a0b0e",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 54,
            height: 54,
            background: "linear-gradient(160deg, #ffe08a 0%, #f5b301 45%, #c98a00 100%)",
            clipPath: "polygon(58% 0%, 22% 58%, 47% 58%, 38% 100%, 82% 38%, 53% 38%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#ffffff", letterSpacing: 0.5 }}>
            RAKURS
          </div>
          <div style={{ display: "flex", fontSize: 18, fontWeight: 600, color: "#f5b301", letterSpacing: 5 }}>
            TRADE
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
