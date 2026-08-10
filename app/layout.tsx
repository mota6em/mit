import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Cairo, Inter } from "next/font/google";

import JsonLd from "@/components/seo/JsonLd";
import { DEFAULT_LOCALE, LOCALE_META } from "@/lib/i18n";
import {
  SITE_NAME,
  SITE_URL,
  graph,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cairo",
  display: "swap",
});

const cairoArabic = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo-ar",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "MIT (Muszlim Ifjúság Társaság) is the volunteer-driven Muslim Youth Association of Hungary — events, study circles, workshops and community programs for Muslim youth in Budapest and across Hungary.",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/imgs/icons/icon.jpg",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9faf6" },
    { media: "(prefers-color-scheme: dark)", color: "#10140f" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir={LOCALE_META[DEFAULT_LOCALE].dir}
      className={`${inter.variable} ${cairo.variable} ${cairoArabic.variable}`}
    >
      <body>
        <JsonLd data={graph([organizationJsonLd(), websiteJsonLd()])} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
