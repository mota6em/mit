import Link from "next/link";
import { CheckCircle2, Target, Rocket } from "lucide-react";

const FutureGoalsSection = () => {
  const shortTermGoals = [
    "Launch Gaza/Sadaka campaign.",
    "Complete volunteer onboarding automation.",
    "Organize Monthly events calendar.",
    "Start MIT Academy training sessions.",
    "Get Use to the new system and new Leadership style.",
  ];

  const longTermGoals = [
    "Build strong partnerships with Hungarian institutions.",
    "Develop consistent professional branding.",
    "Establish MIT as a recognized youth platform in HU.",
    "Begin community activism and representation projects.",
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          LOOKING AHEAD
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Short-Term Goals */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#4d93fb]">
            <h3 className="text-2xl font-bold mb-8 text-[#4d93fb] flex items-center gap-3">
              <div className="p-2 bg-[#4d93fb]/10 rounded-lg">
                <Target className="w-6 h-6" />
              </div>
              Short-Term (Next 3-6 Months)
            </h3>
            <ul className="space-y-4">
              {shortTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#11b505] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long-Term Goals */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-[#f1c34c] ">
            <h3 className="text-2xl font-bold mb-8 text-[#f1c34c] flex items-center gap-3">
              <div className="p-2 bg-[#f1c34c]/10 rounded-lg">
                <Rocket className="w-6 h-6" />
              </div>
              Long-Term (Next 1-2 Years)
            </h3>
            <ul className="space-y-4">
              {longTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#11b505] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Join MIT Button */}
        <div className="flex justify-center">
          <Link href="/en/join-mit">
            <button className="bg-gradient-to-r cursor-pointer from-[#4d93fb] via-[#11b505] to-[#f1c34c] text-white px-14 py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-101 transition-all duration-300">
              Join MIT Today
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FutureGoalsSection;
