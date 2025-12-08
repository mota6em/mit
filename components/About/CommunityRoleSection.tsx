import { Building2, Heart, Link as LinkIcon, Sparkles } from "lucide-react";

const CommunityRoleSection = () => {
  const roleItems = [
    {
      icon: Building2,
      color: "#4d93fb",
      text: "Acts as a bridge between youth and community institutions.",
    },
    {
      icon: Heart,
      color: "#11b505",
      text: "Supports mosque initiatives while filling youth engagement gaps.",
    },
    {
      icon: LinkIcon,
      color: "#f1c34c",
      text: "Builds unity between Hungarian reverts and international Muslims.",
    },
    {
      icon: Sparkles,
      color: "#9b59b6",
      text: "Expands volunteerism culture among young Muslims.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#2c3e50] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-[#f1c34c] tracking-widest Ang-font">
          OUR ROLE IN THE COMMUNITY
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {roleItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white/10 p-6 rounded-lg border border-white/20"
            >
              <div
                style={{ backgroundColor: item.color }}
                className="p-3 rounded-full flex-shrink-0"
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-lg md:text-xl leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityRoleSection;
