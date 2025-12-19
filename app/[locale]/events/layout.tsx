import "../globals.css";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hu" }];
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (e) {
    messages = (await import(`../../messages/en.json`)).default;
  }

  const t = messages.events.metadata;

  return {
    title: t.title,
    description: t.description,
    keywords: [
      "MIT events",
      "Join MIT Hungary",
      "Muslim Youth Society events",
      "Muszlim Ifjúság Társaság programok",
      "Muslim student community",
      "Budapest Islamic events",
      "Join us MIT",
      "Muslim youth community",
      "Events for Muslim students",
      "Events in Hungary for Muslim students",
      "Muslim youth events",
      "Muslim youth activities",
      "Muslim youth activities in Hungary",
      "Muslim youth activities in Budapest",
    ],
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://mit-hu.vercel.app/${locale}`,
      siteName: "MIT - Muszlim Ifjúság Társaság",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    icons: {
      icon: [{ url: "/imgs/icon.jpg" }],
      apple: [{ url: "/imgs/icon.jpg" }],
    },
  };
}
