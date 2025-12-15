"use client";
import { CheckCircle2, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const AchievementsSection = () => {
  const t = useTranslations("aboutMIT.achievements");

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 p-3 bg-green-100 rounded-full text-[#11b505]"
          >
            <Trophy className="w-8 h-8" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center tracking-widest Ang-font text-yellow-600"
          >
            {t("title")}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#11b505] hover:shadow-md transition-all duration-300 group"
            >
              <CheckCircle2 className="w-6 h-6 text-[#11b505] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
              <p className="text-gray-700 font-medium leading-relaxed">
                {t(`list.${index}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
