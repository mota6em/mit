import { Metadata } from "next";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { isValidObjectId } from "mongoose";
import Link from "next/link"; 

// Simple dictionary for static UI text
const dictionary = {
  en: {
    back: "Back to Home",
    notFoundTitle: "Event Not Found",
    notFoundDesc: "This event may have been removed or the link is incorrect.",
    dateLabel: "Date",
    loading: "Loading...",
  },
  hu: {
    back: "Vissza a főoldalra",
    notFoundTitle: "Esemény nem található",
    notFoundDesc: "Ez az esemény törölve lett, vagy a link helytelen.",
    dateLabel: "Dátum",
    loading: "Betöltés...",
  },
};

// Helper to fetch single event from MongoDB
async function getEvent(id: string) {
  await dbConnect();
  if (!isValidObjectId(id)) return null;
  const event = await Event.findById(id).lean();
  return event;
}

// Update Props to include 'locale'
type Props = {
  params: { id: string; locale: string };
};

// --- GENERATE METADATA (SEO) ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.id);
  const locale = params.locale === "hu" ? "hu" : "en";

  if (!event) {
    return {
      title: dictionary[locale].notFoundTitle,
    };
  }

  // Dynamic SEO based on language
  return {
    title: locale === "hu" ? event.title_hu : event.title_en,
    description: locale === "hu" ? event.desc_hu : event.desc_en,
    openGraph: {
      title: locale === "hu" ? event.title_hu : event.title_en,
      description: locale === "hu" ? event.desc_hu : event.desc_en,
      images: [event.img],
    },
  };
}

// --- THE PAGE UI ---
export default async function EventPage({ params }: Props) {
  const event = await getEvent(params.id);

  const locale = params.locale === "hu" ? "hu" : "en";
  const labels = dictionary[locale];

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500 font-sans">
        <h1 className="text-4xl font-bold mb-4">{labels.notFoundTitle}</h1>
        <p className="mb-8 text-center px-4">{labels.notFoundDesc}</p>
        <Link
          href={`/${locale}`}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition"
        >
          {labels.back}
        </Link>
      </div>
    );
  }

  const title = locale === "hu" ? event.title_hu : event.title_en;
  const description = locale === "hu" ? event.desc_hu : event.desc_en;

  const dateFormatted = new Date(event.date).toLocaleDateString(
    locale === "hu" ? "hu-HU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64 md:h-96 w-full bg-gray-200">
          {event.img ? (
            <Image
              src={event.img}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}

          {/* Back Button Overlay */}
          <Link
            href={`/${locale}`}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
              {labels.dateLabel}: {dateFormatted}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 bg-gray-50 p-6 rounded-2xl leading-relaxed text-lg shadow-sm border border-gray-100 whitespace-pre-wrap">
              {description}
            </p>
          </div>

          <div className="mt-10 text-center border-t pt-8">
            <Link
              href={`/${locale}`} 
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-blue-500/30"
            >
              {labels.back}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
