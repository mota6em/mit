"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Mail, Paperclip } from "lucide-react";

import { CONTACT_EMAIL } from "@/lib/seo";

const INTERESTS = ["events", "education", "media", "people", "other"] as const;
type Interest = (typeof INTERESTS)[number];

const MESSAGE_LIMIT = 700;

type CopyState = "idle" | "message" | "address" | "failed";

export default function VolunteerComposer() {
  const t = useTranslations("joinMIT.volunteer.compose");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<Interest[]>([]);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    []
  );

  const toggle = (interest: Interest) => {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const subject = useMemo(() => {
    const trimmed = name.trim();
    return trimmed ? `${t("subject")} — ${trimmed}` : t("subject");
  }, [name, t]);

  const body = useMemo(() => {
    const lines = [t("body.greeting"), "", t("body.intro"), ""];

    const trimmedName = name.trim();
    if (trimmedName) lines.push(`${t("body.name")}: ${trimmedName}`, "");

    if (selected.length > 0) {
      const labels = selected.map((key) => t(`interests.${key}`)).join(", ");
      lines.push(`${t("body.interests")}: ${labels}`, "");
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      lines.push(`${t("body.why")}:`, trimmedMessage, "");
    }

    lines.push(t("body.cv"), "", t("body.signOff"), trimmedName || "");

    return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }, [name, message, selected, t]);

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const copy = async (text: string, state: Exclude<CopyState, "failed">) => {
    if (resetTimer.current) clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(text);
      setCopyState(state);
      resetTimer.current = setTimeout(() => setCopyState("idle"), 2600);
    } catch {
      setCopyState("failed");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 outline-none transition-colors duration-300 placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-green";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
      <div className="space-y-7">
        <div>
          <label
            htmlFor="volunteer-name"
            className="mb-2.5 block text-sm font-semibold text-ink-800"
          >
            {t("nameLabel")}
          </label>
          <input
            id="volunteer-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("namePlaceholder")}
            className={fieldClass}
          />
        </div>

        <fieldset className="min-w-0">
          <legend className="mb-1 text-sm font-semibold text-ink-800">
            {t("interestsLabel")}
          </legend>
          <p className="mb-3.5 text-[0.82rem] text-ink-500">
            {t("interestsHint")}
          </p>

          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <label
                key={interest}
                className="group cursor-pointer select-none rounded-full"
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selected.includes(interest)}
                  onChange={() => toggle(interest)}
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white py-2.5 pe-4 ps-3.5 text-[0.85rem] font-medium text-ink-600 transition-all duration-300 group-hover:border-ink-300 peer-checked:border-brand-green peer-checked:bg-brand-green-soft peer-checked:text-brand-green-dark peer-checked:[&_svg]:w-3.5 peer-checked:[&_svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-green">
                  <Check
                    aria-hidden="true"
                    className="h-3.5 w-0 shrink-0 text-brand-green opacity-0 transition-all duration-300"
                    strokeWidth={3}
                  />
                  {t(`interests.${interest}`)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="volunteer-message"
            className="mb-2.5 block text-sm font-semibold text-ink-800"
          >
            {t("messageLabel")}
          </label>
          <textarea
            id="volunteer-message"
            rows={5}
            maxLength={MESSAGE_LIMIT}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t("messagePlaceholder")}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
          <p className="mt-2 text-end text-[0.78rem] text-ink-400">
            {t("charactersLeft", { count: MESSAGE_LIMIT - message.length })}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-1 flex-col overflow-hidden rounded-[1.25rem] border border-ink-200 bg-paper-tint">
          <div className="flex items-center gap-2 border-b border-ink-200 bg-white/70 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            <span className="eyebrow text-ink-500">{t("previewLabel")}</span>
          </div>

          <dl className="divide-y divide-ink-200 border-b border-ink-200 text-[0.85rem]">
            <div className="flex gap-3 px-5 py-2.5">
              <dt className="w-16 shrink-0 text-ink-500">{t("toLabel")}</dt>
              <dd
                dir="ltr"
                className="min-w-0 flex-1 truncate font-medium text-ink-800 rtl:text-end"
              >
                {CONTACT_EMAIL}
              </dd>
            </div>
            <div className="flex gap-3 px-5 py-2.5">
              <dt className="w-16 shrink-0 text-ink-500">
                {t("subjectLabel")}
              </dt>
              <dd className="min-w-0 flex-1 truncate font-medium text-ink-800">
                {subject}
              </dd>
            </div>
          </dl>

          <p className="max-h-64 flex-1 overflow-y-auto whitespace-pre-wrap px-5 py-4 text-[0.85rem] leading-relaxed text-ink-700">
            {body}
          </p>
        </div>

        <p className="mt-5 inline-flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-brand-green-dark">
          <Paperclip aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {t("cvNote")}
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <a href={mailtoHref} className="btn btn-green btn-sheen group">
            <Mail aria-hidden="true" className="h-4 w-4" />
            {t("mailto")}
          </a>

          <button
            type="button"
            onClick={() => copy(`${subject}\n\n${body}`, "message")}
            className="btn btn-outline"
          >
            {copyState === "message" ? (
              <Check aria-hidden="true" className="h-4 w-4 text-brand-green" />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4" />
            )}
            {copyState === "message" ? t("copied") : t("copy")}
          </button>

          <button
            type="button"
            onClick={() => copy(CONTACT_EMAIL, "address")}
            className="btn btn-outline"
          >
            {copyState === "address" ? (
              <Check aria-hidden="true" className="h-4 w-4 text-brand-green" />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4" />
            )}
            {copyState === "address" ? t("emailCopied") : t("copyEmail")}
          </button>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {copyState === "message"
            ? t("copied")
            : copyState === "address"
            ? t("emailCopied")
            : copyState === "failed"
            ? t("copyFailed")
            : ""}
        </p>

        {copyState === "failed" && (
          <p className="mt-3 text-[0.82rem] text-brand-gold-dark">
            {t("copyFailed")}
          </p>
        )}
      </div>
    </div>
  );
}
