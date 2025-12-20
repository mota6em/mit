// components/Events/EventMap.tsx
import { HiLocationMarker } from "react-icons/hi";

interface EventMapProps {
  location?: string;
}

export function EventMap({ location }: EventMapProps) {
  if (!location) return null;

  let mapUrl = location.trim();

  // Extract URL if the user pasted a full <iframe> tag
  const iframeRegex = /src=["']([^"']+)["']/;
  const match = mapUrl.match(iframeRegex);
  if (match && match[1]) {
    mapUrl = match[1];
  }

  // Identify if it's an embeddable Google Maps URL
  const isEmbed =
    mapUrl.includes("google.com/maps/embed") ||
    mapUrl.includes("maps.google.com");

  return (
    <div className="mt-12 space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <HiLocationMarker className="text-red-500 w-6 h-6" /> Location
      </h3>

      {isEmbed ? (
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-border">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="p-6 bg-secondary rounded-2xl border border-border">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-lg"
          >
            Open in Google Maps <HiLocationMarker className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}
