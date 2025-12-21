"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FaUsers, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Counter = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const count = useMotionValue(0);

  const rounded = useSpring(count, { stiffness: 200, damping: 30 });

  const display = useTransform(
    rounded,
    (latest) => Math.floor(latest).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const Statistics = () => {
  const t = useTranslations("home.statistics");

  const stats = [
    {
      icon: FaUsers,
      target: 10,
      suffix: "+",
      label: t("yearsLabel"),
      color: "text-[#2D9B4A]",
    },
    {
      icon: FaCalendarAlt,
      target: 100,
      suffix: "+",
      label: t("eventsLabel"),
      color: "text-[#F9BC15]",
    },
    {
      icon: FaHashtag,
      target: 1500,
      suffix: "+",
      label: t("socialLabel"),
      color: "text-[#00ADEF]",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  poppins.className font-semibold text-[#2D9B4A] mb-4">
            {t("title")}
          </h2>
          <div className="w-16 h-1 bg-[#2D9B4A] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className={`mb-4 p-4 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className="text-3xl" aria-hidden="true" />
              </div>

              <span className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                <Counter value={stat.target} suffix={stat.suffix} />
              </span>

              <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                {stat.label}
              </span>

              {index < stats.length - 1 && (
                <div className="w-12 h-px bg-gray-100 mt-12 md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
