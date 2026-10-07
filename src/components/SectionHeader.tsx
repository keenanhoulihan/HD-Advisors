import { cn } from "@/lib/cn";
import { DrawRule, RevealGroup, RevealItem } from "./Reveal";

type SectionHeaderProps = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * The section pattern: purple tracked label, charcoal H2, resolution line rule.
 * Fades up on scroll, staggered, while the rule draws itself left to right.
 */
export function SectionHeader({ label, title, intro, align = "left", className }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <RevealGroup as="header" className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <RevealItem as="p" className="eyebrow text-purple">
        {label}
      </RevealItem>
      <RevealItem as="h2" className="mt-4 text-h2 text-charcoal">
        {title}
      </RevealItem>
      <DrawRule className={cn("mt-6 text-purple", centered && "mx-auto")} />
      {intro && (
        <RevealItem as="p" className="mt-6 text-slate">
          {intro}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
