"use client";
import Link from "next/link";
import ProgramCard from "@/src/components/cards-demo-3";
import BlogCard from "../BlogCard";

export default function LatestPrograms() {
  // Inline program data
  const programs = [
    {
      id: "youth-leadership",
      img: "/imgs/hero/hero-bg-1.jpg",
      title: "Youth Leadership Workshop",
      desc: "Empowering young minds ✨ Learn leadership, teamwork, public speaking, and more.",
      profile: "/imgs/icon.jpg",
    },
    {
      id: "community-football",
      img: "/imgs/hero/hero-bg-3.jpg",
      title: "Community Football Day",
      desc: "Teamwork, vibes, good energy ⚽ Bring friends and join local mini-tournaments.",
      profile: "/imgs/icon.jpg",
    },
    {
      id: "winter-charity",
      img: "/imgs/hero/hero-bg-4.jpg",
      title: "Winter Charity Drive",
      desc: "Small acts, big impact ❄️ Collect donations for families in need.",
      profile: "/imgs/icon.jpg",
    },
  ];

  return (
    <section className="mt-12 px-4 md:px-10 flex flex-col items-center gap-y-6">
      <h2 className="text-4xl font-bold Carena-font text-center text-yellow-800">
        Our Latest Programs
      </h2>

      <div className="grid md:grid-cols-3 gap-6 w-full">
        {programs.map((p) => (
          <Link key={p.id} href={`/programs/${p.id}`}>
            <BlogCard
              bgImg={p.img}
              authorImg="/imgs/icon.jpg"
              authorName="Muszlim Ifjúsági Társaság"
              readTime="New Program"
              title={p.title}
              desc={p.desc}
            />
          </Link>
        ))}
      </div>

      <div className="mt-1">
        <Link
          href="/programs"
          className="text-yellow-800 rounded-full outline outline-yellow-800 px-3 py-1 font-semibold hover:bg-yellow-800 hover:text-white transition-colors"
        >
          Show all programs
        </Link>
      </div>
    </section>
  );
}
