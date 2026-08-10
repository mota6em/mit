import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "./Reveal";
import RevealText from "./RevealText";
import { EyebrowRule, StarMark } from "./Ornament";

type CtaBandProps = {
  eyebrow: string;
  title: string;
  accentFrom?: number;
  description?: string;
  primary: { href: string; label: string; external?: boolean };
  secondary?: { href: string; label: string; external?: boolean };
};

export default function CtaBand({
  eyebrow,
  title,
  accentFrom,
  description,
  primary,
  secondary,
}: CtaBandProps) {
  const externalProps = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <section className="defer-paint relative overflow-hidden bg-ink-900 py-24 md:py-32">
      <div className="pattern-star-gold mask-radial pointer-events-none absolute -start-32 -top-32 h-[32rem] w-[32rem] opacity-[0.07]" />
      <div className="pointer-events-none absolute -end-24 bottom-[-10rem] h-[28rem] w-[28rem] rounded-full bg-brand-green/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal
          y={0}
          scale={0.7}
          className="mb-8 h-10 w-10 text-brand-gold/70"
        >
          <StarMark />
        </Reveal>

        <Reveal
          as="span"
          y={0}
          delay={60}
          className="eyebrow mb-6 inline-flex items-center gap-3 text-brand-gold"
        >
          <EyebrowRule />
          {eyebrow}
        </Reveal>

        <RevealText
          as="h2"
          text={title}
          delay={140}
          accentFrom={accentFrom}
          accentClassName="text-brand-gold"
          className="display display-3 text-white"
        />

        {description && (
          <Reveal
            as="p"
            y={14}
            delay={300}
            className="lede mt-7 max-w-xl text-ink-300"
          >
            {description}
          </Reveal>
        )}

        <Reveal
          y={16}
          delay={400}
          className="mt-11 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href={primary.href}
            {...(primary.external ? externalProps : {})}
            className="btn btn-gold btn-sheen group"
          >
            {primary.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
          </Link>

          {secondary && (
            <Link
              href={secondary.href}
              {...(secondary.external ? externalProps : {})}
              className="btn btn-ghost-light"
            >
              {secondary.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
