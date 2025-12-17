"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-[#4d93fb] border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-[#11b505] border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-[#f1c34c] border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-2 bg-white rounded-full shadow-sm flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-14 h-14"
          >
            <Image
              src="/imgs/hero/mit-logo-full.png"
              alt="Loading..."
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-gray-800 tracking-widest Carena-font">
          LOADING
        </h3>
        <div className="flex space-x-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor:
                  i === 0 ? "#4d93fb" : i === 1 ? "#11b505" : "#f1c34c",
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
