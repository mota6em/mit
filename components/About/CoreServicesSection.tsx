"use client";
import { BookOpen, Users, Megaphone, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const CoreServicesSection = () => {
  const t = useTranslations("aboutMIT.coreServices");

  const serviceIcons = [BookOpen, Users, Megaphone, UserPlus];

  // Brand colors map for dynamic styling
  const brandColors = [
    { main: "#4d93fb", bg: "bg-blue-50", text: "text-blue-600" }, // Blue
    { main: "#11b505", bg: "bg-green-50", text: "text-green-600" }, // Green
    { main: "#f1c34c", bg: "bg-yellow-50", text: "text-yellow-600" }, // Yellow
    { main: "#2c3e50", bg: "bg-slate-50", text: "text-slate-700" }, // Dark Blue/Grey
  ];

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="text-[#f1c34c] font-bold tracking-widest uppercase text-sm mb-3 block">
            {t("label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-widest Ang-font text-yellow-600">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {[0, 1, 2, 3].map((index) => {
            const Icon = serviceIcons[index];
            const color = brandColors[index];

            return (
              <motion.div
                key={index}
                variants={item}
                className="bg-white p-4 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden flex flex-col items-center text-center h-full"
                style={{ borderTop: `6px solid ${color.main}` }}
              >
                {/* Icon Container with Soft Background */}
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${color.bg} ${color.text} shadow-sm`}
                >
                  <Icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-600">
                  {t(`services.${index}.title`)}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-2 text-sm md:text-base">
                  {t(`services.${index}.description`)}
                </p>

                {/* Decorative bottom corner blob */}
                <div
                  className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-5 pointer-events-none"
                  style={{ backgroundColor: color.main }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreServicesSection;
