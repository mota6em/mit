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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-800 tracking-widest Ang-font">
          <span className="text-[#f1c34c]">KEY </span>
          <span className="text-[#4d93fb]">ACHIEVEMENTS</span>
        </h2>

        <div className="space-y-4 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg border-l-4 border-[#f1c34c]"
            >
              <CheckCircle2 className="w-6 h-6 text-[#11b505] flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
