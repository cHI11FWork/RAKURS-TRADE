import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const markPath = join(process.cwd(), "public", "images", "logo-r-mark-white.png");
  const markBase64 = readFileSync(markPath).toString("base64");
  const markSrc = `data:image/png;base64,${markBase64}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={101} height={145} alt="" />
      </div>
    ),
    { ...size }
  );
}
