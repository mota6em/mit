"use client";

import HighlightsSection from "@/components/Highlights/HighlightsSection";
import Hero from "@/components/Highlights/Hero";
import SocialMediaIcons from "@/components/SocialMediaIcons/SocialMediaIcons";
import { useTranslations } from "next-intl";

export default function HighlightsPage() {
  const t = useTranslations("highlights");

  return (
    <div className="flex flex-col gap-8 mb-16">
      <Hero />

      {/* 2026 Highlights Section */}
      <HighlightsSection
        year="2026"
        sectionId="2026"
        titleKey="highlights_2026_title"
        showViewAll={false}
      />

      {/* 2025 Highlights Section */}
      <HighlightsSection
        year="2025"
        sectionId="2025"
        titleKey="highlights_2025_title"
        showViewAll={false}
      />

      {/* Archive Section (2024 and before) */}
      <HighlightsSection
        year="archive"
        sectionId="archive"
        titleKey="highlights_archive_title"
        showViewAll={false}
      />

      {/* Archive Note */}
      <div className="px-4 md:px-10 text-center max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Website Launched in Late 2025
          </h3>
          <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
            Content from 2024 and earlier years is documented on our social media platforms.
            The MIT website was officially launched at the end of 2025, so all highlights and
            announcements from previous years can be found on our social media channels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/muszlimifjusag/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/muszlimifjusag/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <span>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@muszlimifjusagitarsasag/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
