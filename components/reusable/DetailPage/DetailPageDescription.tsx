"use client";

import type { DetailPageDescriptionProps } from "@/lib/types";

export function DetailPageDescription({
  description,
}: DetailPageDescriptionProps) {
  return (
    <section className="prose-body whitespace-pre-wrap text-[1.02rem] leading-[1.8]">
      {description}
    </section>
  );
}
