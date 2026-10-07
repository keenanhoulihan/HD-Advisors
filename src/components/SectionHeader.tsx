import { cn } from "@/lib/cn";
import { ResolutionLine } from "./ResolutionLine";

type SectionHeaderProps = {
  label: string;
  title: string;
  intro?: string;
  /** "dark" for purple or charcoal backgrounds. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

/** The section pattern: purple tracked label, charcoal H2, resolution line rule. */
export function SectionHeader({ label, title, intro, tone = "light", align = "left", className }: SectionHeaderProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <header className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", dark ? "text-lavender" : "text-purple")}>{label}</p>
      <h2 className={cn("mt-4 text-h2", dark ? "text-white" : "text-charcoal")}>{title}</h2>
      <ResolutionLine variant="rule" tone={dark ? "lavender" : "purple"} className={cn("mt-6", centered && "mx-auto")} />
      {intro && <p className={cn("mt-6", dark ? "text-lavender-light" : "text-slate")}>{intro}</p>}
    </header>
  );
}
