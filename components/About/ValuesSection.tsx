"use client";

import { useTranslations } from "next-intl";

import Reveal from "../reusable/Reveal";
import RevealText from "../reusable/RevealText";
import { EyebrowRule, StarMark } from "../reusable/Ornament";

type Value = {
  name: string;
  term: string;
  script: string;
  description: string;
};

function trackSpot(event: React.PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

export default function ValuesSection() {
  const t = useTranslations("aboutMIT.values");
  const raw = t.raw("items");
  const values: Value[] = Array.isArray(raw) ? raw : [];

  if (values.length === 0) return null;

  return (
    <section
      id="values"
      className="defer-paint relative overflow-hidden bg-ink-950 py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <div className="pattern-star-gold mask-radial pointer-events-none absolute -start-32 -top-32 h-[32rem] w-[32rem] opacity-[0.06]" />
      <div className="pointer-events-none absolute -end-40 bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-brand-green/12 blur-3xl" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start md:max-w-2xl">
          <Reveal
            as="span"
            y={0}
            className="eyebrow mb-5 inline-flex items-center gap-3 text-brand-gold"
          >
            <EyebrowRule />
            {t("eyebrow")}
          </Reveal>

          <RevealText
            as="h2"
            text={t("title")}
            delay={120}
            className="display display-4 text-white"
          />

          <Reveal as="p" y={14} delay={260} className="lede mt-6 text-ink-300">
            {t("lede")}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.09] sm:grid-cols-2 md:mt-16 md:rounded-[2rem]">
          {values.map((value, index) => (
            <Reveal
              as="article"
              key={value.term}
              y={26}
              delay={index * 90}
              onPointerMove={trackSpot}
              className="spotlight group relative overflow-hidden bg-ink-950 p-7 transition-colors duration-500 hover:bg-[#0d110c] sm:p-9 md:p-11"
            >
              <span
                aria-hidden="true"
                lang="ar"
                dir="rtl"
                style={{ fontFamily: "var(--font-cairo-ar), serif" }}
                className="pointer-events-none absolute -top-3 end-4 select-none text-[4.5rem] font-bold leading-none text-white/[0.055] transition-colors duration-700 group-hover:text-brand-gold/20 sm:text-[5.5rem] md:end-6 md:text-[6.5rem]"
              >
                {value.script}
              </span>

              <div className="relative flex h-full flex-col">
                <span className="numeral text-[0.72rem] tracking-widest text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="display mt-5 text-[clamp(1.5rem,4vw,1.95rem)] leading-tight text-white">
                  {value.name}
                </h3>

                <span className="eyebrow mt-3 text-brand-gold">
                  {value.term}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-6 block h-px w-10 bg-brand-gold/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-20"
                />

                <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-300 transition-colors duration-500 group-hover:text-ink-200">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          y={16}
          delay={220}
          className="mt-10 flex items-center justify-center gap-4 text-center md:mt-12"
        >
          <span className="h-4 w-4 shrink-0 text-brand-gold/60">
            <StarMark strokeWidth={2.5} />
          </span>
          <p className="text-[0.9rem] italic text-ink-400">{t("closing")}</p>
          <span className="h-4 w-4 shrink-0 text-brand-gold/60">
            <StarMark strokeWidth={2.5} />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
