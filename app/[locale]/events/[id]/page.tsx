import { Metadata } from "next";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";

// Helper to fetch single event for Server Component
async function getEvent(id: string) {
  const filePath = path.join(process.cwd(), "data/events.json");
  if (!fs.existsSync(filePath)) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const events = JSON.parse(file);
  return events.find((e: any) => e.id === id);
}

type Props = {
  params: { id: string };
};

//  GENERATE METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEvent(params.id);

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title_en,
    description: event.desc_en,
    openGraph: {
      title: event.title_en,
      description: event.desc_en,
      images: [event.img],
    },
  };
}

//  THE PAGE UI
export default async function EventSharedPage({ params }: Props) {
  const event = await getEvent(params.id);

  if (!event) {
    return <div className="p-20 text-center">Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative h-80 w-full">
          <Image
            src={event.img}
            alt={event.title_en}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">
            {event.title_en} / {event.title_hu}
          </h1>
          <p className="text-gray-500 mb-6">{event.date}</p>
          <div className="space-y-4">
            <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
              {event.desc_en}
            </p>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-xl italic">
              {event.desc_hu}
            </p>
          </div>
          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-bold"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
