"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const HeroSection = () => {
  const t = useTranslations("aboutMIT.hero");
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);

  const floatingAnimation: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingAnimationDelayed: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden px-6 md:px-12 lg:px-20 py-20">
      {/* Background Decor (Optional pattern) */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <Image
          src="/imgs/patterns/islamic-pattern.jpg"
          alt="Pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* LEFT COLUMN: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 px-5 py-2 rounded-full bg-green-700/10 border border-green-700/30 text-green-700 font-semibold tracking-wider uppercase text-sm"
          >
            {t("badge")}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest Ang-font text-yellow-600 mb-8 leading-tight"
          >
            {t("title")}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mb-10"
          >
            {t("description")}
          </motion.p>

           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-1 w-24 bg-gradient-to-r from-[#4d93fb] to-[#11b505] rounded-full"
          />
        </div>

        {/* RIGHT COLUMN: Creative Image Collage */}
        <div className="relative h-[500px] w-full hidden lg:block">
          {/* Image 1 */}
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="absolute top-0 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 transform -rotate-6"
          >
            {/* Loading Skeleton */}
            {!img1Loaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse z-20" />
            )}
            <Image
              src="/imgs/hero/hero-bg-1.jpg"
              alt="Community Event"
              fill
              className={`object-cover transition-opacity duration-500 ${
                img1Loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
              onLoad={() => setImg1Loaded(true)}
            />
          </motion.div>

          {/* Image 2  */}
          <motion.div
            variants={floatingAnimationDelayed}
            initial="initial"
            animate="animate"
            className="absolute bottom-10 right-10 w-60 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 transform rotate-3"
          >
            {/* Loading Skeleton */}
            {!img2Loaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse z-20" />
            )}
            <Image
              src="/imgs/hero/hero-bg-2.jpg"
              alt="Youth Gathering"
              fill
              className={`object-cover transition-opacity duration-500 ${
                img2Loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
              onLoad={() => setImg2Loaded(true)}
            />
          </motion.div>

          {/* Image 3  */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center z-30 border border-gray-100"
          >
            <Image
              src="/imgs/hero/mit-logo-full.png"
              alt="MIT Logo"
              width={130}
              height={130}
              className="object-contain p-2"
              priority
            />
          </motion.div>

          <div className="absolute top-10 right-20 w-72 h-72 bg-[#4d93fb] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#11b505] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-72 h-72 bg-[#f1c34c] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
