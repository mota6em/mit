"use client";

import { useTranslations } from "next-intl";
import { Heart, Share2 } from "lucide-react";

import PageHero from "../reusable/PageHero";
import { PHOTO } from "@/lib/media";

export default function JoinMITHeroSection() {
  const t = useTranslations("joinMIT");

  const title = t("title");
  const words = title.trim().split(/\s+/).length;

  return (
    <PageHero
      eyebrow={t("joinUsTag")}
      title={title}
      accentFrom={words - 1}
      lede={t("subtitle")}
      image={{ src: PHOTO.winterMeetup }}
      inset={{ src: PHOTO.quranSession }}
      actions={
        <>
          <a href="#volunteer" className="btn btn-green btn-sheen">
            <Heart className="h-4 w-4" />
            {t("volunteer.button")}
          </a>
          <a href="#socials" className="btn btn-outline">
            <Share2 className="h-4 w-4" />
            {t("connect")}
          </a>
        </>
      }
    />
  );
}
