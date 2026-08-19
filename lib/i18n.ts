export const LOCALES = ["en", "hu", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type LocaleMeta = {
  dir: "ltr" | "rtl";
  intl: string;
  openGraph: string;
  nativeName: string;
  shortLabel: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    dir: "ltr",
    intl: "en-US",
    openGraph: "en_US",
    nativeName: "English",
    shortLabel: "EN",
  },
  hu: {
    dir: "ltr",
    intl: "hu-HU",
    openGraph: "hu_HU",
    nativeName: "Magyar",
    shortLabel: "HU",
  },
  ar: {
    dir: "rtl",
    intl: "ar-u-nu-latn",
    openGraph: "ar_AR",
    nativeName: "العربية",
    shortLabel: "AR",
  },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function localeFromPathname(pathname: string): Locale {
  return toLocale(pathname.split("/")[1]);
}

export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        quality: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}

export function localeDir(locale: Locale): "ltr" | "rtl" {
  return LOCALE_META[locale].dir;
}

export function isRtl(locale: Locale): boolean {
  return LOCALE_META[locale].dir === "rtl";
}

export function localizedField(
  record: object | null | undefined,
  field: string,
  locale: Locale
): string {
  if (!record) return "";

  const source = record as Record<string, unknown>;

  const localized = source[`${field}_${locale}`];
  if (typeof localized === "string" && localized.trim()) return localized;

  const fallback = source[`${field}_${DEFAULT_LOCALE}`];
  return typeof fallback === "string" ? fallback : "";
}

export function localizedFieldOptional(
  record: object | null | undefined,
  field: string,
  locale: Locale
): string | undefined {
  const value = localizedField(record, field, locale);
  return value || undefined;
}
