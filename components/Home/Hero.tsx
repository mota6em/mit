"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-ink-300 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-ink-300 via-ink-200 to-ink-300 animate-shimmer" />
    </div>
  );
}

const rise = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileTopLoaded, setMobileTopLoaded] = useState(false);
  const [mobileMiddleLoaded, setMobileMiddleLoaded] = useState(false);
  const [mobileBottomLoaded, setMobileBottomLoaded] = useState(false);

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden md:min-h-[90vh]">
      {/** * Desktop Background Slider */}
      <div className="hidden h-full lg:block">
        {!desktopLoaded && <ImageSkeleton />}
        <Image
          src={"/imgs/home/hero/picnic.jpg"}
          alt="hero"
          fill
          priority
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
            desktopLoaded ? "animate-ken-burns opacity-100" : "opacity-0"
          }`}
          onLoad={() => setDesktopLoaded(true)}
        />
      </div>

      {/** * Mobile Image Stack */}
      <div className="absolute inset-0 flex h-full w-full flex-col lg:hidden">
        {[
          {
            src: "/imgs/home/hero/picnic2.jpg",
            alt: "top",
            loaded: mobileTopLoaded,
            set: setMobileTopLoaded,
          },
          {
            src: "/imgs/home/aboutmit/hero-sm-bg.jpg",
            alt: "middle-fixed",
            loaded: mobileMiddleLoaded,
            set: setMobileMiddleLoaded,
          },
          {
            src: "/imgs/home/hero/picnic.jpg",
            alt: "bottom",
            loaded: mobileBottomLoaded,
            set: setMobileBottomLoaded,
          },
        ].map((img) => (
          <div key={img.alt} className="relative w-full flex-1">
            {!img.loaded && <ImageSkeleton />}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={img.alt === "top"}
              className={`object-cover transition-opacity duration-700 ${
                img.loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => img.set(true)}
            />
          </div>
        ))}
      </div>

      {/**
       * Cinematic scrim — a vertical darkening plus a warm radial pool behind
       * the copy, so the text reads at any image brightness without a flat
       * gray wash over the photography.
       */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/35 to-ink-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(16,20,15,0.55),transparent_70%)]" />
      <div className="grain absolute inset-0" />

      {/** * Content Overlay */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.13, delayChildren: 0.15 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
      >
        <motion.span
          variants={rise}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-gold" />
          </span>
          {tNav("subtitle")}
        </motion.span>

        <motion.h1
          variants={rise}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="display max-w-4xl text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient-brand drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            {t("hero.title")}
          </span>
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-base font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)] md:max-w-xl md:text-xl"
        >
          {t("hero.subtitle1")}
        </motion.p>

        <motion.div
          variants={rise}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href={`/${locale}/join-mit`}
            className="btn-sheen group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-gold px-7 py-3.5 text-[0.95rem] font-semibold text-ink-900 shadow-[0_8px_28px_-8px_rgba(249,188,21,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold-dark active:translate-y-0"
          >
            <span className="relative z-10">{tNav("join mit")}</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[0.95rem] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
          >
            {tNav("events")}
          </Link>
        </motion.div>
      </motion.div>

      {/** Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="animate-scroll-cue h-1.5 w-1 rounded-full bg-white/80" />
        </div>
      </motion.div>
    </section>
  );
}
