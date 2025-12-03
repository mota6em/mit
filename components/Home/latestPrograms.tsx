"use client";
import BlogCard from "../BlogCard";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LatestPrograms() {
  const t = useTranslations("latestPrograms");

  const programs = [
    {
      id: "youth-leadership",
      img: "/imgs/hero/hero-bg-1.jpg",
      titleKey: "programs.youthLeadership.title",
      descKey: "programs.youthLeadership.desc",
      date: "Dec 15, 2025",
    },
    {
      id: "community-football",
      img: "/imgs/hero/hero-bg-3.jpg",
      titleKey: "programs.communityFootball.title",
      descKey: "programs.communityFootball.desc",
      date: "Dec 20, 2025",
    },
    {
      id: "winter-charity",
      img: "/imgs/hero/hero-bg-4.jpg",
      titleKey: "programs.winterCharity.title",
      descKey: "programs.winterCharity.desc",
      date: "Dec 25, 2025",
    },
  ];

  return (
    <section className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6">
      <h2 className="text-4xl font-bold Carena-font text-center text-yellow-800">
        {t("title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {programs.map((p, index) => (
          <BlogCard
            key={p.id}
            bgImg={p.img}
            authorImg="/imgs/icon.jpg"
            authorName={t("authorName")}
            readTime={p.date}
            title={t(p.titleKey)}
            desc={t(p.descKey)}
            eventUrl={`/programs/${p.id}`}
            index={index}
            isVerified={true}
          />
        ))}
      </div>

      <div className="mt-1 mb-4">
        <Link
          href="/programs"
          className="text-yellow-800 rounded-full outline outline-yellow-800 px-3 py-1 font-semibold hover:bg-yellow-600 hover:text-white transition-colors"
        >
          {t("showAll")}
        </Link>
      </div>
    </section>
  );
}
