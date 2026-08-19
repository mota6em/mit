import { HighlightData } from "@/lib/types";
import { HiCalendar } from "react-icons/hi";

interface ContentSectionProps {
  title_en: string;
  desc_en: string;
  title_hu: string;
  desc_hu: string;
  title_ar: string;
  desc_ar: string;
  date?: string;
  setForm: React.Dispatch<React.SetStateAction<HighlightData>>;
}

type Column = {
  code: "en" | "hu" | "ar";
  badge: string;
  heading: string;
  badgeClass: string;
  focusClass: string;
  titlePlaceholder: string;
  descPlaceholder: string;
  optional?: boolean;
};

const COLUMNS: Column[] = [
  {
    code: "en",
    badge: "EN",
    heading: "English Content",
    badgeClass: "bg-gray-100 text-gray-600 border-gray-200",
    focusClass: "focus:border-blue-500",
    titlePlaceholder: "Title",
    descPlaceholder: "Description...",
  },
  {
    code: "hu",
    badge: "HU",
    heading: "Hungarian Content",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
    focusClass: "focus:border-green-500",
    titlePlaceholder: "Cím",
    descPlaceholder: "Leírás...",
  },
  {
    code: "ar",
    badge: "AR",
    heading: "Arabic Content — falls back to English if empty",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    focusClass: "focus:border-amber-500",
    titlePlaceholder: "العنوان",
    descPlaceholder: "الوصف...",
    optional: true,
  },
];

export default function ContentSection(props: ContentSectionProps) {
  const { date, setForm } = props;

  const formattedDate = date ? new Date(date).toISOString().split("T")[0] : "";

  const values: Record<Column["code"], { title: string; desc: string }> = {
    en: { title: props.title_en, desc: props.desc_en },
    hu: { title: props.title_hu, desc: props.desc_hu },
    ar: { title: props.title_ar, desc: props.desc_ar },
  };

  return (
    <div className="space-y-6 border-t border-gray-100 pt-4">
      <div className="max-w-xs">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
          <HiCalendar className="h-4 w-4" />
          Publication Date
        </label>
        <input
          type="date"
          value={formattedDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, date: e.target.value }))
          }
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-400">
          Leave empty to use creation date
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {COLUMNS.map((column) => {
          const value = values[column.code];
          const rtl = column.code === "ar";

          return (
            <div key={column.code} className="space-y-4">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`rounded border px-2 py-0.5 text-[10px] font-bold ${column.badgeClass}`}
                >
                  {column.badge}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  {column.heading}
                </h3>
              </div>

              <input
                required={!column.optional}
                dir={rtl ? "rtl" : "ltr"}
                value={value.title}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [`title_${column.code}`]: e.target.value,
                  }))
                }
                className={`w-full rounded-xl border border-gray-200 px-4 py-3 outline-none ${column.focusClass}`}
                placeholder={column.titlePlaceholder}
              />

              <textarea
                required={!column.optional}
                rows={4}
                dir={rtl ? "rtl" : "ltr"}
                value={value.desc}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [`desc_${column.code}`]: e.target.value,
                  }))
                }
                className={`w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none ${column.focusClass}`}
                placeholder={column.descPlaceholder}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
