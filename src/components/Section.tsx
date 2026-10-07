import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/*
 * Section backgrounds are always light (CLAUDE.md "Background rule"). Alternate
 * them down each page and never put two identical backgrounds back to back.
 * Neighbors melt together with a soft vertical blend (CLAUDE.md "Section blends").
 */
export type SectionBg = "offwhite" | "lavender-tint" | "lavender-light" | "stone" | "aqua-light";

const bgClass: Record<SectionBg, string> = {
  offwhite: "bg-offwhite",
  "lavender-tint": "bg-lavender-tint",
  "lavender-light": "bg-lavender-light",
  stone: "bg-stone",
  "aqua-light": "bg-aqua-light",
};

/** Height of the blend at the bottom of a section, capped for short bands. */
const BLEND = "min(11rem, 45%)";

/**
 * The bottom of a section fades from its own color into the next section's,
 * so the next section starts on its own flat color and there are no seams.
 */
export function sectionBackground(bg: SectionBg, blendTo?: SectionBg): { className: string; style?: CSSProperties } {
  if (!blendTo || blendTo === bg) return { className: bgClass[bg] };
  return {
    className: bgClass[bg],
    style: { backgroundImage: `linear-gradient(to bottom, var(--${bg}) calc(100% - ${BLEND}), var(--${blendTo}) 100%)` },
  };
}

type SectionProps = {
  bg: SectionBg;
  /** The next section's background. Omit only when the next band matches. */
  blendTo?: SectionBg;
  children: React.ReactNode;
  className?: string;
  /** Override the default vertical padding. */
  padding?: string;
};

export function Section({ bg, blendTo, children, className, padding = "py-20 sm:py-28" }: SectionProps) {
  const background = sectionBackground(bg, blendTo);
  return (
    <section className={cn(background.className, padding, className)} style={background.style}>
      {children}
    </section>
  );
}
