import { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import EventClientPage from "@/components/Events/EventClientPage";

async function getEvent(id: string) {
  await dbConnect();
  if (!isValidObjectId(id)) return null;
  const event = await Event.findById(id).lean();
  if (!event) return null;

  // Convert MongoDB Objects to plain strings for Client Component
  return {
    ...event,
    _id: event._id.toString(),
    date: event.date.toISOString ? event.date.toISOString() : event.date,
  };
}

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

  const event: any = await getEvent(id);

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
  const event = await getEvent(id);

  // Pass the event data to the client component
  return <EventClientPage initialEvent={event} />;
}
