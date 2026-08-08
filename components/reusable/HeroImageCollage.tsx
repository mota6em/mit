"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeroImageCollageProps {
  leftImage: string;
  rightImage: string;
  centerIcon?: string;
  wrapperClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
  floatLeft?: boolean;
  floatRight?: boolean;
}

export default function HeroImageCollage({
  leftImage,
  rightImage,
  centerIcon,
  wrapperClassName,
  leftClassName,
  rightClassName,
  floatLeft = false,
  floatRight = false,
}: HeroImageCollageProps) {
  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);

  return (
    <div
      className={cn("relative h-[400px] md:h-[500px] w-full", wrapperClassName)}
    >
      {/* LEFT IMAGE */}
      <div
        className={cn(
          "absolute top-0 left-4 md:left-20 lg:left-6 w-64 md:w-72 h-80 md:h-88 rounded-3xl overflow-hidden border-[5px] border-white shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.25)] -rotate-6 z-10",
          leftClassName,
          floatLeft && "animate-[float_6s_ease-in-out_infinite]"
        )}
      >
        {!leftLoaded && (
          <div className="absolute inset-0 bg-ink-100 animate-pulse" />
        )}
        <Image
          src={leftImage}
          alt="Hero Left"
          fill
          className={`object-cover transition-opacity ${
            leftLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLeftLoaded(true)}
        />
      </div>

      {/* RIGHT IMAGE */}
      <div
        className={cn(
          "absolute bottom-0 right-4 md:right-20 lg:right-6 w-60 md:w-64 h-72 md:h-80 rounded-3xl overflow-hidden border-[5px] border-white shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.25)] rotate-8 z-20",
          rightClassName,
          floatRight && "animate-[float_7s_ease-in-out_1s_infinite]"
        )}
      >
        {!rightLoaded && (
          <div className="absolute inset-0 bg-ink-100 animate-pulse" />
        )}
        <Image
          src={rightImage}
          alt="Hero Right"
          fill
          className={`object-cover transition-opacity ${
            rightLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setRightLoaded(true)}
        />
      </div>

      {/* OPTIONAL CENTER ICON */}
      {centerIcon && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center z-30"
        >
          <Image
            src={centerIcon}
            alt="Center Icon"
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Ambient brand blobs (keyframes live in globals.css) */}
      <div className="animate-blob absolute right-20 top-10 h-72 w-72 rounded-full bg-brand-gold/50 opacity-25 blur-3xl" />
      <div className="animate-blob animation-delay-2000 absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-green/50 opacity-20 blur-3xl" />
    </div>
  );
}
