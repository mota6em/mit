"use client";

import { InfiniteMovingCards } from "@/src/components/ui/infinite-moving-cards";
import { useTranslations } from "next-intl";

const Testimonials = () => {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      quote: t("reviews.0.quote"),
      name: t("reviews.0.name"),
      title: t("reviews.0.title"),
    },
    {
      quote: t("reviews.1.quote"),
      name: t("reviews.1.name"),
      title: t("reviews.1.title"),
    },
    {
      quote: t("reviews.2.quote"),
      name: t("reviews.2.name"),
      title: t("reviews.2.title"),
    },
    {
      quote: t("reviews.3.quote"),
      name: t("reviews.3.name"),
      title: t("reviews.3.title"),
    },
    {
      quote: t("reviews.4.quote"),
      name: t("reviews.4.name"),
      title: t("reviews.4.title"),
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl Carena-font font-bold text-center mb-4 text-green-800">
          {t("title")}
        </h2>
        <p className="text-center text-neutral-600 mb-12 text-lg md:text-xl max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
};

export default Testimonials;
