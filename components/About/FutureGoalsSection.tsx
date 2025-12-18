"use client";
import Link from "next/link";
import { CheckCircle2, Target, Rocket, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

const FutureGoalsSection = () => {
  const t = useTranslations("aboutMIT.futureGoals");
  const locale = useLocale();

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-15 tracking-widest Ang-font text-yellow-600"
        >
          {t("title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-15">
          {/* Short-Term Goals */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border-t-8 border-[#4d93fb] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Target className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-[#4d93fb] flex items-center gap-3 relative z-10">
              <span className="p-2 bg-blue-50 rounded-lg">
                <Target className="w-6 h-6" />
              </span>
              {t("shortTerm.title")}
            </h3>
            <ul className="space-y-5 relative z-10">
              {[0, 1, 2, 3, 4].map((index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#4d93fb] flex-shrink-0" />
                  <span className="text-gray-700 font-medium leading-relaxed">
                    {t(`shortTerm.goals.${index}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Long-Term Goals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800 text-white p-8 md:p-10 rounded-3xl shadow-xl border-t-8 border-[#f1c34c] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Rocket className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-8 text-[#f1c34c] flex items-center gap-3 relative z-10">
              <span className="p-2 bg-white/10 rounded-lg">
                <Rocket className="w-6 h-6" />
              </span>
              {t("longTerm.title")}
            </h3>
            <ul className="space-y-5 relative z-10">
              {[0, 1, 2, 3].map((index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#f1c34c] flex-shrink-0 mt-1" />
                  <span className="text-gray-200 font-medium leading-relaxed">
                    {t(`longTerm.goals.${index}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Join MIT Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href={`/${locale}/join-mit`}>
            <button className="group relative cursor-pointer px-4 py-2 bg-[#11b505] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-[#0ea004] transition-all duration-300 flex items-center gap-3">
              {t("button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureGoalsSection;
