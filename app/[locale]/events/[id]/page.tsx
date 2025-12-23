import { Metadata, ResolvingMetadata } from "next";
import EventClientPage from "@/components/Events/EventClientPage";
import { getEvents } from "@/lib/eventService";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

// --- GENERATE METADATA (SEO) ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = rawLocale === "hu" ? "hu" : "en";

  const event: any = await getEvents(id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  //  Prepare Metadata
  const title = locale === "hu" ? event.title_hu : event.title_en;
  const description = locale === "hu" ? event.desc_hu : event.desc_en;

  const previousImages = (await parent).openGraph?.images || [];
  const eventImages = event.img
    ? [event.img]
    : ["/imgs/icons/icon.jpg", ...previousImages];

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: eventImages,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: eventImages,
    },
  };
}

// --- MAIN SERVER COMPONENT ---
export default async function EventPageServer({ params }: Props) {
  const { id } = await params;
  const event = await getEvents(id);

  // Pass the event data to the client component
  return <EventClientPage initialEvent={event} />;
}
