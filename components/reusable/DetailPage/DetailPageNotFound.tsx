"use client";

import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import Reveal from "@/components/reusable/Reveal";
import type { DetailPageNotFoundProps } from "@/lib/types";

export function DetailPageNotFound({
  title,
  description,
  backHref,
  backLabel,
}: DetailPageNotFoundProps) {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-paper px-5">
      <div className="pattern-star mask-radial pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />

      <Reveal y={20} className="relative max-w-md text-center">
        <span className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-2xl border border-ink-200 bg-white text-ink-400">
          <SearchX className="h-7 w-7" />
        </span>

        <h1 className="display display-5 text-ink-900">{title}</h1>
        <p className="lede mt-4">{description}</p>

        <Link href={backHref} className="btn btn-ink btn-sheen group mt-9">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100" />
          {backLabel}
        </Link>
      </Reveal>
    </div>
  );
}
