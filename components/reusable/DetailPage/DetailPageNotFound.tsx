"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import type { DetailPageNotFoundProps } from "@/lib/types";

export function DetailPageNotFound({
  title,
  description,
  backHref,
  backLabel,
}: DetailPageNotFoundProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ink-100 flex items-center justify-center">
          <span className="text-2xl">📭</span>
        </div>
        <h1 className="text-2xl font-semibold text-ink-900 mb-3">{title}</h1>
        <p className="text-ink-500 mb-8">{description}</p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-900 text-white rounded-full text-sm font-medium hover:bg-ink-800 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </motion.div>
    </div>
  );
}
