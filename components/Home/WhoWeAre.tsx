"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function WhoWeAre() {
  const t = useTranslations("whoWeAre");

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 font-serif">
      <div
        className="
          flex flex-col-reverse lg:flex-row 
          items-center  
          gap-14 lg:gap-24
        "
      >
        {/* TEXT LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl text-center lg:text-left"
        >
          <div className="flex space-x-0.5 mb-4 align-center">
            <span className="text-4xl font-bold text-[#4d93fb] monstera-font tracking-widest">
              {t("title.who")}
            </span>
            <span className="text-4xl font-bold text-[#11b505] monstera-font tracking-widest">
              {t("title.are")}
            </span>
            <span className="text-4xl font-bold text-[#f1c34c] monstera-font tracking-widest">
              {t("title.we")}
            </span>
          </div>

          <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
            {t("description.intro")}
            <br />
            <br />
            {t("description.activities")}
            <br />
            <br />
            {t("description.colors.intro")}{" "}
            <span className="font-semibold text-blue-500">
              {t("description.colors.blue")}
            </span>
            ,
            <span className="font-semibold text-green-500">
              {" "}
              {t("description.colors.green")}
            </span>
            , {t("description.colors.and")}
            <span className="font-semibold text-yellow-500">
              {" "}
              {t("description.colors.yellow")}
            </span>{" "}
            —{t("description.colors.meaning")}
          </p>
        </motion.div>

        {/* IMAGE RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div>
            <Image
              src="/imgs/hero/mit-logo-full.png"
              alt="MIT Visual"
              width={900}
              height={900}
              className="w-full h-auto drop-shadow-xl"
            />
            <div className="flex space-x-0.5 w-full justify-center align-center">
              <span className="text-6xl font-bold text-[#4d93fb] monstera-font tracking-widest">
                M
              </span>
              <span className="text-6xl font-bold text-[#11b505] monstera-font tracking-widest">
                I
              </span>
              <span className="text-6xl font-bold text-[#f1c34c] monstera-font tracking-widest">
                T
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
