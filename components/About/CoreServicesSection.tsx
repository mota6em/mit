"use client";
import { BookOpen, Users, Megaphone, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RiServiceLine } from "react-icons/ri";
import SectionHeader from "../reusable/SectionHeader";
import Section from "../reusable/Section";

/**
 * Each service carries its own accent so the four cards are scannable as
 * distinct offerings rather than reading as one repeated tile.
 */
const SERVICES = [
  { icon: BookOpen, accent: "text-brand-green", tile: "bg-brand-green-soft", bar: "bg-brand-green" },
  { icon: Users, accent: "text-brand-sky", tile: "bg-brand-sky-soft", bar: "bg-brand-sky" },
  { icon: Megaphone, accent: "text-brand-gold-dark", tile: "bg-brand-gold-soft", bar: "bg-brand-gold" },
  { icon: UserPlus, accent: "text-brand-green-dark", tile: "bg-brand-green-soft", bar: "bg-brand-green-dark" },
] as const;

const CoreServicesSection = () => {
  const t = useTranslations("aboutMIT.coreServices");

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Section tone="tinted" width="wide">
      <SectionHeader
        title={t("title")}
        icon={<RiServiceLine className="h-7 w-7" />}
        className="mb-14"
        underLine
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={index}
              variants={item}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="surface surface-lift group relative flex h-full flex-col overflow-hidden rounded-3xl p-7"
            >
              {/* Accent bar reveals on hover — colour identifies the service */}
              <span
                className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${service.bar}`}
              />

              <div className="mb-6 flex items-center justify-between">
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${service.tile} ${service.accent}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <span className="display text-3xl text-ink-200 transition-colors duration-500 group-hover:text-ink-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="display mb-3 text-lg text-ink-900">
                {t(`services.${index}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-ink-600">
                {t(`services.${index}.description`)}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
};

export default CoreServicesSection;
