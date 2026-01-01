"use client";

type SectionTagColor = "green" | "gold" | "blue" | "gray";

interface SectionTagProps {
  text: string;
  color?: SectionTagColor;
}

export const SectionTag = ({ text, color = "blue" }: SectionTagProps) => {
  const colorClasses: Record<SectionTagColor, string> = {
    green: "bg-green-100 text-green-600",
    gold: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 ${colorClasses[color]}`}
    >
      {text}
    </div>
  );
};
