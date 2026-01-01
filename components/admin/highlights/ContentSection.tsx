import { HiExclamation } from "react-icons/hi";
import { HighlightData } from "@/lib/types";

interface ContentSectionProps {
  title_en: string;
  desc_en: string;
  note_en: string;
  title_hu: string;
  desc_hu: string;
  note_hu: string;
  setForm: React.Dispatch<React.SetStateAction<HighlightData>>;
}

export default function ContentSection({
  title_en,
  desc_en,
  note_en,
  title_hu,
  desc_hu,
  note_hu,
  setForm,
}: ContentSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
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
        <div>
          <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
            <HiExclamation className="text-amber-500" /> Note (Optional)
          </label>
          <input
            value={note_en}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, note_en: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-500 outline-none text-sm"
            placeholder="e.g. Additional information"
          />
        </div>
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
        <div>
          <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
            <HiExclamation className="text-amber-500" /> Megjegyzés (Opcionális)
          </label>
          <input
            value={note_hu}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, note_hu: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-500 outline-none text-sm"
            placeholder="pl. További információ"
          />
        </div>
      </div>
    </div>
  );
}
