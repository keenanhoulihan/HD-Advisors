import Image from "next/image";
import { founder } from "@/content/about";
import { cn } from "@/lib/cn";
import headshot from "../../public/images/kate-headshot.png";

/*
 * Kate's transparent cutout always sits on lavender tint. The source is
 * 800x800. Large: a 160px circle (220px from md) with a thin purple ring. No blur
 * placeholder: it would show through the transparent areas.
 */
export function KateHeadshot({ size, className }: { size: "large" | "small"; className?: string }) {
  if (size === "small") {
    return (
      <div className={cn("relative aspect-square w-36 overflow-hidden rounded-full bg-lavender-tint sm:w-44", className)}>
        <Image src={headshot} alt={founder.headshotAlt} fill sizes="176px" className="object-cover object-top" />
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
      <Image src={headshot} alt={founder.headshotAlt} fill sizes="(min-width: 768px) 220px, 160px" className="object-cover object-top" />
    </div>
  );
}
