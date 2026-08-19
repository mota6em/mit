import type { MetadataRoute } from "next";

import { SITE_NAME, SITE_SHORT_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description:
      "Muslim Youth Association of Hungary — events, study circles, workshops and community programs for Muslim youth in Budapest and across Hungary.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9faf6",
    theme_color: "#2d9b4a",
    categories: ["education", "lifestyle", "social"],
    icons: [
      {
        src: "/imgs/icons/icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
