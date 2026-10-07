import Image from "next/image";
import { founder } from "@/content/about";
import { cn } from "@/lib/cn";
import headshot from "../../public/images/kate-headshot.png";

/*
 * Kate's transparent cutout always sits on lavender tint. The source is
 * 800x800, so keep the large version small (18rem). No blur
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
    <div className={cn("relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden bg-lavender-tint", className)}>
      <Image
        src={headshot}
        alt={founder.headshotAlt}
        fill
        sizes="18rem"
        className="object-cover object-bottom"
      />
    </div>
  );
}
