import I18nProvider from "../i18n-provider";
import { notFound } from "next/navigation";
import "../globals.css";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hu" }];
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
      <body>
        <I18nProvider messages={messages} locale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
