import Image from "next/image";
import {
  HiPencil,
  HiTrash,
  HiCalendar,
  HiClock,
  HiRefresh,
  HiExclamation,
} from "react-icons/hi";
import { useEvents } from "../../hooks/useEvents";
import { ApiEvent } from "@/lib/types";

interface EventData extends Omit<ApiEvent, "_id" | "slug"> {
  _id?: string; // Make _id optional for form state
}

interface EventListProps {
  events: EventData[];
  onEdit: (event: EventData) => void;
}

export default function EventList({ events, onEdit }: EventListProps) {
  const { handleDelete } = useEvents();

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-bold text-ink-800">
        Active Events ({events.length})
      </h2>
      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event._id || event.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-ink-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ink-100 shrink-0">
                {event.img && (
                  <Image src={event.img} alt="" fill className="object-cover" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-ink-900">{event.title_en}</h3>

                <div className="flex flex-wrap gap-2 mt-1">
                  {/* Show date only if NOT recurring */}
                  {!event.isRecurring && event.date && (
                    <span className="text-xs font-semibold text-ink-500 bg-ink-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <HiCalendar /> {event.date}
                    </span>
                  )}

                  {event.time && (
                    <span className="text-xs font-semibold text-ink-500 bg-ink-100 px-2 py-0.5 rounded flex items-center gap-1">
                      <HiClock /> {event.time}
                    </span>
                  )}

                  {event.isRecurring && (
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 border border-blue-100">
                      <HiRefresh />{" "}
                      {event.recurringDays
                        ?.map((d) => d.slice(0, 3))
                        .join(", ")}
                    </span>
                  )}
                </div>

                {(event.note_en || event.note_hu) && (
                  <div className="flex gap-2 mt-1">
                    {event.note_en && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                        <HiExclamation /> EN: {event.note_en}
                      </span>
                    )}
                    {event.note_hu && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                        <HiExclamation /> HU: {event.note_hu}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
              <button
                onClick={() => onEdit(event)}
                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <HiPencil className="text-lg" />
              </button>
              <button
                onClick={() => handleDelete(event._id || event.id!)}
                className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <HiTrash className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
