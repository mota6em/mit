import I18nProvider from "../i18n-provider";
import { notFound } from "next/navigation";
import "../globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";

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
