"use client";

import {
  FaUsers,
  FaBookOpen,
  FaHandsHelping,
  FaRegSmile,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const features = [
  {
    icon: FaUsers,
    title: "Community",
    desc: "Creating unity, friendships, and lifelong bonds.",
  },
  {
    icon: FaBookOpen,
    title: "Education",
    desc: "Workshops, study groups, and skill-building sessions.",
  },
  {
    icon: FaHandsHelping,
    title: "Support",
    desc: "A welcoming environment for students & newcomers.",
  },
  {
    icon: FaRegSmile,
    title: "Events",
    desc: "Small & large gatherings to connect Muslim youth.",
  },
];

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // use cubic-bezier array instead of string
    },
  }),
};

export default function MITFeaturesPremium() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-yellow-600 font-serif drop-shadow-lg">
          Empowering Muslim Youth in Hungary
        </h2>

        <p className="text-md md:text-lg text-gray-700 mb-14 max-w-2xl mx-auto">
          Building community, opportunities, and meaningful impact through
          engagement and support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardMotion}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // scroll trigger fix
                className="flex flex-col items-center p-6 rounded-3xl
                  bg-white/50 backdrop-blur-lg border border-white/20 shadow-lg
                  hover:shadow-2xl hover:-translate-y-3 transition-all duration-500
                  cursor-pointer"
              >
                <div className="p-5 rounded-full mb-4 bg-yellow-100/60 hover:bg-yellow-200/80 transition-colors duration-300">
                  <Icon size={36} className="text-yellow-600" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 drop-shadow-sm">
                  {f.title}
                </h3>

                <p className="text-sm md:text-base text-gray-700">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
