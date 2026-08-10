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
    path: "/about",
    key: "about",
    image: "/imgs/icons/mit-logo-full-resized.png",
    keywords: [
      "About MIT",
      "MIT Hungary",
      "Muszlim Ifjúság Társaság rólunk",
      "Muslim Youth Association of Hungary",
      "Muslim organization Budapest",
      "Islamic youth organization Hungary",
      "جمعية الشباب المسلم في المجر",
    ],
  });
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
