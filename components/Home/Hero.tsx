"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";

const images = [
  "/imgs/hero/hero-bg-1.jpg",
  "/imgs/hero/hero-bg-2.jpg",
  "/imgs/hero/hero-bg-3.jpg",
  "/imgs/hero/hero-bg-4.jpg",
  "/imgs/hero/hero-bg-5.jpg",
  "/imgs/hero/hero-bg-6.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentStack = images.slice(currentIndex, currentIndex + 3);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative w-full min-h-[90vh] max-h-[90vh] overflow-hidden">
      {/* md+ screens: full background slideshow */}
      <div className="hidden md:block h-full">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`background ${index}`}
            fill
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority
          />
        ))}
      </div>

      {/* small screens: stacked 3 images */}
      <div className="flex flex-col md:hidden absolute inset-0 w-full h-full">
        {currentStack.map((img, index) => (
          <div
            key={index}
            className="relative flex-1 w-full transition-opacity duration-1000"
            style={{ transitionDelay: `${index * 300}ms` }}
          >
            <Image
              src={img}
              alt={`stacked ${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 md:px-6 space-y-4 md:space-y-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_2px_black]"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          Muszlim Ifjúsági Társaság
        </motion.h1>

        <div className="flex flex-col font-serif items-center justify-center">
          {[
            "Welcome to the official page!",
            "Events for Muslim Students & Community.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="text-xs md:text-xl w-fit max-w-2xl text-yellow-400 font-semibold drop-shadow-[black_0_0_2px] p-0 shadow-none"
              initial="hidden"
              animate="visible"
              custom={i + 1}
              variants={textVariants}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* social icons */}
        <div className="flex gap-5 mt-4">
          {[
            {
              icon: FaFacebookF,
              href: "https://www.facebook.com/muszlimifjusag/",
              gradient: "from-blue-500 via-indigo-500 to-purple-500",
            },
            {
              icon: FaInstagram,
              href: "https://www.instagram.com/muszlimifjusag/",
              gradient: "from-pink-500 via-red-500 to-yellow-500",
            },
            {
              icon: FaWhatsapp,
              href: "https://wa.me/123456789",
              gradient: "from-green-400 via-lime-500 to-teal-500",
            },
            {
              icon: HiOutlineMail,
              href: "mailto:muszlimifjusag@gmail.com",
              gradient: "from-purple-400 via-pink-500 to-yellow-400",
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="relative p-3 rounded-full shadow-lg text-white hover:scale-110 transition overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
              >
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.gradient} animate-gradient-x backdrop-blur-md`}
                ></div>
                <Icon size={20} className="relative z-10" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
