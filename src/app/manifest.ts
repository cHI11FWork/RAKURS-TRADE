import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "RAKURS",
    description: "Engineering solutions for autonomous power supply, lightning protection and critical infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0e",
    theme_color: "#0a0b0e",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
