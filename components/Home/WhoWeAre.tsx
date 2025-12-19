"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function WhoWeAre() {
  const t = useTranslations("whoWeAre");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center w-full pb-10 pt-10 md:py-10 px-6 md:px-12 lg:px-20 font-serif"
      >
        <div
          className="
              flex flex-col-reverse lg:flex-row 
              items-center  
              gap-15 md:gap-24
            "
        >
          {/* TEXT LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-center lg:text-left"
          >
            <div className="flex space-x-0.5 mb-4 align-center justify-center md:justify-start">
              <span className="text-3xl md:font-semibold text-gray-700 md:text-[#4d93fb] font-semibold tracking-widest">
                {t("title.who")}
              </span>
              <span className="text-3xl  md:font-semibold text-gray-700 md:text-[#11b505] font-semibold tracking-widest">
                {t("title.are")}
              </span>
              <span className="text-3xl md:font-semibold text-gray-700 md:text-[#f1c34c] font-semibold tracking-widest">
                {t("title.we")}
              </span>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
              {t("description.intro")}
              <br />
              <br />
              {t("description.mission")}
            </p>
          </motion.div>
          {/* IMAGE RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mt-5 md:mt-0"
          >
            <div className="relative">
              <Image
                src="/imgs/home/aboutmit/mit-main-log-no-bg.png"
                alt="MIT Visual"
                width={900}
                height={900}
                className="w-full max-w-md md:w-full h-auto drop-shadow-xl relative z-10" // Added z-10 to keep image on top
              />

              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4d93fb] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#11b505] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
              <div className="absolute top-20 left-20 w-64 h-64 bg-[#f1c34c] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
            </div>
          </motion.div>
        </div>

        {/* Learn More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-12"
        >
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors group"
          >
            <span>{t("learnMore")}</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
