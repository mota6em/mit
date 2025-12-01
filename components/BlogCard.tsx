"use client";
import Image from "next/image";

interface BlogCardProps {
  bgImg: string;
  authorImg: string;
  authorName: string;
  readTime: string;
  title: string;
  desc: string;
}

export default function BlogCard({
  bgImg,
  authorImg,
  authorName,
  readTime,
  title,
  desc,
}: BlogCardProps) {
  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
      {/* Background image */}
      <Image
        src={bgImg}
        alt={title}
        fill
        className="object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
      />

      {/* Top: Author */}
      <div className="absolute top-2 left-2 flex items-center gap-3 backdrop-blur-xs p-2 rounded-2xl">
        <Image
          src={authorImg}
          alt={authorName}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="text-white text-sm">
          <p className="font-semibold">{authorName}</p>
          <p className="text-gray-200">{readTime}</p>
        </div>
      </div>

      {/* Bottom: Title & Description */}
      <div className="absolute bottom-4 backdrop-blur-xs p-2 rounded-2xl left-4 right-4 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm mt-1 line-clamp-3">{desc}</p>
      </div>
    </div>
  );
}
