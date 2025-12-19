import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hu" }];
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (e) {
    messages = (await import(`../../../messages/en.json`)).default;
  }

  const t = messages.metadata.events;

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
      url: `https://mit-hu.vercel.app/${locale}/events`,
      siteName: "MIT - Muszlim Ifjúság Társaság",
      images: [
        {
          url: "/imgs/one-year-mit-layout.jpg",
          width: 1200,
          height: 630,
          alt: "MIT - Muszlim Ifjúság Társaság",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/imgs/one-year-mit-layout.jpg"],
    },
    icons: {
      icon: [{ url: "/imgs/icon.jpg" }],
      apple: [{ url: "/imgs/icon.jpg" }],
    },
  };
}
export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
