"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Megaphone } from "lucide-react";

import PageHero from "../reusable/PageHero";
import { toLocale } from "@/lib/i18n";

const Hero = () => {
  const t = useTranslations("highlights");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = toLocale(params?.locale);

  const title = t("heroTitle");
  const words = title.trim().split(/\s+/).length;

  return (
    <PageHero
      eyebrow={tNav("highlights")}
      title={title}
      accentFrom={words - 1}
      lede={t("stayUpdated")}
      image={{ src: "/imgs/about/one-year-mit.jpg" }}
      inset={{ src: "/imgs/events/ai-cer.jpg" }}
      actions={
        <Link href={`/${locale}/events`} className="btn btn-ink btn-sheen">
          <Megaphone className="h-4 w-4" />
          {tNav("events")}
        </Link>
      }
    />
  );
};

export default Hero;
