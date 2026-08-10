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
    path: "/highlights",
    key: "highlights",
    keywords: [
      "MIT highlights",
      "MIT announcements",
      "Muszlim Ifjúság Társaság hírek",
      "Muslim community news Hungary",
      "Islamic community announcements Budapest",
      "أخبار المسلمين في المجر",
    ],
  });
}

export default function HighlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
