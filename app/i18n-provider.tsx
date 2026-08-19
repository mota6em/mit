"use client";

import { IntlProvider } from "next-intl";
import type { ReactNode } from "react";

/**
 * MIT is a Hungary-based organisation, so all dates and times are expressed in
 * Budapest time. Without an explicit zone, formatting falls back to whatever
 * the runtime happens to be — the server renders one string, the visitor's
 * browser renders another, and React throws the markup away and re-renders.
 */
const TIME_ZONE = "Europe/Budapest";

export default function I18nProvider({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}) {
  return (
    <IntlProvider messages={messages} locale={locale} timeZone={TIME_ZONE}>
      {children}
    </IntlProvider>
  );
}
