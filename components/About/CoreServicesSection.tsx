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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-800 tracking-widest Ang-font">
          <span className="text-[#4d93fb]">OUR </span>
          <span className="text-[#11b505]">CORE </span>
          <span className="text-[#f1c34c]">SERVICES</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border-2 border-gray-200"
            >
              <div
                style={{ backgroundColor: service.color }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-center text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServicesSection;
