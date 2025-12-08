import { CheckCircle2 } from "lucide-react";

const CallToActionSection = () => {
  const ctaPoints = [
    "Each team member has a vital role (Amanah).",
    "Focus on consistency and collaboration.",
    "Strive for excellence in all actions.",
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#2c3e50] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-[#f1c34c] Ang-font">
          Call to Action: Together for Allah&apos;s Cause
        </h2>

        <ul className="text-left max-w-2xl mx-auto space-y-4">
          {ctaPoints.map((point, index) => (
            <li
              key={index}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed flex items-start gap-3"
            >
              <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-[#11b505] flex-shrink-0 mt-1" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CallToActionSection;
