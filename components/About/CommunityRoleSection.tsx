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
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          OUR ROLE IN THE COMMUNITY
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {roleItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-5 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 "
            >
              <div
                style={{ backgroundColor: item.color }}
                className="p-4 rounded-xl flex-shrink-0 shadow-md"
              >
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityRoleSection;
