import { HiLocationMarker } from "react-icons/hi";
import { EventData } from "@/lib/types";

interface LocationSectionProps {
  location?: string;
  setForm: React.Dispatch<React.SetStateAction<EventData>>;
}

export default function LocationSection({
  location,
  setForm,
}: LocationSectionProps) {
  return (
    <div className="pt-6 border-t border-gray-100 bg-gray-50 p-6 rounded-2xl">
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
        <HiLocationMarker className="text-red-500" /> Map Location (Optional)
      </label>
      <input
        type="text"
        value={location || ""}
        onChange={(e) =>
          setForm((prev: EventData) => ({ ...prev, location: e.target.value }))
        }
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
        placeholder="Paste Google Maps link or Embed URL"
      />
      <p className="text-[12px] text-gray-400 mt-1">
        Tip: For best results, use the &quot;Embed map&quot; URL from Google
        Maps sharing.
      </p>
    </div>
  );
}
