"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const [startedFrom, setStartedFrom] = useState<string | null>(null);

  const phase =
    startedFrom === null
      ? "idle"
      : startedFrom === pathname
      ? "loading"
      : "done";

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      setStartedFrom(window.location.pathname);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (phase !== "done") return;

    const timer = setTimeout(() => setStartedFrom(null), 420);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px]"
    >
      <div
        data-phase={phase}
        className="route-progress h-full origin-left bg-gradient-to-r from-brand-green via-brand-gold to-brand-sky"
      />
    </div>
  );
}
