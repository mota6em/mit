"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { announcements_backgroundImages } from "@/data/constants/const";

const Hero = () => {
  const t = useTranslations("highlights");

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-gradient-to-b from-brand-green-soft/50 via-ink-50 to-white">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Background images - desktop only */}
      {announcements_backgroundImages.map((img, index) => (
        <motion.div
          key={index}
          className="absolute rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 hidden lg:block mt-2"
          style={{
            top: img.top,
            left: img.left,
            width: img.size,
            height: img.size * 0.75,
            rotate: img.rotate,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{
            delay: 0.1 + index * 0.08,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            className="object-cover"
            sizes="120px"
          />
        </motion.div>
      ))}

      {/* Soft radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-white/90 via-white/60 to-transparent" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 mt-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <Image
            src="/imgs/home/aboutmit/mit-main-log-no-bg.png"
            alt="MIT Logo"
            width={220}
            height={160}
            className="object-contain mb-6"
            priority
          />

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="display text-center text-3xl text-ink-900 md:text-4xl lg:text-5xl"
          >
            {t("heroTitle").split("&")[0]}
            <span className="text-brand-gold">&</span>
            {t("heroTitle").split("&")[1]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="lede mt-5 max-w-md text-center"
          >
            {t("stayUpdated")}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
