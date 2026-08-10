"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <div
      className={cn("relative h-[400px] md:h-[500px] w-full", wrapperClassName)}
    >
      <div
        className={cn(
          "absolute top-0 start-4 md:start-20 lg:start-6 w-64 md:w-72 h-80 md:h-88 rounded-3xl overflow-hidden border-[5px] border-white shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.25)] -rotate-6 z-10",
          "media-fade",
          leftClassName,
          floatLeft && "animate-[float_6s_ease-in-out_infinite]"
        )}
      >
        <div className="absolute inset-0 bg-ink-100" />
        <Image
          src={leftImage}
          alt=""
          fill
          sizes="(max-width: 768px) 16rem, 18rem"
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          "absolute bottom-0 end-4 md:end-20 lg:end-6 w-60 md:w-64 h-72 md:h-80 rounded-3xl overflow-hidden border-[5px] border-white shadow-[0_4px_8px_rgba(16,20,15,0.06),0_24px_48px_-12px_rgba(16,20,15,0.25)] rotate-8 z-20",
          "media-fade",
          rightClassName,
          floatRight && "animate-[float_7s_ease-in-out_1s_infinite]"
        )}
      >
        <div className="absolute inset-0 bg-ink-100" />
        <Image
          src={rightImage}
          alt=""
          fill
          sizes="(max-width: 768px) 15rem, 16rem"
          className="object-cover"
        />
      </div>

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
            alt=""
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Static ambient wash — see the note in WhoWeAre: animating a 288px
          blur re-rasterizes it every frame, for the whole life of the page. */}
      <div className="pointer-events-none absolute inset-0 opacity-25 blur-3xl bg-[radial-gradient(circle_at_80%_15%,var(--color-brand-gold)_0,transparent_35%),radial-gradient(circle_at_15%_85%,var(--color-brand-green)_0,transparent_35%)]" />
    </div>
  );
}
