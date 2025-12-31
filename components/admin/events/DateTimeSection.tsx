import { HiClock, HiRefresh } from "react-icons/hi";
import { DAYS_OF_WEEK } from "@/data/constants/const";
import { EventData } from "@/lib/types";

interface DateTimeSectionProps {
  isRecurring: boolean;
  date?: string;
  time?: string;
  recurringDays: string[];
  setForm: React.Dispatch<React.SetStateAction<EventData>>;
}

export default function DateTimeSection({
  isRecurring,
  date,
  time,
  recurringDays,
  setForm,
}: DateTimeSectionProps) {
  const toggleDay = (day: string) => {
    setForm((prev) => {
      const currentDays = prev.recurringDays || [];
      if (currentDays.includes(day)) {
        return { ...prev, recurringDays: currentDays.filter((d) => d !== day) };
      } else {
        return { ...prev, recurringDays: [...currentDays, day] };
      }
    });
  };

  return (
    <div className="pt-6 border-t border-gray-100 bg-gray-50 p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <HiClock className="text-blue-600" /> Date & Time Settings
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer group w-fit">
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                isRecurring ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  isRecurring ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={isRecurring}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isRecurring: e.target.checked }))
              }
            />
            <span className="font-bold text-gray-700 flex items-center gap-2">
              <HiRefresh
                className={isRecurring ? "text-blue-600" : "text-gray-400"}
              />
              Weekly / Recurring Event
            </span>
          </label>
        </div>

        {!isRecurring && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Event Date (Start Date)
            </label>
            <input
              type="date"
              required
              value={date || ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, date: e.target.value }))
              }
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none bg-white"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Time (Optional)
          </label>
          <input
            type="time"
            value={time || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, time: e.target.value }))
            }
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none bg-white"
          />
        </div>
      </div>

      {isRecurring && (
        <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm font-bold text-blue-800 mb-3">
            Select Repeating Days:
          </p>
          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = recurringDays?.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
