import { Target, Rocket } from "lucide-react";

const VisionMissionSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#2c3e50] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-[#f1c34c] tracking-widest Ang-font">
          MIT VISION AND MISSION
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-[#4d93fb] to-[#11b505] p-8 md:p-10 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8 text-white" />
              <h3 className="text-2xl md:text-3xl font-bold text-[#f1c34c] tracking-widest Ang-font">
                MIT Vision
              </h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed">
              To empower Muslim youth in Hungary to become active, confident,
              and united leaders in faith and society.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-gradient-to-br from-[#f1c34c] to-[#e8a619] p-8 md:p-10 rounded-lg">
            <div className="flex items-center gap-4 mb-6">
              <Rocket className="w-8 h-8 text-white" />
              <h3 className="text-2xl md:text-3xl font-bold text-[#2c3e50] tracking-widest Ang-font">
                MIT Mission
              </h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-800">
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
