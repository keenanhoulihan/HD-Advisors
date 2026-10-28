import Image from "next/image";
import { cn } from "@/lib/cn";

/*
 * Kate's photo always sits on lavender tint. The src and alt come from TinaCMS
 * (the current file is a transparent 800x800 cutout). Small: a plain circle.
 * Large: a 160px circle (220px from md) with a thin purple ring. No blur
 * placeholder: it would show through transparent areas.
 */
const DEFAULT_PHOTO = "/images/kate-headshot.png";

export function KateHeadshot({
  size,
  src,
  alt,
  className,
  position,
}: {
  size: "large" | "small";
  src: string | null | undefined;
  alt: string | null | undefined;
  className?: string;
  /** Where the crop centers, for a full photo rather than the cutout (e.g. "center 25%"). Default: top. */
  position?: string;
}) {
  // While Kate swaps the photo in Tina the field can be briefly empty.
  src ||= DEFAULT_PHOTO;
  alt ??= "";
  if (size === "small") {
    return (
      <div className={cn("relative aspect-square w-36 overflow-hidden rounded-full bg-lavender-tint sm:w-44", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="176px"
          loading="lazy"
          className={cn("object-cover", !position && "object-top")}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-square w-40 overflow-hidden rounded-full border-[1.5px] border-purple bg-lavender-tint md:w-[220px]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 220px, 160px"
        loading="lazy"
        className={cn("object-cover", !position && "object-top")}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
