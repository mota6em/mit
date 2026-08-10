import Image from "next/image";

import { cn } from "@/lib/utils";

type PosterMediaProps = {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export default function PosterMedia({
  src,
  alt = "",
  sizes,
  priority = false,
  className,
  imageClassName,
}: PosterMediaProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="96px"
        loading={priority ? "eager" : "lazy"}
        className="scale-125 object-cover blur-2xl"
      />
      <div className="absolute inset-0 bg-ink-950/25" />

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className={cn("object-contain", imageClassName)}
      />
    </div>
  );
}
