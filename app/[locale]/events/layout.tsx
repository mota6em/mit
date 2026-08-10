import type { Metadata } from "next";

import { LOCALES } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/pageMetadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    path: "/events",
    key: "events",
    image: "/imgs/events/one-year-mit-layout.jpg",
    keywords: [
      "MIT events",
      "MIT Hungary events",
      "Muszlim Ifjúság Társaság programok",
      "Muslim youth events Budapest",
      "Islamic events Hungary",
      "Muslim student community Budapest",
      "halal events Budapest",
      "Ramadan iftar Budapest",
      "Quran circle Budapest",
      "فعاليات إسلامية بودابست",
    ],
  });
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
