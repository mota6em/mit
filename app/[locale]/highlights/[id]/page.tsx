import { Metadata } from "next";
import HighlightClientPage from "@/components/Highlights/HighlightClientPage";
import { getHighlightServerSide } from "@/lib/highlightService";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale: rawLocale } = await params;
  const locale = rawLocale === "hu" ? "hu" : "en";

  const highlight = await getHighlightServerSide(id);

  if (!highlight) return { title: "Highlight Not Found | MIT" };

  const title = locale === "hu" ? highlight.title_hu : highlight.title_en;
  const description = locale === "hu" ? highlight.desc_hu : highlight.desc_en;
  const imageUrl =
    highlight.images && highlight.images.length > 0
      ? highlight.images[0]
      : "/imgs/icons/icon.jpg";

  return {
    title: `${title} | MIT`,
    description,
    openGraph: {
      title: `${title} | MIT`,
      description,
      type: "article",
      locale: locale === "hu" ? "hu_HU" : "en_US",
      siteName: "MIT - Muszlim Ifjúság Társaság",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MIT`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function HighlightPageServer({ params }: Props) {
  const { id } = await params;
  const highlight = await getHighlightServerSide(id);

  return <HighlightClientPage initialHighlight={highlight} />;
}
