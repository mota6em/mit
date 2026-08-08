"use client";

import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  topText?: string;
  className?: string;
  underLine?: boolean;
  align?: "center" | "start";
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function SectionHeader({
  title,
  icon,
  topText,
  className = "",
  underLine = false,
  align = "center",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-ink-200 bg-white text-brand-green shadow-[0_1px_2px_rgba(16,20,15,0.04),0_4px_12px_rgba(16,20,15,0.05)]"
        >
          {icon}
        </motion.div>
      )}

      {topText && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="eyebrow mb-4 inline-flex items-center gap-2 text-brand-green-dark"
        >
          <span className="h-px w-6 bg-brand-gold" />
          {topText}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="display text-[1.85rem] text-ink-900 sm:text-4xl md:text-[2.6rem]"
      >
        {title}
      </motion.h2>

      {underLine && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          style={{ transformOrigin: centered ? "center" : "left" }}
          className="mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-brand-gold via-brand-gold to-brand-green"
        />
      )}
    </div>
  );
}
