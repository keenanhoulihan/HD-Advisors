import Image from "next/image";
import { cn } from "@/lib/cn";

/*
 * Kate's photo always sits on lavender tint. The src and alt come from TinaCMS.
 * Portrait (home "Who we are", the full photo): a 4:5 frame, close to full
 * content width on phones (up to 24rem) and 240px beside the text from md.
 * Large (/about, the transparent cutout): a 160px circle (220px from md) with
 * a thin purple ring. No blur placeholder: it would show through transparent
 * areas.
 */
const DEFAULT_PHOTO = "/images/kate-headshot.png";

export function KateHeadshot({
  size,
  src,
  alt,
  className,
  position,
}: {
  size: "large" | "portrait";
  src: string | null | undefined;
  alt: string | null | undefined;
  className?: string;
  /** Where the crop centers, for a full photo rather than the cutout (e.g. "center 25%"). Default: top. */
  position?: string;
}) {
  // While Kate swaps the photo in Tina the field can be briefly empty.
  src ||= DEFAULT_PHOTO;
  alt ??= "";
  if (size === "portrait") {
    return (
      <div className={cn("relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-lavender-tint md:w-60", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 240px, (min-width: 424px) 384px, calc(100vw - 2.5rem)"
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
