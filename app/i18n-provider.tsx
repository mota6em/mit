"use client";

import { usePathname } from "next/navigation";
import { IntlProvider } from "next-intl";

export default function I18nProvider({ children, messages }: any) {
  return <IntlProvider messages={messages}>{children}</IntlProvider>;
}
