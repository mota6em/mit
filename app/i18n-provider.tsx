"use client";

import { usePathname } from "next/navigation";
import { IntlProvider } from "next-intl";

export default function I18nProvider({ children, messages, locale }: any) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
}
