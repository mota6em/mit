"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import ViewMoreButton from "../reusable/ViewMoreButton";

export default function WhoWeAre() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div>
      {/** * Main Container Animation */}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center w-full pb-10 pt-10 md:py-10 md:mt-6 px-6 md:px-12 lg:px-20"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-15 md:gap-24">
          {/** * Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-center lg:text-left flex flex-col gap-3"
          >
            <h2 className="text-4xl text-gray-800 font-semibold">
              {t("whoWeAre.title")}
              {"?"}
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-medium">
              {t("whoWeAre.description.intro")}
              <br />
              <br />
              {t("whoWeAre.description.mission")}
            </p>
          </motion.div>

          {/** * Visual Assets Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mt-5 md:mt-0"
          >
            <div className="relative">
              <Image
                src="/imgs/home/aboutmit/mit-main-log-no-bg.png"
                alt="MIT Visual"
                width={900}
                height={900}
                className="w-full max-w-md md:w-full h-auto drop-shadow-xl relative z-10"
              />

              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4d93fb] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#11b505] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
              <div className="absolute top-20 left-20 w-64 h-64 bg-[#f1c34c] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
            </div>
          </motion.div>
        </div>

        {/** * Navigation Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 md:mt-12"
        >
          <ViewMoreButton
            href={`/${locale}/about`}
            label={t("whoWeAre.learnMore")}
            variant="inline"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
