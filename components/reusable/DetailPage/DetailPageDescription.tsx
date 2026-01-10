"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/data/constants/const";
import type { DetailPageDescriptionProps } from "@/lib/types";

export function DetailPageDescription({
  description,
}: DetailPageDescriptionProps) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0.2}
    >
      <p className="text-gray-700 text-base md:text-lg whitespace-pre-wrap leading-normal">
        {description}
      </p>
    </motion.section>
  );
}
