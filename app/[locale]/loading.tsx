"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
        {/* soft glow */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#4d93fb]/20 via-[#11b505]/20 to-[#f1c34c]/20 blur-xl" />

        {/* spinner */}
        <div
          className="w-20 h-20 rounded-full border-[3px] border-transparent border-t-[#4d93fb] border-r-[#11b505] animate-spin"
          style={{ animationDuration: "1.6s" }}
        />

        {/* logo */}
        <div className="absolute w-14 h-14 opacity-90">
          <Image
            src="/imgs/mit-logo-full-resized-lowest.jpg"
            alt="Loading..."
            fill
            className="object-contain rounded-full"
            priority
          />
        </div>
      </div>

      {/* text + progress */}
      <div className="mt-4 flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-[0.35em] text-gray-400 uppercase Carena-font">
          MIT
        </span>

        <div className="w-16 h-[2px] bg-gray-100 mt-2 overflow-hidden rounded-full">
          <div className="h-full bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
