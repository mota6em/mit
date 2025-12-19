import I18nProvider from "../i18n-provider";
import { notFound } from "next/navigation";
import "../globals.css";
import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hu" }];
}

export const metadata: Metadata = {
  title: {
    default: "MIT - Muszlim Ifjúság Társaság",
    template: "%s | MIT Hungary",
  },

  description:
    "The Youth Muslims of Hungary (MIT) is the leading volunteer-driven organization dedicated to empowering the next generation of Muslim leaders in Budapest and beyond. We provide student support, Quranic education, charity campaigns, and professional internships to build a confident, united community.",

  applicationName: "MIT Hungary",
  authors: [{ name: "Motasem Abubaraka", url: "https://motasem.dev" }],
  generator: "Next.js",
  keywords: [
    "MIT Hungary",
    "Muszlim Ifjúság Társaság",
    "Muslim Youth Association",
    "Muslim Students Hungary",
    "Islamic Education Budapest",
    "Quran Circles Hungary",
    "Muslim Charity Campaigns",
    "Gaza Support Hungary",
    "Muslim Internships Hungary",
    "Muslim Leadership Training",
    "Muslim Youth Leadership",
    "Muslim Youth Leadership Training",
    "Muslim Youth Leadership Training Budapest",

    "Youth Leadership Training",
    "Muslim Internship Programs",
    "Student Mentorship Hungary",
    "Marriage Education Program",
    "Budapest Muslim Community",
    "Hungary Islam",
    "University Students Hungary",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "MIT - Empowering Muslim Youth in Hungary",
    description:
      "Join the movement. MIT connects Muslim students through faith, leadership, and service. Discover our events, internships, and community programs today.", // [cite: 9, 66]
    url: "https://mit-budapest.vercel.app",
    siteName: "Muszlim Ifjúság Társaság (MIT)",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/imgs/icon.jpg",
        width: 1200,
        height: 630,
        alt: "MIT Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MIT Hungary | Faith, Leadership, Community",
    description:
      "We are a volunteer-driven organization building the next generation of Muslim leaders in Hungary through education and service.",
    images: ["/imgs/icon.jpg"],
  },

  icons: {
    icon: [
      { url: "/imgs/icon.jpg" },
      { url: "/imgs/icon.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/imgs/icon.jpg" }],
  },

  category: "Non-Profit Organization",
};

// Mobile Viewport Optimization
export const viewport: Viewport = {
  themeColor: "#1a202c",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return notFound();
  }

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <I18nProvider messages={messages} locale={locale}>
          <NavBar />
          <div className="flex-1">{children}</div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
