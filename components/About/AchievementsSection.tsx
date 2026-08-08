"use client";
import { CheckCircle2, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionHeader from "../reusable/SectionHeader";

const AchievementsSection = () => {
  const t = useTranslations("aboutMIT.achievements");
  const listItems = t.raw("list");
  const items = Array.isArray(listItems) ? listItems : [];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={t("title")}
          icon={<Trophy className="w-8 h-8" />}
          className="mb-5 md:mb-14"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-ink-100"
            >
              <CheckCircle2 className="w-6 h-6 text-ink-900 shrink-0 mt-1" />
              <p className="text-ink-900 font-medium leading-relaxed">
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
