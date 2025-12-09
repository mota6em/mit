import { BookOpen, Users, Megaphone, UserPlus } from "lucide-react";

const CoreServicesSection = () => {
  const services = [
    {
      icon: BookOpen,
      title: "Education & Development",
      desc: "Quran circles, workshops, mentoring.",
      color: "#4d93fb",
    },
    {
      icon: Users,
      title: "Community Events",
      desc: "Iftars, social gatherings, sports, volunteering.",
      color: "#11b505",
    },
    {
      icon: Megaphone,
      title: "Media Outreach",
      desc: "Campaigns, awareness projects, online da'wah.",
      color: "#f1c34c",
    },
    {
      icon: UserPlus,
      title: "Human Resources",
      desc: "Volunteer programs and leadership training.",
      color: "#9b59b6",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          OUR CORE SERVICES
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div
                style={{ backgroundColor: service.color }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg  transition-transform duration-300"
              >
                <service.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-center text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServicesSection;
