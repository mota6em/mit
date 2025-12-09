import { Target, Rocket } from "lucide-react";

const VisionMissionSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-20 tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
          MIT VISION AND MISSION
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Vision Card */}
          <div className="bg-white p-10 md:p-12 rounded-2xl shadow-lg  transition-all duration-300 border-l-4 border-[#4d93fb] ">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#4d93fb] to-[#11b505] rounded-xl shadow-md">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
                MIT Vision
              </h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              To empower Muslim youth in Hungary to become active, confident,
              and united leaders in faith and society.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-10 md:p-12 rounded-2xl shadow-lg  transition-all duration-300 border-l-4 border-[#f1c34c] ">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#f1c34c] to-[#e8a619] rounded-xl shadow-md">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-widest Ang-font bg-gradient-to-r from-[#4d93fb] via-[#11b505] to-[#f1c34c] bg-clip-text text-transparent">
                MIT Mission
              </h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              Our mission is to serve Allah through teamwork, growth, and
              service to our community. Through education, events, and community
              service, MIT nurtures the next generation of Muslim leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
