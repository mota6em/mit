import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { isLocale, localeFromAcceptLanguage } from "@/lib/i18n";

export default async function RootPage() {
  const saved = (await cookies()).get("lang")?.value;

  if (isLocale(saved)) redirect(`/${saved}`);

  const acceptLanguage = (await headers()).get("accept-language");
  redirect(`/${localeFromAcceptLanguage(acceptLanguage)}`);
}
