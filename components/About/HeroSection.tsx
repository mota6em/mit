"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const t = useTranslations("aboutMIT.hero");
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);

  const floatClass =
    "will-change-transform animate-[float_6s_ease-in-out_infinite]";
  const floatDelayClass =
    "will-change-transform animate-[float_7s_ease-in-out_1s_infinite]";

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-blue-50/30 to-white overflow-hidden px-6 py-12 md:px-12 lg:px-20 lg:py-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT COLUMN: Optimized Image Collage */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          {/* Image 1 */}
          <div
            className={`absolute top-0 left-0 sm:left-12 md:left-24 lg:left-5 lg:top-4 w-64 h-80 md:w-72 md:h-88 lg:w-64 lg:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 transform -rotate-6 ${floatClass}`}
          >
            {!img1Loaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <Image
              src="/imgs/one-year-mit.jpg"
              alt="Community Event"
              fill
              className={`object-cover transition-opacity duration-300 ${
                img1Loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 50vw, 33vw"
              onLoad={() => setImg1Loaded(true)}
              priority
            />
          </div>

          {/* Image 2 */}
          <div
            className={`absolute -bottom-8 mg:bottom-10 lg:bottom-12 -right-4 sm:right-10 md:right-20 lg:right-4 w-60 h-72 md:w-70 md:h-82 lg:w-60 lg:h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 transform rotate-8 md:rotate-8 ${floatDelayClass}`}
          >
            {!img2Loaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <Image
              src="/imgs/femynso-mit.jpg"
              alt="Youth Gathering"
              fill
              className={`object-cover transition-opacity duration-300 ${
                img2Loaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 50vw, 33vw"
              onLoad={() => setImg2Loaded(true)}
            />
          </div>

          {/* Centered Logo */}
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center z-30 border border-gray-500"
          >
            <Image
              src="/imgs/mit-logo-full-resized.png"
              alt="MIT Logo"
              width={100}
              height={100}
              className="object-contain p-2"
            />
          </motion.div>

          <div className="absolute top-10 right-20 w-72 h-72 bg-gray-800/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-gray-800/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-72 h-72 bg-gray-800/50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>{" "}
        {/* Right COLUMN: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="poppins.className text-gray-600 mb-4 "
          >
            <h1
              className={"text-3xl md:text-5xl poppins.className font-semibold"}
            >
              {t("title")}
            </h1>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-gray-800 max-w-xl mb-8"
          >
            {t("description")}
          </motion.p>
        </div>
      </div>

      {/* Tailwind Keyframes for smoother movement */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
