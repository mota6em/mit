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
        <h2 className="display mb-4 text-[2rem] text-ink-900 sm:text-4xl md:text-[2.6rem]">
          {t("volunteer.title")}
        </h2>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-ink-100 relative overflow-hidden"
      >
        {/* Decorative Corner Icon */}
        <div className="absolute left-0 top-0 -z-0 h-24 w-24 rounded-br-[4rem] bg-brand-green/10" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand-green-soft text-brand-green">
            <FaHeart className="text-3xl" />
          </div>

          <div className="flex-grow text-center md:text-left">
            <p className="lede mb-8 md:mb-7">
              {t("volunteer.description")}
            </p>
            <div className="flex justify-center md:justify-start">
              <ViewMoreButton
                href="https://docs.google.com/forms/d/e/1FAIpQLSd6KJuRRaifHAoZTEBxKaawimJBzj_pAaU7zBnSgMuq_BQBvA/viewform"
                label={t("volunteer.button")}
                variant="inline"
                external={true}
                linkClassName="btn-sheen group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(45,155,74,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark md:w-fit"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
