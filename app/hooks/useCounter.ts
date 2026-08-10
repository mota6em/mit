import { useEffect, useRef, useState } from "react";

import { LOCALE_META, type Locale } from "@/lib/i18n";

const DURATION_MS = 1600;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const useCounter = (
  value: number,
  suffix: string,
  isInView: boolean,
  locale: Locale
) => {
  const [display, setDisplay] = useState(() => `0${suffix}`);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isInView) return;

    const format = new Intl.NumberFormat(LOCALE_META[locale].intl);
    const duration = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : DURATION_MS;

    const start = performance.now();

    const tick = (now: number) => {
      const progress =
        duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const current = Math.floor(easeOut(progress) * value);
      setDisplay(`${format.format(current)}${suffix}`);

      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [isInView, value, suffix, locale]);

  return display;
};
