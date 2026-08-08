import I18nProvider from "../i18n-provider";
import { notFound } from "next/navigation";
import "../globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { SWRProvider } from "@/components/providers/SWRProvider";

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
          <SWRProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to content
            </a>
            <NavBar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </SWRProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
