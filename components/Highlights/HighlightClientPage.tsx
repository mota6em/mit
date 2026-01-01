"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { IoIosArrowRoundBack } from "react-icons/io";

import { ApiHighlight } from "@/lib/types";

const LoadingUI = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const ErrorUI = ({
  title,
  desc,
  backText,
  locale,
}: {
  title: string;
  desc: string;
  backText: string;
  locale: string;
}) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{desc}</p>
      <Link
        href={`/${locale}/highlights`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
      >
        <IoIosArrowRoundBack className="w-5 h-5" />
        {backText}
      </Link>
    </div>
  </div>
);

export default function HighlightClientPage({
  initialHighlight,
}: {
  initialHighlight: ApiHighlight | null;
}) {
  const { locale: rawLocale } = useParams();
  const locale = rawLocale === "hu" ? "hu" : "en";

  const [highlight] = useState(initialHighlight);

  if (!highlight)
    return (
      <ErrorUI
        title="Highlight Not Found"
        desc="The highlight you're looking for doesn't exist."
        backText="Back to Highlights"
        locale={locale}
      />
    );

  const isHu = locale === "hu";
  const title = isHu ? highlight.title_hu : highlight.title_en;
  const description = isHu ? highlight.desc_hu : highlight.desc_en;
  const note = isHu ? highlight.note_hu : highlight.note_en;

  return (
    <div className="min-h-screen bg-background text-foreground pt-4 pb-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between md:mb-4 md:px-6">
          <Link
            href={`/${locale}/highlights`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="p-1.5 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
              <IoIosArrowRoundBack className="w-5 h-5" />
            </span>
            <span className="font-medium tracking-wide text-sm">
              Back to Highlights
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start lg:grid-cols-2 pt-2 gap-4 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-3xl md:text-4xl font-bold Carena-font leading-tight mb-6">
              {title}
            </h1>

            {highlight.year && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {highlight.year}
                </span>
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {note && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800">{note}</p>
              </div>
            )}

            {highlight.category && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  {highlight.category}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {highlight.images && highlight.images.length > 0 ? (
              <div className="space-y-4">
                {highlight.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src={img}
                      alt={`${title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
