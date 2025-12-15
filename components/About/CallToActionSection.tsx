"use client";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const CallToActionSection = () => {
  const t = useTranslations("aboutMIT.callToAction");

  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-[#11b505]/5 to-[#f1c34c]/10 p-10 md:p-20 rounded-[2.5rem] text-center border border-gray-100 shadow-2xl overflow-hidden"
        >
          <Sparkles className="absolute top-10 left-10 w-12 h-12 text-yellow-400 opacity-20 animate-pulse" />

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 tracking-wide Ang-font text-gray-800">
            <span className="block text-2xl md:text-3xl text-gray-500 mb-2 font-sans font-medium tracking-normal">
              {t("title")}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500">
              {t("subtitle")}
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center text-center md:items-start md:text-left gap-4"
              >
                <div className="p-2 bg-green-100 rounded-full text-[#11b505]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-gray-700 font-medium text-lg leading-snug">
                  {t(`points.${index}`)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
