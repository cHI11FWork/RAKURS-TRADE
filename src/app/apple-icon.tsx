import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const boltPath = join(process.cwd(), "public", "images", "logo-bolt.png");
  const boltBase64 = readFileSync(boltPath).toString("base64");
  const boltSrc = `data:image/png;base64,${boltBase64}`;

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
        <img src={boltSrc} width={120} height={145} alt="" />
      </div>
    ),
    { ...size }
  );
}
