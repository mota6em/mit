"use client";
import { Building2, Heart, Link as LinkIcon, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RiUserCommunityFill } from "react-icons/ri";
import SectionHeader from "../reusable/SectionHeader";
import Section from "../reusable/Section";

const ROLES = [
  { icon: Building2, accent: "text-brand-green", tile: "bg-brand-green-soft" },
  { icon: Heart, accent: "text-brand-gold-dark", tile: "bg-brand-gold-soft" },
  { icon: LinkIcon, accent: "text-brand-sky", tile: "bg-brand-sky-soft" },
  { icon: Sparkles, accent: "text-brand-green-dark", tile: "bg-brand-green-soft" },
] as const;

const CommunityRoleSection = () => {
  const t = useTranslations("aboutMIT.communityRole");

  return (
    <Section tone="plain" width="default">
      <SectionHeader
        title={t("title")}
        icon={<RiUserCommunityFill className="h-7 w-7" />}
        className="mb-14"
        underLine
      />

      {/**
       * An indexed editorial list rather than a grid of equal cards: the
       * numbers give the eye an order to follow, and the hairlines connect
       * the rows instead of boxing each one off separately.
       */}
      <ul className="divide-y divide-ink-200 border-y border-ink-200">
        {ROLES.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-5 py-7 transition-colors duration-300 md:gap-8"
            >
              <span className="display w-10 shrink-0 text-xl text-ink-300 transition-colors duration-300 group-hover:text-brand-gold md:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${role.tile} ${role.accent}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <p className="text-base font-medium leading-relaxed text-ink-800 md:text-lg">
                {t(`roles.${index}`)}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
};

export default CommunityRoleSection;
