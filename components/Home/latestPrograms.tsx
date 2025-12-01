"use client";
import Link from "next/link";
import BlogCard from "../BlogCard";
import { useTranslations } from "next-intl";

export default function LatestPrograms() {
  const t = useTranslations("latestPrograms");
  // Inline program data
  const programs = [
    {
      id: "youth-leadership",
      img: "/imgs/hero/hero-bg-1.jpg",
      titleKey: "programs.youthLeadership.title",
      descKey: "programs.youthLeadership.desc",
      profile: "/imgs/icon.jpg",
    },
    {
      id: "community-football",
      img: "/imgs/hero/hero-bg-3.jpg",
      titleKey: "programs.communityFootball.title",
      descKey: "programs.communityFootball.desc",
      profile: "/imgs/icon.jpg",
    },
    {
      id: "winter-charity",
      img: "/imgs/hero/hero-bg-4.jpg",
      titleKey: "programs.winterCharity.title",
      descKey: "programs.winterCharity.desc",
      profile: "/imgs/icon.jpg",
    },
  ];

  return (
    <section className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6">
      <h2 className="text-4xl font-bold Carena-font text-center text-yellow-800">
        {t("title")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {programs.map((p) => (
          <Link key={p.id} href={`/programs/${p.id}`}>
            <BlogCard
              bgImg={p.img}
              authorImg="/imgs/icon.jpg"
              authorName={t("authorName")}
              readTime={t("newProgram")}
              title={t(p.titleKey)}
              desc={t(p.descKey)}
            />
          </Link>
        ))}
      </div>

      <div className="mt-1">
        <Link
          href="/programs"
          className="text-yellow-800 rounded-full outline outline-yellow-800 px-3 py-1 font-semibold hover:bg-yellow-800 hover:text-white transition-colors"
        >
          {t("showAll")}
        </Link>
      </div>
    </section>
  );
}
