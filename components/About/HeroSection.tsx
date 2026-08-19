"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import PageHero from "../reusable/PageHero";
import { toLocale } from "@/lib/i18n";
import { PHOTO } from "@/lib/media";

const HeroSection = () => {
  const t = useTranslations("aboutMIT.hero");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = toLocale(params?.locale);

  const title = t("title");
  const words = title.trim().split(/\s+/).length;

  return (
    <PageHero
      eyebrow={tNav("about mit")}
      title={title}
      accentFrom={words - 1}
      lede={t("description")}
      image={{ src: PHOTO.femysoAward, alt: t("photoAlt") }}
      inset={{ src: PHOTO.mitBadgePecs }}
      caption={t("photoCaption")}
      actions={
        <Link
          href={`/${locale}/join-mit`}
          className="btn btn-ink btn-sheen group"
        >
          {tNav("join mit")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
        </Link>
      }
    />
  );
};

export default HeroSection;
