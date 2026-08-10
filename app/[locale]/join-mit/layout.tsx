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
    path: "/join-mit",
    key: "join",
    image: "/imgs/join/mit-pecs.jpg",
    keywords: [
      "Join MIT Hungary",
      "volunteer Muslim Youth Hungary",
      "Muszlim Ifjúság Társaság önkéntesség",
      "Muslim community Budapest",
      "volunteer opportunities students Hungary",
      "Islamic community service Hungary",
      "التطوع مع المسلمين في المجر",
    ],
  });
}

export default function JoinMITLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
