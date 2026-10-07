import { cn } from "@/lib/cn";
import { ResolutionLine } from "./ResolutionLine";

type SectionHeaderProps = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

/** The section pattern: purple tracked label, charcoal H2, resolution line rule. */
export function SectionHeader({ label, title, intro, align = "left", className }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <header className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <p className="eyebrow text-purple">{label}</p>
      <h2 className="mt-4 text-h2 text-charcoal">{title}</h2>
      <ResolutionLine variant="rule" className={cn("mt-6", centered && "mx-auto")} />
      {intro && <p className="mt-6 text-slate">{intro}</p>}
    </header>
  );
}
