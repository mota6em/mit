"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import RevealText from "@/components/reusable/RevealText";
import { EyebrowRule } from "@/components/reusable/Ornament";
import Reveal, { prefersReducedMotion } from "@/components/reusable/Reveal";

const STAGE = [
  "/imgs/home/hero/picnic.jpg",
  "/imgs/home/hero/picnic2.jpg",
  "/imgs/home/hero/4.jpg",
  "/imgs/home/hero/9.jpg",
  "/imgs/home/hero/hero-bg-3.jpg",
  "/imgs/home/hero/workshop.jpg",
];

const SLIDE_MS = 6400;

export default function Hero() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActive(index);
    setReached((max) => (index > max ? index : max));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % STAGE.length;
        setReached((max) => (next > max ? next : max));
        return next;
      });
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches)
      return;
    if (prefersReducedMotion()) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      frame = 0;
      el.style.setProperty("--parallax-x", `${nextX}px`);
      el.style.setProperty("--parallax-y", `${nextY}px`);
    };

    const onMove = (event: PointerEvent) => {
      nextX = (event.clientX / window.innerWidth - 0.5) * -22;
      nextY = (event.clientY / window.innerHeight - 0.5) * -14;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const titleWords = t("hero.title").trim().split(/\s+/).length;

  return (
    <section
      style={{ marginTop: "calc(var(--header-height) * -1)" }}
      className="relative min-h-[94svh] w-full overflow-hidden bg-ink-950"
    >
      <div
        ref={stageRef}
        className="absolute inset-0 scale-[1.06]"
        style={{
          transform:
            "translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0) scale(1.06)",
          transition: "transform 900ms var(--ease-out-expo)",
        }}
      >
        {STAGE.map((src, index) =>
          index > reached + 1 ? null : (
            <div
              key={src}
              aria-hidden={index !== active}
              className="absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: index === active ? 1 : 0 }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={index === 0}
                quality={74}
                sizes="100vw"
                className={`object-cover ${
                  index === active ? "animate-ken-burns" : "scale-[1.02]"
                }`}
              />
            </div>
          )
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/25 to-transparent rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_10%,transparent,rgba(10,13,9,0.6))]" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex min-h-[94svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-36 sm:px-8 md:pb-20 lg:px-12">
        <div className="max-w-3xl">
          <Reveal
            as="span"
            y={0}
            className="eyebrow mb-7 flex items-center gap-3 text-brand-gold"
          >
            <EyebrowRule />
            {tNav("subtitle")}
          </Reveal>

          <RevealText
            as="h1"
            text={t("hero.title")}
            accentFrom={titleWords - 1}
            accentClassName="text-brand-gold"
            delay={120}
            className="display display-2 text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
          />

          <Reveal
            as="p"
            y={16}
            delay={560}
            className="lede mt-7 max-w-lg text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]"
          >
            {t("hero.subtitle1")}
          </Reveal>

          <Reveal
            y={16}
            delay={700}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href={`/${locale}/join-mit`}
              className="btn btn-gold btn-sheen group"
            >
              {tNav("join mit")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
            </Link>

            <Link
              href={`/${locale}/events`}
              className="btn btn-ghost-light"
            >
              {tNav("events")}
            </Link>
          </Reveal>
        </div>

        <Reveal
          y={12}
          delay={900}
          className="mt-14 flex items-end justify-between gap-6 border-t border-white/15 pt-6"
        >
          <span className="numeral text-sm text-white/55">
            <span className="text-white">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="mx-1.5 opacity-40">/</span>
            {String(STAGE.length).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            {STAGE.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${index + 1}`}
                className="group h-6 py-2.5"
              >
                <span
                  className={`block h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    index === active
                      ? "w-10 bg-brand-gold"
                      : "w-5 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="animate-scroll-cue h-1.5 w-1 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
