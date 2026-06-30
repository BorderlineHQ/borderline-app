import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BorderLine | Trust Infrastructure for Africa's Digital Builders",
    short_name: "BorderLine",
    description: "AI-powered economic infrastructure that verifies, connects, and monetizes the continent's emerging digital builders.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712", // Aligns with --color-bg in dark theme
    theme_color: "#030712",      // Dark so Safari status bar is not green
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
