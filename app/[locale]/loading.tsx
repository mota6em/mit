"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-transparent border-t-[#4d93fb] border-l-[#11b505]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute flex items-center justify-center">
          <div className="relative w-10 h-10 opacity-80">
            <Image
              src="/imgs/mit-logo-full-resized-lowest.jpg"
              alt="Loading..."
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase Carena-font">
          MIT
        </span>

        <div className="w-16 h-[2px] bg-gray-100 mt-2 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
