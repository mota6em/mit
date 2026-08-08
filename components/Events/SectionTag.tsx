"use client";

type SectionTagColor = "green" | "gold" | "blue" | "gray";

interface SectionTagProps {
  text: string;
  color?: SectionTagColor;
}

export const SectionTag = ({ text, color = "blue" }: SectionTagProps) => {
  const colorClasses: Record<SectionTagColor, string> = {
    green: "bg-brand-green-soft text-brand-green-dark",
    gold: "bg-brand-gold-soft text-brand-gold-dark",
    blue: "bg-brand-sky-soft text-brand-sky",
    gray: "bg-ink-100 text-ink-600",
  };

  return (
    <div
      className={`eyebrow mb-6 inline-block rounded-full px-4 py-1.5 ${colorClasses[color]}`}
    >
      {text}
    </div>
  );
};
