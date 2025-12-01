"use client";
import { useEffect } from "react";

const LatestPrograms = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Our Latest Programs
      </h2>

      <div className="w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden">
        <iframe
          src="//lightwidget.com/widgets/5d467ed9d1ed57079391fc105e12b026.html"
          scrolling="no"
          allowtransparency="true"
          className="w-full"
          style={{ border: 0, overflow: "hidden", width: "100%" }}
        ></iframe>
      </div>
    </section>
  );
};

export default LatestPrograms;
