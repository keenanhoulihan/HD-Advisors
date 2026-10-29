import { cn } from "@/lib/cn";
import { buildStackPoints, clamp01, partialParams, toPath, type StackParams } from "@/lib/resolution-geometry";
import { DrawRule } from "./Reveal";

// Lines are purple; aqua is the one allowed accent. Backgrounds are always light.
export type Tone = "purple" | "aqua";

export const toneClass: Record<Tone, string> = {
  purple: "text-purple",
  aqua: "text-aqua",
};

function StackSvg({ params, className }: { params: StackParams; className?: string }) {
  const paths = buildStackPoints(params).map(toPath);

  return (
    <svg
      viewBox={`0 0 ${params.width} ${params.height}`}
      fill="none"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={params.strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

type ResolutionLineProps = {
  /**
   * partial: calmer, partly converged section divider.
   * rule: the resolved single line, used under every H2. Draws itself in on view.
   */
  variant: "partial" | "rule";
  tone?: Tone;
  /** partial only: 0 is a calm ripple, 1 converges fully at the right edge. */
  resolve?: number;
  /** partial only: a small stack sized for cards. */
  compact?: boolean;
  className?: string;
};

export function ResolutionLine({
  variant,
  tone = "purple",
  resolve = 0.6,
  compact = false,
  className,
}: ResolutionLineProps) {
  if (variant === "rule") {
    return <DrawRule standalone className={cn(toneClass[tone], className)} />;
  }

  return (
    <StackSvg params={partialParams(clamp01(resolve), compact)} className={cn("block", toneClass[tone], className)} />
  );
}
