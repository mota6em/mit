import I18nProvider from "../i18n-provider";
import { notFound } from "next/navigation";
import "../globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hu" }];
}

export const metadata: Metadata = {
  title: "MIT - Muszlim Ifjúság Társaság",
  description:
    "MIT is a student-run community built to support Muslim students in Hungary, help them connect, grow, and feel at home. We organize events, gatherings, study sessions, charity activities, and spiritual programs in a positive, respectful, and welcoming environment.",
  keywords: [
    "Muszlim Ifjúság Társaság",
    "MIT",
    "Muslim Youth Association",
    "Muslim Students Hungary",
    "Islamic Community",
    "Hungary",
    "Student Community",
  ],
  authors: [{ name: "MIT - Muszlim Ifjúság Társaság" }],
  openGraph: {
    title: "MIT - Muszlim Ifjúság Társaság",
    description:
      "MIT is a student-run community built to support Muslim students in Hungary, help them connect, grow, and feel at home. We organize events, gatherings, study sessions, charity activities, and spiritual programs.",
    type: "website",
    locale: "en_US",
    siteName: "MIT - Muszlim Ifjúság Társaság",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIT - Muszlim Ifjúság Társaság",
    description:
      "MIT is a student-run community built to support Muslim students in Hungary, help them connect, grow, and feel at home.",
  },
  icons: {
    icon: [
      { url: "/imgs/icon.jpg" },
      { url: "/imgs/icon.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/imgs/icon.jpg" }],
  },
};

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
          <div className="flex-1">{children}</div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
