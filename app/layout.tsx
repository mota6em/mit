import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import { Cairo, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MIT - Muszlim Ifjúság Társaság",
  description:
    "Muslim Youth Association of Hungary (MIT) is a volunteer-driven organization dedicated to uniting and empowering Muslim youth across Hungary...",
  icons: {
    icon: "/favicon.ico",
    apple: "/imgs/icons/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteNameJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MIT - Muszlim Ifjúság Társaság",
    alternateName: [
      "MIT",
      "Muszlim Ifjúság Társaság",
      "Muslim Youth Association of Hungary",
    ],
    url: "https://mit-hu.eu",
  };

  return (
    <html className={`${inter.className} ${cairo.className}`}>
      <head>
        <Script
          id="site-name-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNameJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
