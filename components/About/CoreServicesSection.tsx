"use client";
import { BookOpen, Users, Megaphone, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RiServiceLine } from "react-icons/ri";

const CoreServicesSection = () => {
  const t = useTranslations("aboutMIT.coreServices");

  const serviceIcons = [BookOpen, Users, Megaphone, UserPlus];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 px-4 md:px-12 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 p-3 bg-gray-100 rounded-full text-gray-900"
          >
            <RiServiceLine className="w-8 h-8" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-center tracking-widest Ang-font text-gray-900"
          >
            {t("title")}
          </motion.h2>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {[0, 1, 2, 3].map((index) => {
            const Icon = serviceIcons[index];

            return (
              <motion.div
                key={index}
                variants={item}
                className="bg-white !border-t-slate-600 p-4 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden flex flex-col items-center text-center h-full"
                style={{ borderTop: `6px solid` }}
              >
                {/* Icon Container with Soft Background */}
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6   shadow-sm`}
                >
                  <Icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {t(`services.${index}.title`)}
                </h3>

                <p className="text-gray-900 leading-relaxed mb-2 text-sm md:text-base">
                  {t(`services.${index}.description`)}
                </p>

                <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-5 pointer-events-none bg-gray-600" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreServicesSection;
