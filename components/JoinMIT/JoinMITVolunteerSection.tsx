"use client";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { SectionTag } from "../Events/SectionTag";
import ViewMoreButton from "../reusable/ViewMoreButton";

export default function JoinMITVolunteerSection() {
  const t = useTranslations("joinMIT");

  return (
    <div id="volunteer" className="max-w-6xl mx-auto px-4 py-25 pb-0">
      <div className="text-center mb-8">
        <SectionTag text={t("impactTag") || "Make an Impact"} color="green" />
        <h2 className="text-4xl md:text-5xl font-semibold  text-[#11b505] mb-4">
          {t("volunteer.title")}
        </h2>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden"
      >
        {/* Decorative Corner Icon */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-green-800/10 rounded-br-[4rem] -z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-shrink-0 w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
            <FaHeart className="text-4xl text-green-500" />
          </div>

          <div className="flex-grow text-center md:text-left">
            <p className="text-green-800 text-lg md:text-[1.3rem] mb-8 md:mb-6">
              {t("volunteer.description")}
            </p>
            <div className="flex justify-center md:justify-start">
              <ViewMoreButton
                href="https://docs.google.com/forms/d/e/1FAIpQLSd6KJuRRaifHAoZTEBxKaawimJBzj_pAaU7zBnSgMuq_BQBvA/viewform"
                label={t("volunteer.button")}
                variant="inline"
                external={true}
                linkClassName="flex items-center justify-center w-full md:w-fit gap-2 text-green-700 animate-bounce font-semibold  outline outline-green-700 px-3 py-1 rounded-full  w-fit hover:gap-4 transition-all hover:bg-green-700 hover:text-white"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
