import { cn } from "@/lib/cn";
import {
  buildStackPoints,
  clamp01,
  HERO_DESKTOP,
  HERO_DESKTOP_MONOGRAM,
  HERO_MOBILE,
  HERO_MOBILE_MONOGRAM,
  monogramTransform,
  partialParams,
  toPath,
  type MonogramPlacement,
  type StackParams,
} from "@/lib/resolution-geometry";
import { MONOGRAM_HEIGHT, MONOGRAM_WIDTH, MonogramShapes } from "./Monogram";

// Lines are purple; aqua is the one allowed accent. Backgrounds are always light.
export type Tone = "purple" | "aqua";

export const toneClass: Record<Tone, string> = {
  purple: "text-purple",
  aqua: "text-aqua",
};

function StackSvg({
  params,
  monogram,
  className,
}: {
  params: StackParams;
  monogram?: MonogramPlacement;
  className?: string;
}) {
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
      {monogram && (
        <g className="text-purple" fill="currentColor" transform={monogramTransform(params, monogram)}>
          <MonogramShapes />
        </g>
      )}
    </svg>
  );
}

type ResolutionLineProps = {
  /**
   * full: hero stack bleeding off the left, through the monogram, resolving right
   *   (static; the home hero animates it with HeroResolve).
   * partial: calmer, partly converged section divider.
   * rule: the resolved single line, used under every H2.
   * monogram: fully resolved, one line through the monogram (footer).
   */
  variant: "full" | "partial" | "rule" | "monogram";
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
    return (
      <span aria-hidden="true" className={cn("block h-[1.5px] w-20 bg-current", toneClass[tone], className)} />
    );
  }

  if (variant === "monogram") {
    return (
      <div aria-hidden="true" className={cn("relative flex items-center justify-center", toneClass[tone], className)}>
        <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
        <svg
          viewBox={`0 0 ${MONOGRAM_WIDTH} ${MONOGRAM_HEIGHT}`}
          fill="currentColor"
          className="relative h-12 w-auto text-purple sm:h-14"
          focusable="false"
        >
          <MonogramShapes />
        </svg>
      </div>
    );
  }

  if (variant === "partial") {
    return (
      <StackSvg params={partialParams(clamp01(resolve), compact)} className={cn("block", toneClass[tone], className)} />
    );
  }

  return (
    <div className={cn(toneClass[tone], className)}>
      <StackSvg params={HERO_MOBILE} monogram={HERO_MOBILE_MONOGRAM} className="block sm:hidden" />
      <StackSvg params={HERO_DESKTOP} monogram={HERO_DESKTOP_MONOGRAM} className="hidden sm:block" />
    </div>
  );
}
