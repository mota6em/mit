import { HiExclamation } from "react-icons/hi";
import { EventData } from "@/lib/types";

interface ContentSectionProps {
  title_en: string;
  desc_en: string;
  note_en: string;
  title_hu: string;
  desc_hu: string;
  note_hu: string;
  title_ar: string;
  desc_ar: string;
  note_ar: string;
  setForm: React.Dispatch<React.SetStateAction<EventData>>;
}

type Column = {
  code: "en" | "hu" | "ar";
  badge: string;
  heading: string;
  badgeClass: string;
  focusClass: string;
  titlePlaceholder: string;
  descPlaceholder: string;
  noteLabel: string;
  notePlaceholder: string;
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
    noteLabel: "Note (Optional)",
    notePlaceholder: "e.g. Hungarian speakers only",
  },
  {
    code: "hu",
    badge: "HU",
    heading: "Hungarian Content",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
    focusClass: "focus:border-green-500",
    titlePlaceholder: "Cím",
    descPlaceholder: "Leírás...",
    noteLabel: "Megjegyzés (Opcionális)",
    notePlaceholder: "pl. Csak magyar nyelven",
  },
  {
    code: "ar",
    badge: "AR",
    heading: "Arabic Content — falls back to English if empty",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    focusClass: "focus:border-amber-500",
    titlePlaceholder: "العنوان",
    descPlaceholder: "الوصف...",
    noteLabel: "ملاحظة (اختياري)",
    notePlaceholder: "مثال: باللغة المجرية فقط",
    optional: true,
  },
];

export default function ContentSection(props: ContentSectionProps) {
  const { setForm } = props;

  const values: Record<Column["code"], { title: string; desc: string; note: string }> =
    {
      en: { title: props.title_en, desc: props.desc_en, note: props.note_en },
      hu: { title: props.title_hu, desc: props.desc_hu, note: props.note_hu },
      ar: { title: props.title_ar, desc: props.desc_ar, note: props.note_ar },
    };

  return (
    <div className="grid gap-8 border-t border-gray-100 pt-4 md:grid-cols-2 xl:grid-cols-3">
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

            <div>
              <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-gray-700">
                <HiExclamation className="text-amber-500" /> {column.noteLabel}
              </label>
              <input
                dir={rtl ? "rtl" : "ltr"}
                value={value.note}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [`note_${column.code}`]: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:border-amber-500"
                placeholder={column.notePlaceholder}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
