"use client";

import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  topText?: string;
  className?: string;
  underLine?: boolean;
}

export default function SectionHeader({
  title,
  icon,
  topText,
  className = "",
  underLine = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {icon && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="mb-4 p-3 bg-gray-100 rounded-full text-gray-900"
        >
          {icon}
        </motion.div>
      )}

      {topText && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-700 font-medium tracking-widest text-sm mb-3 block"
        >
          {topText}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-semibold tracking-widest text-gray-900"
      >
        {title}
      </motion.h2>
      {underLine && (
        <div className="w-16 h-0.5 bg-gray-800 mx-auto rounded-full mb-4 mt-2" />
      )}
    </div>
  );
}
