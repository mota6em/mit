"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { CalendarDays, History } from "lucide-react";

import PageHero from "../reusable/PageHero";
import NextEventStrip from "./NextEventStrip";
import { toLocale } from "@/lib/i18n";
import { PHOTO } from "@/lib/media";

const Hero = () => {
  const t = useTranslations("events");
  const params = useParams();
  const locale = toLocale(params?.locale);

  const title = t("hero.title");
  const words = title.trim().split(/\s+/).length;

  return (
    <PageHero
      eyebrow={t("hero.tag")}
      title={title}
      accentFrom={words - 1}
      lede={t("hero.subtitle")}
      image={{ src: PHOTO.summerProgram, position: "50% 72%" }}
      inset={{ src: PHOTO.parkPicnic }}
      caption={t("hero.joinStats")}
      actions={
        <>
          <Link
            href={`/${locale}/events#upcoming-events`}
            className="btn btn-ink btn-sheen"
          >
            <CalendarDays className="h-4 w-4" />
            {t("hero.primaryBtn")}
          </Link>
          <Link
            href={`/${locale}/events#past-events`}
            className="btn btn-outline"
          >
            <History className="h-4 w-4" />
            {t("hero.secondaryBtn")}
          </Link>
        </>
      }
      meta={<NextEventStrip />}
    />
  );
};

export default Hero;
