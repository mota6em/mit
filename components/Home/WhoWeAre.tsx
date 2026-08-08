"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import ViewMoreButton from "../reusable/ViewMoreButton";

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhoWeAre() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20">
      {/* Faint tilework wash, clipped to the top-right corner */}
      <div className="pattern-geo pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-[0.045] [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        {/** * Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="order-2 flex flex-col text-center lg:order-1 lg:text-left"
        >
          <span className="eyebrow mb-4 inline-flex items-center justify-center gap-2 text-brand-green-dark lg:justify-start">
            <span className="h-px w-6 bg-brand-gold" />
            MIT
          </span>

          <h2 className="display text-[2rem] text-ink-900 sm:text-4xl md:text-[2.75rem]">
            {t("whoWeAre.title")}
            <span className="text-brand-gold">{"?"}</span>
          </h2>

          <div className="mt-7 space-y-5">
            {/* Lead paragraph gets an accent rule to anchor the column */}
            <p className="lede relative text-ink-700 lg:border-s-2 lg:border-brand-gold lg:ps-6">
              {t("whoWeAre.description.intro")}
            </p>
            <p className="lede lg:ps-6">{t("whoWeAre.description.mission")}</p>
          </div>

          <div className="mt-10 flex justify-center lg:justify-start">
            <ViewMoreButton
              href={`/${locale}/about`}
              label={t("whoWeAre.learnMore")}
              variant="inline"
            />
          </div>
        </motion.div>

        {/** * Visual Assets Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="order-1 mx-auto w-full max-w-md lg:order-2"
        >
          <div className="relative">
            {/* Brand-colored ambient blobs behind the mark */}
            <div className="animate-blob absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-sky opacity-20 mix-blend-multiply blur-3xl" />
            <div className="animate-blob animation-delay-2000 absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-green opacity-20 mix-blend-multiply blur-3xl" />
            <div className="animate-blob animation-delay-4000 absolute left-20 top-20 h-64 w-64 rounded-full bg-brand-gold opacity-25 mix-blend-multiply blur-3xl" />

            <Image
              src="/imgs/home/aboutmit/mit-main-log-no-bg.png"
              alt="MIT Visual"
              width={900}
              height={900}
              className="relative z-10 h-auto w-full drop-shadow-[0_20px_40px_rgba(16,20,15,0.15)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
