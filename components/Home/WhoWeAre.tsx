"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import Reveal from "../reusable/Reveal";
import RevealText from "../reusable/RevealText";
import ViewMoreButton from "../reusable/ViewMoreButton";
import Marquee from "../reusable/Marquee";
import { EyebrowRule } from "../reusable/Ornament";
import { toLocale } from "@/lib/i18n";
import { PHOTO } from "@/lib/media";

export default function WhoWeAre() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = toLocale(params?.locale);

  const rawValues = t.raw("values");
  const values: string[] = Array.isArray(rawValues) ? rawValues : [];

  return (
    <>
      <section className="defer-paint relative overflow-hidden bg-paper px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="pattern-star mask-radial pointer-events-none absolute -end-24 -top-24 h-80 w-80 opacity-[0.05]" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div className="order-2 flex flex-col lg:order-1">
            <Reveal
              as="span"
              y={0}
              className="eyebrow mb-6 inline-flex items-center gap-3 text-brand-green-dark"
            >
              <EyebrowRule />
              MIT
            </Reveal>

            <RevealText
              as="h2"
              text={t("whoWeAre.title")}
              delay={80}
              className="display display-4 text-ink-900"
            />

            <div className="relative mt-8 ps-6">
              <span className="absolute inset-y-1 start-0 w-[2px] rounded-full bg-gradient-to-b from-brand-gold via-brand-gold/60 to-transparent" />
              <Reveal as="p" y={16} delay={220} className="lede text-ink-700">
                {t("whoWeAre.description.intro")}
              </Reveal>
              <Reveal as="p" y={16} delay={320} className="prose-body mt-5">
                {t("whoWeAre.description.mission")}
              </Reveal>
            </div>

            <Reveal y={16} delay={420} className="mt-10">
              <ViewMoreButton
                href={`/${locale}/about`}
                label={t("whoWeAre.learnMore")}
                variant="inline"
              />
            </Reveal>
          </div>

          <Reveal
            y={24}
            scale={0.97}
            delay={160}
            className="relative order-1 mx-auto w-full max-w-md lg:order-2"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] border border-brand-green/25 md:-inset-6"
            />

            <div className="media-zoom group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-ink-100 shadow-[0_4px_8px_rgba(18,22,15,0.06),0_28px_56px_-14px_rgba(18,22,15,0.2)]">
              <Image
                src={PHOTO.openFloor}
                alt={t("whoWeAre.photoAlt")}
                fill
                quality={76}
                sizes="(max-width: 1024px) 92vw, 440px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {values.length > 0 && (
        <div className="relative overflow-hidden border-y border-ink-200 bg-paper-tint py-6">
          <Marquee items={values} duration={46} />
        </div>
      )}
    </>
  );
}
