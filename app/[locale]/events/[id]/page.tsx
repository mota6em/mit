import { Metadata } from "next";
import EventClientPage from "@/components/Events/EventClientPage";
import { getEventServerSide, getEventMetadata } from "@/lib/eventService";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = rawLocale === "hu" ? "hu" : "en";

  // Use optimized metadata query (fetches only needed fields)
  const event = await getEventMetadata(id);

  if (!event) return { title: "Event Not Found | MIT" };

  const title = locale === "hu" ? event.title_hu : event.title_en;
  return {
    title: `${title} | MIT`,
    description: locale === "hu" ? event.desc_hu : event.desc_en,
    openGraph: {
      title,
      images: event.img ? [event.img] : ["/imgs/icons/icon.jpg"],
    },
  };
}

export default async function EventPageServer({ params }: Props) {
  const { id } = await params;
  const event = await getEventServerSide(id);

  return <EventClientPage initialEvent={event} />;
}
