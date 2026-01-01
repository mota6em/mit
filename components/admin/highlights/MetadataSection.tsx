import { HighlightData } from "@/lib/types";

interface MetadataSectionProps {
  year: string;
  category: string;
  setForm: React.Dispatch<React.SetStateAction<HighlightData>>;
}

export default function MetadataSection({
  year,
  category,
  setForm,
}: MetadataSectionProps) {
  return (
    <div className="pt-4 border-t border-gray-100">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
        Metadata (Optional)
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          value={year}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, year: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
          placeholder="Year (e.g. 2025)"
        />
        <input
          value={category}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
          placeholder="Category (e.g. Achievement)"
        />
      </div>
    </div>
  );
}
