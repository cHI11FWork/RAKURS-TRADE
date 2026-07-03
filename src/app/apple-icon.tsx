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
            width: 88,
            height: 110,
            background: "#f5b301",
            clipPath: "polygon(67% 0%, 0% 58%, 39% 58%, 33% 100%, 100% 42%, 61% 42%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
