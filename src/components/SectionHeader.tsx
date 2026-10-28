import { cn } from "@/lib/cn";
import { edit } from "@/lib/tina-live";
import { DrawRule, RevealGroup, RevealItem } from "./Reveal";

type SectionHeaderProps = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  /** The content object the text came from, so Kate can click it to edit in Tina. */
  source?: object | null;
  /** Field names on `source`, when they differ from label, title, and intro. */
  fields?: { label?: string; title?: string; intro?: string };
  /** Click-to-edit target for a label that comes from elsewhere (a motto). */
  labelEdit?: { "data-tina-field"?: string };
};

/**
 * The section pattern: purple tracked label, charcoal H2, resolution line rule.
 * Fades up on scroll, staggered, while the rule draws itself left to right.
 */
export function SectionHeader({
  label,
  title,
  intro,
  align = "left",
  className,
  source,
  fields,
  labelEdit,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <RevealGroup as="header" className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <RevealItem as="p" className="eyebrow text-purple" {...(labelEdit ?? edit(source, fields?.label ?? "label"))}>
        {label}
      </RevealItem>
      <RevealItem as="h2" className="mt-4 text-h2 text-charcoal" {...edit(source, fields?.title ?? "title")}>
        {title}
      </RevealItem>
      <DrawRule className={cn("mt-6 text-purple", centered && "mx-auto")} />
      {intro && (
        <RevealItem as="p" className="mt-6 text-slate" {...edit(source, fields?.intro ?? "intro")}>
          {intro}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
