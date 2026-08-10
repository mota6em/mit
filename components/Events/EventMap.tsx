import { MapPin } from "lucide-react";

import { mapSource, placeLabel } from "@/lib/eventTime";

interface EventMapProps {
  location?: string;
}

export function EventMap({ location }: EventMapProps) {
  const source = mapSource(location);
  const place = placeLabel(location);

  if (!source && !place) return null;

  const isEmbed =
    !!source &&
    (source.includes("google.com/maps/embed") ||
      source.includes("maps.google.com"));

  if (isEmbed) {
    return (
      <div className="surface relative overflow-hidden rounded-[1.5rem]">
        <span className="pointer-events-none absolute start-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-brand-gold-dark shadow-[0_4px_12px_rgba(18,22,15,0.18)]">
          <MapPin className="h-5 w-5" />
        </span>
        <iframe
          src={source}
          title="Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[22rem] w-full md:h-[26rem]"
        />
      </div>
    );
  }

  return (
    <div className="surface flex items-center gap-3 rounded-[1.5rem] px-6 py-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gold-soft text-brand-gold-dark">
        <MapPin className="h-5 w-5" />
      </span>

      {source ? (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-semibold text-ink-800 transition-colors hover:text-brand-green-dark"
        >
          {place ?? source}
        </a>
      ) : (
        <span className="font-semibold text-ink-800">{place}</span>
      )}
    </div>
  );
}
