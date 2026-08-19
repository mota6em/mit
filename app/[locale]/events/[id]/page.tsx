import type { Metadata } from "next";

import EventClientPage from "@/components/Events/EventClientPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  getEventServerSide,
  getEventMetadata,
  getAllEvents,
} from "@/lib/eventService";
import { LOCALE_META, localizedField, toLocale } from "@/lib/i18n";
import {
  ORGANIZATION_ID,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  breadcrumbJsonLd,
  graph,
  metaDescription,
  localeAlternates,
} from "@/lib/seo";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events
    .map((event) => ({ id: event.slug || event._id }))
    .filter((param): param is { id: string } => Boolean(param.id));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const event = await getEventMetadata(id);

  if (!event) return { title: "Event not found" };

  const title = localizedField(event, "title", locale);
  const description = localizedField(event, "desc", locale);
  const image = event.img || DEFAULT_OG_IMAGE;
  const alternates = localeAlternates(locale, `/events/${event.slug || id}`);

  return {
    title,
    description: metaDescription(description),
    alternates,
    openGraph: {
      type: "article",
      title,
      description: metaDescription(description),
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: LOCALE_META[locale].openGraph,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription(description),
      images: [image],
    },
  };
}

function startDateOf(date?: string, time?: string) {
  if (!date) return undefined;
  const day = date.slice(0, 10);
  return time ? `${day}T${time}` : day;
}

const BUDAPEST_PLACE = {
  "@type": "Place",
  name: "Budapest, Hungary",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Budapest",
    addressCountry: "HU",
  },
};

function placeOf(location?: string) {
  const name = location?.trim();
  if (!name || name.includes("<") || name.length > 120) return BUDAPEST_PLACE;

  return {
    "@type": "Place",
    name,
    address: {
      "@type": "PostalAddress",
      streetAddress: name,
      addressLocality: "Budapest",
      addressCountry: "HU",
    },
  };
}

export default async function EventPageServer({ params }: Props) {
  const { id, locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const event = await getEventServerSide(id);

  if (!event) return <EventClientPage initialEvent={null} />;

  const title = localizedField(event, "title", locale);
  const description = localizedField(event, "desc", locale);
  const url = localeAlternates(locale, `/events/${event.slug || id}`).canonical;
  const startDate = startDateOf(event.date, event.time);

  const nodes: object[] = [
    breadcrumbJsonLd([
      { name: SITE_NAME, path: `/${locale}` },
      { name: "Events", path: `/${locale}/events` },
      { name: title, path: `/${locale}/events/${event.slug || id}` },
    ]),
  ];

  if (startDate) {
    nodes.push({
      "@type": "Event",
      name: title,
      description,
      url,
      startDate,
      image: event.img ? [absoluteUrl(event.img)] : undefined,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      inLanguage: locale,
      location: placeOf(event.location),
      organizer: { "@id": ORGANIZATION_ID },
      isAccessibleForFree: true,
      offers: event.registrationUrl
        ? {
            "@type": "Offer",
            url: event.registrationUrl,
            price: 0,
            priceCurrency: "HUF",
            availability: "https://schema.org/InStock",
          }
        : undefined,
    });
  }

  return (
    <>
      <JsonLd data={graph(nodes)} />
      <EventClientPage initialEvent={event} />
    </>
  );
}
