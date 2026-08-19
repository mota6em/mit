"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

const SHOW_AFTER = 700;

export default function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("backToTop")}
      title={t("backToTop")}
      data-visible={visible}
      className="back-to-top group fixed bottom-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white/90 text-ink-700 shadow-[0_4px_8px_rgba(16,20,15,0.06),0_18px_36px_-14px_rgba(16,20,15,0.35)] backdrop-blur-md transition-[opacity,transform,color,border-color] duration-500 hover:border-brand-green hover:text-brand-green-dark md:h-12 md:w-12"
    >
      <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
