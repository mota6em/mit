"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { ApiHighlight } from "@/lib/types";
import ImageLightbox, {
  useImageLightbox,
} from "@/components/reusable/ImageLightbox";
import SectionHeader from "../reusable/SectionHeader";
import { useHighlightContent } from "@/app/hooks/useHighlightContent";

import {
  NotFoundState,
  BackButton,
  DateFooter,
  HighlightDescription,
  GallerySection,
} from "./HighlightDetail";

interface HighlightClientPageProps {
  initialHighlight: ApiHighlight | null;
}

export default function HighlightClientPage({
  initialHighlight,
}: HighlightClientPageProps) {
  const { locale: rawLocale } = useParams();
  const locale = (rawLocale as string) === "hu" ? "hu" : "en";
  const t = useTranslations("highlights");

  const { isOpen, initialIndex, openLightbox, closeLightbox } =
    useImageLightbox();
  const content = useHighlightContent(initialHighlight, locale);

  if (!initialHighlight || !content) {
    return <NotFoundState locale={locale} t={t} />;
  }

  return (
    <article className="min-h-screen bg-white overflow-x-hidden">
      <ImageLightbox
        images={content.images}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        alt={content.title}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <nav className="mb-8">
          <BackButton
            href={`/${locale}/highlights`}
            label={t("backToHighlights")}
          />
        </nav>

        <SectionHeader title={content.title} className="mb-6 md:mb-9" />

        <GallerySection
          images={content.images}
          title={content.title}
          onImageClick={openLightbox}
        />

        <HighlightDescription description={content.description} />

        {content.date && <DateFooter date={content.date} locale={locale} />}
      </div>
    </article>
  );
}
