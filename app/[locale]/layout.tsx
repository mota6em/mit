import { notFound } from "next/navigation";
import type { Metadata } from "next";

import I18nProvider from "../i18n-provider";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import BackToTop from "@/components/reusable/BackToTop";
import PageTransition from "@/components/reusable/PageTransition";
import RouteProgress from "@/components/reusable/RouteProgress";
import { SWRProvider } from "@/components/providers/SWRProvider";
import { LOCALE_META, LOCALES, isLocale, type Locale } from "@/lib/i18n";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TITLE_SUFFIX,
  localeAlternates,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

async function loadMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = isLocale(locale) ? await loadMessages(locale) : null;

  if (!messages) return { title: SITE_NAME };

  const t = messages.metadata.root;

  return {
    title: {
      default: t.title,
      template: `%s | ${TITLE_SUFFIX[locale as Locale]}`,
    },
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: SITE_NAME, url: "https://mit-hu.eu" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: localeAlternates(locale as Locale),
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      url: localeAlternates(locale as Locale).canonical,
      locale: LOCALE_META[locale as Locale].openGraph,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].openGraph
      ),
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const messages = await loadMessages(locale);
  if (!messages) notFound();

  const { dir } = LOCALE_META[locale];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(
            locale
          )};document.documentElement.dir=${JSON.stringify(dir)}`,
        }}
      />
      <I18nProvider messages={messages} locale={locale}>
        <SWRProvider>
          <div lang={locale} dir={dir} className="flex min-h-screen flex-col">
            <a href="#main-content" className="skip-link">
              {messages.common.skipToContent}
            </a>
            <RouteProgress />
            <NavBar />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </SWRProvider>
      </I18nProvider>
    </>
  );
}
