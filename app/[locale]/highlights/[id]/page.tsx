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
  return {
    title: `${title} | MIT`,
    description: locale === "hu" ? highlight.desc_hu : highlight.desc_en,
    openGraph: {
      title,
      images:
        highlight.images && highlight.images.length > 0
          ? [highlight.images[0]]
          : ["/imgs/icons/icon.jpg"],
    },
  };
}

export default async function HighlightPageServer({ params }: Props) {
  const { id } = await params;
  const highlight = await getHighlightServerSide(id);

  return <HighlightClientPage initialHighlight={highlight} />;
}
