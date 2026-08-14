import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mit-hu.eu"
).replace(/\/$/, "");

export const SITE_NAME = "MIT — Muszlim Ifjúság Társaság";

export const SITE_SHORT_NAME = "MIT";

export const SITE_LEGAL_NAME = "Muszlim Ifjúság Társaság";

export const SITE_ALTERNATE_NAMES = [
  "MIT",
  "MIT Hungary",
  "MIT Magyarország",
  "Muszlim Ifjúság Társaság",
  "Muslim Youth Association of Hungary",
  "جمعية الشباب المسلم في المجر",
];

export const TITLE_SUFFIX: Record<Locale, string> = {
  en: "MIT Hungary",
  hu: "MIT Magyarország",
  ar: "MIT المجر",
};

export const CONTACT_EMAIL = "muszlimifjusag@gmail.com";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/muszlimifjusag/",
  "https://www.instagram.com/muszlimifjusag/",
  "https://www.youtube.com/@muszlimifjusagitarsasag/",
];

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BRAND_LOGO = "/imgs/icons/mit-logo-full-resized.png";

export const DEFAULT_OG_IMAGE = "/imgs/community/mosque-talk.jpg";

/** Search engines cut descriptions around 160 characters; give them a clean cut. */
export function metaDescription(text: string, limit = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;

  const cut = clean.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Canonical plus the full hreflang cluster for one page. `path` is the part
 * after the locale segment, e.g. "/events" or "" for a locale home page.
 */
export function localeAlternates(locale: Locale, path = "") {
  const suffix = path && !path.startsWith("/") ? `/${path}` : path;

  const languages: Record<string, string> = {};
  for (const code of LOCALES) {
    languages[code] = `${SITE_URL}/${code}${suffix}`;
  }
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${suffix}`;

  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  };
}

export function organizationJsonLd() {
  return {
    "@type": "NGO",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(BRAND_LOGO),
      caption: SITE_NAME,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "volunteering",
      email: CONTACT_EMAIL,
      availableLanguage: ["en", "hu", "ar"],
    },
    areaServed: {
      "@type": "Country",
      name: "Hungary",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
    knowsLanguage: ["en", "hu", "ar"],
    nonprofitStatus: "NonprofitANBI",
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: [...LOCALES],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
