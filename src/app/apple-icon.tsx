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
          background: "#0a0b0e",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            background: "#f5b301",
            clipPath:
              "polygon(58% 0%, 22% 58%, 47% 58%, 38% 100%, 82% 38%, 53% 38%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
