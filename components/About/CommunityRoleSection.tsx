"use client";
import { Building2, Heart, Link as LinkIcon, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RiUserCommunityFill } from "react-icons/ri";
import SectionHeader from "../reusable/SectionHeader";

const CommunityRoleSection = () => {
  const t = useTranslations("aboutMIT.communityRole");

  const roleIcons = [Building2, Heart, LinkIcon, Sparkles];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={t("title")}
          icon={<RiUserCommunityFill className="w-8 h-8" />}
          className="mb-5 md:mb-14"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((index) => {
            const Icon = roleIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-4 bg-gray-50 rounded-xl text-gray-800 flex-shrink-0">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
                    {t(`roles.${index}`)}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityRoleSection;
