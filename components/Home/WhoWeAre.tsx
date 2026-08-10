"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import ViewMoreButton from "../reusable/ViewMoreButton";
import Reveal from "../reusable/Reveal";

export default function WhoWeAre() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="defer-paint relative overflow-hidden px-6 py-20 md:px-12 md:py-28 lg:px-20">
      {/* Faint tilework wash, clipped to the top-right corner */}
      <div className="pattern-geo pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-[0.045] [mask-image:radial-gradient(circle,black,transparent_70%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        {/** * Content Section */}
        <Reveal
          y={32}
          className="order-2 flex flex-col text-center lg:order-1 lg:text-start"
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
        </Reveal>

        {/** * Visual Assets Section */}
        <Reveal
          y={0}
          scale={0.94}
          delay={120}
          className="order-1 mx-auto w-full max-w-md lg:order-2"
        >
          <div className="relative">
            {/**
             * Brand-colored ambient wash. This was three separately animated
             * 256px blurred circles; a blur that large is re-rasterized on
             * every frame it moves, and three of them ran forever whether or
             * not the section was on screen. A single static gradient reads
             * the same at a fraction of the cost.
             */}
            <div className="pointer-events-none absolute inset-0 -m-10 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(0,173,239,0.20),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(45,155,74,0.20),transparent_55%),radial-gradient(circle_at_55%_45%,rgba(249,188,21,0.22),transparent_60%)] blur-2xl" />

            <Image
              src="/imgs/home/aboutmit/mit-main-log-no-bg.png"
              alt="MIT Visual"
              width={900}
              height={900}
              sizes="(max-width: 1024px) 90vw, 448px"
              quality={80}
              className="relative z-10 h-auto w-full drop-shadow-[0_20px_40px_rgba(16,20,15,0.15)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
