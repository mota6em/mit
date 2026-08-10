"use client";
import { Check, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import Section from "../reusable/Section";
import Reveal from "../reusable/Reveal";

const AchievementsSection = () => {
  const t = useTranslations("aboutMIT.achievements");
  const listItems = t.raw("list");
  const items = Array.isArray(listItems) ? listItems : [];

  return (
    /**
     * The page closes on a dark band. After four light sections it lands as a
     * deliberate final beat and gives the track record real weight, instead of
     * trailing off into another grid of white cards.
     */
    <Section tone="dark" width="default" className="overflow-hidden" deferPaint>
      <div className="pattern-geo pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-[0.06] [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <Reveal
          y={0}
          scale={0.7}
          className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-brand-gold"
        >
          <Trophy className="h-7 w-7" />
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="display text-[1.85rem] text-white sm:text-4xl md:text-[2.6rem]"
        >
          {t("title")}
        </Reveal>

        <Reveal
          variant="rule"
          delay={220}
          className="mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-brand-gold to-brand-green"
        />
      </div>

      <ul className="relative mt-14 grid gap-x-10 gap-y-1 md:grid-cols-2">
        {items.map((_, index) => (
          <Reveal
            as="li"
            key={index}
            y={16}
            delay={index * 60}
            className="group flex items-start gap-4 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-white/[0.06]"
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <p className="text-[0.95rem] leading-relaxed text-ink-200">
              {t(`list.${index}`)}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};

export default AchievementsSection;
