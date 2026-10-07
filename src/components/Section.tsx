import { cn } from "@/lib/cn";

/*
 * Section backgrounds are always light (CLAUDE.md "Background rule"). Alternate
 * them down each page and never put two identical backgrounds back to back.
 */
export type SectionBg = "offwhite" | "lavender-tint" | "stone" | "aqua-light";

const bgClass: Record<SectionBg, string> = {
  offwhite: "bg-offwhite",
  "lavender-tint": "bg-lavender-tint",
  stone: "bg-stone",
  "aqua-light": "bg-aqua-light",
};

type SectionProps = {
  bg: SectionBg;
  children: React.ReactNode;
  className?: string;
  /** Override the default vertical padding. */
  padding?: string;
};

export function Section({ bg, children, className, padding = "py-20 sm:py-28" }: SectionProps) {
  return <section className={cn(bgClass[bg], padding, className)}>{children}</section>;
}
