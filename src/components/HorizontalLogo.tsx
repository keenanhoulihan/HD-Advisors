import { HORIZONTAL, MARK_PATH } from "@/lib/logo-paths";

/*
 * The horizontal logo, from public/brand/hd-horizontal-logo.svg: the HD mark,
 * a short line, then "High Definition" over "ADVISORS". Inline SVG in
 * currentColor, so it stays crisp and takes its color (purple) from CSS. Size
 * it by height; the width follows.
 */
export function HorizontalLogo({ className, title }: { className?: string; title?: string }) {
  const { line } = HORIZONTAL;
  return (
    <svg
      viewBox={HORIZONTAL.viewBox}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fillRule="evenodd" transform={HORIZONTAL.markTransform} d={MARK_PATH} />
      <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="currentColor" strokeWidth={line.strokeWidth} />
      <path d={HORIZONTAL.wordmark} />
      <path d={HORIZONTAL.advisors} />
    </svg>
  );
}
