import Image from "next/image";
import {
  HiPencil,
  HiTrash,
  HiStatusOnline,
  HiPhotograph,
} from "react-icons/hi";
import { useHighlights } from "@/app/hooks/useHighlights";
import { HighlightListProps } from "@/lib/types";

export default function HighlightList({
  highlights,
  onEdit,
}: HighlightListProps) {
  const { handleDelete } = useHighlights();

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-bold text-ink-800">
        Active Highlights ({highlights.length})
      </h2>
      <div className="grid gap-4">
        {highlights.map((highlight) => (
          <div
            key={highlight._id || highlight.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-ink-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex gap-4 items-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ink-100 shrink-0">
                {highlight.images && highlight.images.length > 0 ? (
                  <>
                    <Image
                      src={highlight.images[0]}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    {highlight.images.length > 1 && (
                      <div className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {highlight.images.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <HiPhotograph className="w-6 h-6 text-ink-300" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-ink-900">
                  {highlight.title_en}
                </h3>
                <p className="text-sm text-ink-500 line-clamp-1 max-w-md">
                  {highlight.desc_en}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {highlight.images && highlight.images.length > 0 && (
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 border border-blue-100">
                      <HiPhotograph className="text-xs" />{" "}
                      {highlight.images.length} image
                      {highlight.images.length > 1 ? "s" : ""}
                    </span>
                  )}

                  {highlight.status && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 border ${
                        highlight.status === "active"
                          ? "text-green-600 bg-green-50 border-green-100"
                          : highlight.status === "archived"
                          ? "text-ink-600 bg-ink-50 border-ink-100"
                          : "text-amber-600 bg-amber-50 border-amber-100"
                      }`}
                    >
                      <HiStatusOnline /> {highlight.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
              <button
                onClick={() => onEdit(highlight)}
                className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <HiPencil className="text-lg" />
              </button>
              <button
                onClick={() => handleDelete(highlight._id || highlight.id!)}
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
