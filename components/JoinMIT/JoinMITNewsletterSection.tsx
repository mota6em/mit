"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Mail, ShieldCheck } from "lucide-react";

import Reveal from "../reusable/Reveal";
import RevealText from "../reusable/RevealText";
import { EyebrowRule, StarMark } from "../reusable/Ornament";

type Status = "idle" | "success" | "exists" | "error";

export default function JoinMITNewsletterSection() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const t = useTranslations("joinMIT");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });

      if (res.status === 201) setStatus("success");
      else if (res.status === 409) setStatus("exists");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-white/20 bg-white/[0.07] px-5 py-3.5 text-white outline-none transition-colors duration-300 placeholder:text-ink-400 focus:border-brand-gold focus:bg-white/[0.11]";

  return (
    <section className="defer-paint bg-paper px-5 pb-24 sm:px-8 md:pb-32 lg:px-12">
      <Reveal
        id="subscribe"
        y={30}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink-900 p-8 md:p-14"
      >
        <div className="pattern-star-gold mask-radial pointer-events-none absolute -end-20 -top-20 h-[24rem] w-[24rem] opacity-[0.07]" />
        <div className="pointer-events-none absolute -start-24 bottom-[-8rem] h-72 w-72 rounded-full bg-brand-sky/12 blur-3xl" />
        <div className="grain absolute inset-0" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow inline-flex items-center gap-3 text-brand-gold">
              <EyebrowRule />
              {t("newsletterTag")}
            </span>

            <RevealText
              as="h2"
              text={t("stayUpdated")}
              delay={80}
              className="display display-4 mt-6 text-white"
            />

            <p className="lede mt-6 max-w-md text-ink-300">
              {t("subscriptionDescription")}
            </p>

            <ul className="mt-8 space-y-3">
              {[t("benefit1"), t("benefit2")].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-ink-300"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-green/20 text-brand-green">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="h-11 w-11 text-brand-gold">
                  <StarMark />
                </span>
                <p className="display mt-6 text-xl text-white">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3.5">
                <div>
                  <label htmlFor="newsletter-name" className="sr-only">
                    {t("namePlaceholder")}
                  </label>
                  <input
                    id="newsletter-name"
                    required
                    type="text"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={fieldClass}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t("emailPlaceholder")}
                  </label>
                  <Mail className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  <input
                    id="newsletter-email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`${fieldClass} pe-12`}
                  />
                </div>

                {status === "exists" && (
                  <p className="text-sm text-brand-gold">
                    {t("alreadySubscribed")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400">{t("errorMessage")}</p>
                )}

                <button
                  disabled={submitting}
                  type="submit"
                  className="btn btn-gold btn-sheen group w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t("subscribing") : t("subscribe")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
                </button>

                <p className="flex items-center justify-center gap-2 pt-1 text-xs text-ink-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t("privacyNote")}
                </p>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
