"use client";

import { useTranslations } from "next-intl";

import Reveal from "@/components/reusable/Reveal";
import { StarMark } from "@/components/reusable/Ornament";

const AYAH = "وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰ";

export default function AyahBand() {
  const t = useTranslations("home.ayah");

  return (
    <section className="defer-paint relative overflow-hidden bg-ink-950 py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-gold/[0.11] blur-[100px]" />
      <div className="pattern-star-gold mask-radial pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal y={0} scale={0.6} className="h-11 w-11 text-brand-gold/80">
          <StarMark />
        </Reveal>

        <Reveal
          as="p"
          y={22}
          delay={140}
          dir="rtl"
          lang="ar"
          style={{ fontFamily: "var(--font-cairo-ar), serif" }}
          className="mt-10 text-[clamp(1.65rem,5.2vw,3.1rem)] font-bold leading-[1.75] text-white [text-shadow:0_2px_30px_rgba(249,188,21,0.18)]"
        >
          {AYAH}
        </Reveal>

        <Reveal
          variant="rule"
          delay={420}
          className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
        />

        <Reveal
          as="p"
          y={16}
          delay={520}
          className="display mt-10 max-w-xl text-[clamp(1.15rem,2.4vw,1.6rem)] font-normal italic leading-relaxed text-ink-200"
        >
          {t("translation")}
        </Reveal>

        <Reveal
          as="span"
          y={12}
          delay={640}
          className="eyebrow mt-7 text-brand-gold/80"
        >
          {t("reference")}
        </Reveal>
      </div>
    </section>
  );
}
