import I18nProvider from "../i18n-provider";
import { notFound } from "next/navigation";
import "../globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    return { title: "MIT" };
  }

  const t = messages.metadata;

  return {
    title: t.root.title,
    description: t.root.description,
    keywords: t.root.keywords,
    authors: [{ name: "MIT - Muszlim Ifjúság Társaság" }],

    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        hu: "/hu",
      },
    },

    openGraph: {
      title: t.root.title,
      description: t.root.description,
      type: "website",
      locale: locale === "hu" ? "hu_HU" : "en_US",
      siteName: "MIT - Muszlim Ifjúság Társaság",
    },

    twitter: {
      card: "summary_large_image",
      title: t.root.title,
      description: t.root.description,
    },

    icons: {
      icon: [{ url: "/imgs/icons/icon.jpg" }],
      apple: [{ url: "/imgs/icons/icon.jpg" }],
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hu" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
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
