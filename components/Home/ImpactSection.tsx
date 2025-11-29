"use client";

import {
  FaUsers,
  FaBookOpen,
  FaHandsHelping,
  FaRegSmile,
} from "react-icons/fa";

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

export default function MITFeaturesPremium() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-yellow-600 font-serif">
          Empowering Muslim Youth in Hungary
        </h2>

        <p className="text-md md:text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Building community, opportunities, and meaningful impact through
          engagement and support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className="flex flex-col items-center p-6 rounded-xl bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 rounded-full mb-4 bg-yellow-100">
                  <Icon size={32} className="text-yellow-600" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
