import { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import EventClientPage from "@/components/Events/EventClientPage";

// Direct database helper for Server-Side use
async function getEventServerSide(identifier: string) {
  await dbConnect();

  let event = await Event.findOne({ slug: identifier }).lean();

  if (!event && isValidObjectId(identifier)) {
    event = await Event.findById(identifier).lean();
  }

  if (!event) return null;

  return JSON.parse(JSON.stringify(event));
}

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = rawLocale === "hu" ? "hu" : "en";

  const event = await getEventServerSide(id);

  if (!event) {
    return { title: "Event Not Found" };
  }

  const title = locale === "hu" ? event.title_hu : event.title_en;
  return {
    title: title,
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
