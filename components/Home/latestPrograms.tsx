"use client";
import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    img: "/imgs/hero/hero-bg-1.jpg",
    title: "Youth Leadership Workshop",
    desc: "Empowering young minds ✨",
    href: "/programs/youth-leadership",
    profile: "/imgs/icon.jpg",
  },
  {
    img: "/imgs/hero/hero-bg-3.jpg",
    title: "Community Football Day",
    desc: "Teamwork, vibes, good energy ⚽",
    href: "/programs/football-day",
    profile: "/imgs/icon.jpg",
  },
  {
    img: "/imgs/hero/hero-bg-4.jpg",
    title: "Winter Charity Drive",
    desc: "Small acts, big impact ❄️",
    href: "/programs/winter-charity",
    profile: "/imgs/icon.jpg",
  },
];

export default function LatestProgramsIG() {
  return (
    <section className="mt-12 px-4 md:px-10 flex items-center justify-center flex-col gap-y-2">
      <h2 className="text-4xl font-bold mb-8 Carena-font text-center text-yellow-800">
        Our Latest Programs
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <Link
            key={i}
            href={p.href}
            className="bg-white rounded-2xl shadow-md overflow-hidden border hover:scale-105 transition-transform duration-200"
          >
            {/* IG-style top bar */}
            <div className="flex items-center gap-3 p-3">
              <Image
                src={p.profile}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="font-semibold text-sm">mit.community</span>
            </div>

            {/* post image */}
            <div className="w-full h-64 bg-gray-200 relative">
              <Image src={p.img} alt={p.title} fill className="object-cover" />
            </div>

            {/* caption */}
            <div className="p-3 text-sm">
              <span className="font-semibold mr-2">{p.title}</span>
              <span>{p.desc}</span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/programs"
        className="inline-block mt-4 font-semibold outline outline-yellow-800 text-yellow-800 hover:text-yellow-600 rounded-2xl px-3 py-1"
      >
        Show more →
      </Link>
    </section>
  );
}
