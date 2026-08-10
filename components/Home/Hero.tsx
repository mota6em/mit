"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MOBILE_HERO_IMAGES = [
  "/imgs/home/hero/picnic2.jpg",
  "/imgs/home/aboutmit/hero-sm-bg.jpg",
  "/imgs/home/hero/picnic.jpg",
];

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden md:min-h-[90vh]">
      <div className="absolute inset-0 bg-ink-900" />

      <div className="media-fade hidden h-full lg:block">
        <Image
          src="/imgs/home/hero/picnic.jpg"
          alt=""
          fill
          priority
          quality={72}
          sizes="(max-width: 1023px) 1px, 100vw"
          className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex h-full w-full flex-col lg:hidden">
        {MOBILE_HERO_IMAGES.map((src, index) => (
          <div key={src} className="media-fade relative w-full flex-1">
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              quality={70}
              sizes="(min-width: 1024px) 1px, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/35 to-ink-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(16,20,15,0.55),transparent_70%)]" />
      <div className="grain absolute inset-0" />

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
