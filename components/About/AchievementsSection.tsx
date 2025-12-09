import { CheckCircle2 } from "lucide-react";

const AchievementsSection = () => {
  const achievements = [
    "Organized Ramadan Sadaqa Programs supporting families in need.",
    "Launched a Youth Internship Project to empower young Muslims.",
    "Initiated the Gaza Student Support Campaign.",
    "First to start Marriage Education & Matching Programs in Hungary.",
    "Introduced the first Du'aa Training Program.",
    "Hosted successful events in multiple mosques.",
    "Operated fully through volunteer work without financial support.",
    "First Muslim youth group to collaborate with Hungarian universities.",
    "Helped build a successful, empowered Muslim generation.",
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          KEY ACHIEVEMENTS
        </h2>

        <div className="space-y-5 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-start gap-5 bg-white p-7 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-[#f1c34c] hover:border-[#11b505]"
            >
              <CheckCircle2 className="w-7 h-7 text-[#11b505] flex-shrink-0 mt-0.5" />
              <p className="text-lg text-gray-700 leading-relaxed">
                {achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
