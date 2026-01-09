import { HighlightData } from "@/lib/types";
import { HiCalendar } from "react-icons/hi";

interface ContentSectionProps {
  title_en: string;
  desc_en: string;
  title_hu: string;
  desc_hu: string;
  date?: string;
  setForm: React.Dispatch<React.SetStateAction<HighlightData>>;
}

export default function ContentSection({
  title_en,
  desc_en,
  title_hu,
  desc_hu,
  date,
  setForm,
}: ContentSectionProps) {
  // Format date for input (YYYY-MM-DD format)
  const formattedDate = date ? new Date(date).toISOString().split("T")[0] : "";

  return (
    <div className="space-y-6 pt-4 border-t border-gray-100">
      {/* Date Field */}
      <div className="max-w-xs">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <HiCalendar className="w-4 h-4" />
          Publication Date
        </label>
        <input
          type="date"
          value={formattedDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          Leave empty to use creation date
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* English Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
              EN
            </span>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              English Content
            </h3>
          </div>
          <input
            required
            value={title_en}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title_en: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
            placeholder="Title"
          />
          <textarea
            required
            rows={4}
            value={desc_en}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, desc_en: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none resize-none"
            placeholder="Description..."
          />
        </div>

        {/* Hungarian Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
              HU
            </span>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Hungarian Content
            </h3>
          </div>
          <input
            required
            value={title_hu}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title_hu: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none"
            placeholder="Cím"
          />
          <textarea
            required
            rows={4}
            value={desc_hu}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, desc_hu: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 outline-none resize-none"
            placeholder="Leírás..."
          />
        </div>
      </div>
    </div>
  );
}
