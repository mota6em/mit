"use client";
import { useState } from "react";
import { HiOutlineMail, HiSparkles } from "react-icons/hi";
import { useTranslations } from "next-intl";
import Reveal from "../reusable/Reveal";

export default function JoinMITNewsletterSection() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "exists" | "error">(
    "idle"
  );
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

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 ">
      <Reveal
        id="subscribe"
        y={40}
        className="relative bg-ink-900 rounded-[2.5rem] p-6 md:p-16 overflow-hidden text-center md:text-start"
      >
        {/* Background Patterns for the dark card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-dark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-sky/10 rounded-full blur-3xl" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-4 md:gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
              <HiOutlineMail className="text-brand-gold-dark" />
              <span className="text-white text-xs font-semibold uppercase tracking-wider">
                {t("newsletterTag") || "Newsletter"}
              </span>
            </div>

            <h2 className="display text-3xl text-white md:text-5xl">
              {t("stayUpdated") || "Stay In The Loop"}
            </h2>

            <p className="text-ink-300 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {t("subscriptionDescription") ||
                "Join our community newsletter to receive updates on events, workshops, and volunteer opportunities."}
            </p>

            {/* Feature List  */}
            <ul className="space-y-3 text-sm text-ink-300 hidden md:block">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-dark" />
                <span>{t("benefit1")}</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-dark" />
                <span>{t("benefit2")}</span>
              </li>
            </ul>
          </div>

          {/* Right: Subscription Form */}
          <div className="relative">
            <div className="md:bg-white/5 backdrop-blur-sm md:border md:border-white/10 rounded-3xl md:p-8 relative">
              {status === "success" ? (
                <div className="text-center py-10">
                  <HiSparkles className="text-brand-gold-dark text-5xl mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold">
                    {t("successMessage")}
                  </h3>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white outline-none transition-colors placeholder:text-ink-400 focus:border-brand-gold"
                  />
                  <input
                    required
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white outline-none transition-colors placeholder:text-ink-400 focus:border-brand-gold"
                  />

                  {status === "exists" && (
                    <p className="text-brand-gold-dark text-sm">
                      {t("alreadySubscribed")}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-400 text-sm">{t("errorMessage")}</p>
                  )}

                  <button
                    disabled={submitting}
                    type="submit"
                    className="w-full cursor-pointer py-4 bg-brand-gold-dark text-ink-900 font-semibold rounded-xl hover:bg-brand-gold transition-all disabled:opacity-50"
                  >
                    {submitting ? t("subscribing") : t("subscribe")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
