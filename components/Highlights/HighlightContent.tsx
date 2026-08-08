"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { HighlightContentProps } from "@/lib/types";

export default function HighlightContent({
  title,
  description,
  ctaLabel,
  variants,
  children,
}: HighlightContentProps) {
  return (
    <motion.div
      variants={variants}
      className="relative p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1 z-20"
    >
      {children}

      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-ink-900 mb-4 leading-tight tracking-tight">
        {title}
      </h3>

      <p className="text-ink-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      <div className="group/btn inline-flex items-center gap-3 w-fit">
        <span className="relative inline-flex items-center gap-2 px-4 py-2 bg-ink-800 text-white rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:bg-ink-700 hover:shadow-lg hover:shadow-ink-900/25">
          <span className="relative z-10">{ctaLabel}</span>
          <FaArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
          <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      </div>
    </motion.div>
  );
}
