import Image from "next/image";
import type { ReactNode } from "react";

import Reveal from "./Reveal";
import RevealText from "./RevealText";
import { EyebrowRule } from "./Ornament";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accentFrom?: number;
  lede?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  image: { src: string; alt?: string; position?: string };
  inset?: { src: string; alt?: string; position?: string };
  caption?: string;
  className?: string;
  priority?: boolean;
};

export default function PageHero({
  eyebrow,
  title,
  accentFrom,
  lede,
  actions,
  meta,
  image,
  inset,
  caption,
  className,
  priority = true,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-paper pb-16 pt-14 md:pb-24 md:pt-20",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      <div className="pattern-star mask-radial pointer-events-none absolute -end-24 -top-24 h-[26rem] w-[26rem] opacity-[0.05]" />
      <div className="pointer-events-none absolute -start-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand-gold/[0.07] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12">
        <div className="flex flex-col">
          <Reveal
            as="span"
            y={0}
            className="eyebrow mb-6 inline-flex items-center gap-3 text-brand-green-dark"
          >
            <EyebrowRule />
            {eyebrow}
          </Reveal>

          <RevealText
            as="h1"
            text={title}
            accentFrom={accentFrom}
            delay={80}
            className="display display-2 text-ink-900"
          />

          {lede && (
            <Reveal as="p" y={16} delay={320} className="lede mt-7 max-w-xl">
              {lede}
            </Reveal>
          )}

          {actions && (
            <Reveal
              y={16}
              delay={420}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {actions}
            </Reveal>
          )}

          {meta && (
            <Reveal y={12} delay={520} className="mt-12">
              {meta}
            </Reveal>
          )}
        </div>

        <Reveal
          y={28}
          scale={0.97}
          delay={200}
          className="relative mx-auto w-full max-w-lg lg:mx-0"
        >
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2rem] border border-brand-gold/35 md:-inset-5"
          />

          <div className="media-zoom group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-ink-100 shadow-[0_4px_8px_rgba(18,22,15,0.06),0_28px_56px_-14px_rgba(18,22,15,0.2)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              fill
              priority={priority}
              quality={78}
              sizes="(max-width: 1024px) 92vw, 480px"
              style={{ objectPosition: image.position }}
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />

            {caption && (
              <span className="absolute bottom-4 end-4 max-w-[70%] rounded-full bg-ink-950/55 px-3.5 py-1.5 text-[0.75rem] font-medium text-white/90 backdrop-blur-md">
                {caption}
              </span>
            )}
          </div>

          {inset && (
            <div className="absolute -bottom-8 -start-6 hidden h-36 w-32 overflow-hidden rounded-2xl border-[5px] border-paper bg-ink-100 shadow-[0_18px_36px_-14px_rgba(18,22,15,0.4)] sm:block lg:-start-10 lg:h-44 lg:w-40">
              <Image
                src={inset.src}
                alt={inset.alt ?? ""}
                fill
                quality={70}
                sizes="160px"
                style={{ objectPosition: inset.position }}
                className="object-cover"
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
