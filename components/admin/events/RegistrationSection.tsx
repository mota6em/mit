import { HiLink } from "react-icons/hi";
import { EventData } from "@/lib/types";

interface RegistrationSectionProps {
  registrationUrl?: string;
  setForm: React.Dispatch<React.SetStateAction<EventData>>;
}

export default function RegistrationSection({
  registrationUrl,
  setForm,
}: RegistrationSectionProps) {
  return (
    <div className="pt-6 border-t border-gray-100 bg-gray-50 p-6 rounded-2xl">
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
        <HiLink className="text-blue-500" /> Registration Form Link (Optional)
      </label>
      <input
        type="url"
        value={registrationUrl || ""}
        onChange={(e) =>
          setForm((prev: EventData) => ({
            ...prev,
            registrationUrl: e.target.value,
          }))
        }
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
        placeholder="https://..."
      />
      <p className="text-[12px] text-gray-400 mt-1">
        If provided, a &quot;Register Now&quot; button will appear on the event
        page.
      </p>
    </div>
  );
}
