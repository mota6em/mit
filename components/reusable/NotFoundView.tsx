"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { StarMark } from "./Ornament";

type NotFoundViewProps = {
  locale: string;
  code: string;
  title: string;
  description: string;
  cta: string;
  links: { href: string; label: string }[];
  dir?: "ltr" | "rtl";
  fullHeight?: boolean;
};

export default function NotFoundView({
  locale,
  code,
  title,
  description,
  cta,
  links,
  dir,
  fullHeight = false,
}: NotFoundViewProps) {
  return (
    <section
      lang={dir ? locale : undefined}
      dir={dir}
      className={`relative flex items-center justify-center overflow-hidden bg-ink-950 px-5 py-24 ${
        fullHeight ? "min-h-screen" : "min-h-[82vh]"
      }`}
    >
      <div className="pattern-star-gold mask-radial pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.1] blur-[100px]" />
      <div className="grain absolute inset-0" />

      <div className="relative flex max-w-lg flex-col items-center text-center">
        <Link href={`/${locale}`} aria-label="MIT" className="group">
          <Image
            src="/imgs/home/aboutmit/mit-main-log-light.png"
            alt="MIT"
            width={110}
            height={90}
            priority
            sizes="96px"
            className="h-auto w-20 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <span
          aria-hidden="true"
          className="display mt-10 select-none text-[clamp(5rem,18vw,9rem)] leading-[0.85] text-transparent"
          style={{ WebkitTextStroke: "1.5px rgba(249,188,21,0.45)" }}
        >
          {code}
        </span>

        <h1 className="display display-5 mt-8 text-white">{title}</h1>

        <p className="lede mt-5 text-ink-400">{description}</p>

        <Link href={`/${locale}`} className="btn btn-gold btn-sheen group mt-10">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:-scale-x-100" />
          {cta}
        </Link>

        <div className="mt-14 w-full">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
            <span className="h-3.5 w-3.5 text-brand-gold/60">
              <StarMark strokeWidth={2.5} />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold tracking-wide text-ink-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brand-gold hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
