"use client";

import {
  FaUsers,
  FaBookOpen,
  FaHandsHelping,
  FaRegSmile,
} from "react-icons/fa";
import { motion } from "framer-motion";

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

export default function MITFeaturesClean() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-yellow-600 font-serif">
          Empowering Muslim Youth in Hungary
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-14 max-w-2xl mx-auto">
          Building community, opportunities, and meaningful impact through
          engagement and support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center p-6 rounded-3xl hover:scale-105 transition-all duration-500"
              >
                <div className="relative p-5 rounded-full mb-4 transition hover:text-yellow-400">
                  <Icon size={36} className="text-gray-800" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
