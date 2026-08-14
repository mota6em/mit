"use client";

import { useTranslations } from "next-intl";
import { Clock, Mail } from "lucide-react";

import Section from "../reusable/Section";
import Reveal from "../reusable/Reveal";
import RevealText from "../reusable/RevealText";
import JoinMITVolunteerComposer from "./JoinMITVolunteerComposer";
import { EyebrowRule } from "../reusable/Ornament";
import { CONTACT_EMAIL } from "@/lib/seo";

type Step = { title: string; text: string };

export default function JoinMITVolunteerSection() {
  const t = useTranslations("joinMIT.volunteer");
  const raw = t.raw("steps");
  const steps: Step[] = Array.isArray(raw) ? raw : [];

  return (
    <Section id="volunteer" tone="plain" width="default" deferPaint>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
        <div className="flex flex-col items-start">
          <Reveal
            as="span"
            y={0}
            className="eyebrow mb-5 inline-flex items-center gap-3 text-brand-green-dark"
          >
            <EyebrowRule />
            {t("eyebrow")}
          </Reveal>

          <RevealText
            as="h2"
            text={t("title")}
            delay={120}
            className="display display-4 text-ink-900"
          />

          <Reveal as="p" y={14} delay={240} className="lede mt-6">
            {t("description")}
          </Reveal>
        </div>

        <Reveal
          y={20}
          delay={200}
          className="rounded-[1.5rem] border border-brand-green/25 bg-brand-green-soft/60 p-6 sm:p-7"
        >
          <span className="eyebrow text-brand-green-dark">
            {t("emailLabel")}
          </span>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-underline mt-4 inline-flex items-center gap-2.5 break-all text-[1.05rem] font-semibold text-ink-900 sm:text-[1.15rem]"
          >
            <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span dir="ltr">{CONTACT_EMAIL}</span>
          </a>

          <p className="mt-5 inline-flex items-center gap-2.5 text-[0.85rem] font-medium text-brand-green-dark">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0" />
            {t("note")}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 md:mt-20">
        <Reveal as="h3" y={12} className="eyebrow text-ink-500">
          {t("stepsTitle")}
        </Reveal>

        <ol className="mt-7 grid border-t border-ink-200 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              y={22}
              delay={index * 90}
              className="group relative border-b border-ink-200 py-7 pe-6 sm:[&:nth-child(odd)]:border-e sm:[&:nth-child(odd)]:pe-8 lg:pe-8 lg:[&:not(:last-child)]:border-e"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-brand-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <span className="numeral text-[0.72rem] tracking-widest text-brand-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h4 className="display mt-4 text-[1.05rem] leading-snug text-ink-900">
                {step.title}
              </h4>

              <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-600">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal
        y={24}
        delay={120}
        className="surface mt-12 rounded-[1.75rem] p-6 sm:p-8 md:mt-16 md:rounded-[2rem] md:p-10"
      >
        <div className="mb-8 max-w-xl">
          <h3 className="display text-[1.3rem] text-ink-900 sm:text-[1.5rem]">
            {t("compose.title")}
          </h3>
          <p className="prose-body mt-3">{t("compose.lede")}</p>
        </div>

        <JoinMITVolunteerComposer />
      </Reveal>
    </Section>
  );
}
