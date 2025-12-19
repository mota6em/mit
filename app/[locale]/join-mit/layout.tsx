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

  const t = messages.metadata.join;

  return {
    title: t.title,
    description: t.description,
    keywords: [
      "Join MIT Hungary",
      "Volunteer for Muslim Youth Society",
      "Become an active member MIT",
      "Muszlim Ifjúság Társaság önkéntesség",
      "Muslim community involvement Budapest",
      "Volunteer opportunities for students",
      "Islamic community service Hungary",
      "Join Muslim youth group",
    ],
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://mit-hu.vercel.app/${locale}/join-mit`,
      siteName: "MIT - Muszlim Ifjúság Társaság",
      images: [
        {
          url: "/imgs/mit-pecs.jpg",
          width: 1200,
          height: 630,
          alt: "Join MIT Hungary Community",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/imgs/one-year-mit.jpg"],
    },
    icons: {
      icon: [{ url: "/imgs/icon.jpg" }],
      apple: [{ url: "/imgs/icon.jpg" }],
    },
  };
}

export default function JoinMITLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
