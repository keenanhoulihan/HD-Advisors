/*
 * Home hero logo geometry (CLAUDE.md "Home hero"): the full logo, the HD
 * centered, with lines that run off both edges of the screen. The right
 * lines all follow one convergence profile (fitted to hd-full-logo.svg within
 * its 0.1 rounding): parallel until RIGHT.anchor, then easing with zero slope
 * into one point. They stop there; a single straight line carries on.
 * Shared by the static server render and the animated client copy, so the
 * last animation frame is exactly the static logo.
 */

/**
 * The logo box: the HD and wordmark at their size, centered on the HD. Its
 * display width (`maxWidthRem`, or the screen width on phones) keeps the HD
 * the same size as the original 873-wide logo at 36rem.
 */
const BOX = { x: -95.4, width: 1040.2, height: 420 };

/**
 * The drawing is BLEED boxes wide, centered on the box, so the lines reach
 * past both edges of screens up to ~3000px wide (the box is at most ~686px);
 * the hero band clips the rest.
 */
const BLEED = 4.5;
const SIDE = ((BLEED - 1) / 2) * BOX.width;

export const HERO_LOGO = {
  box: BOX,
  bleed: BLEED,
  viewBox: `${BOX.x - SIDE} 0 ${BOX.width * BLEED} ${BOX.height}`,
  maxWidthRem: 42.89,
  /** Left edge of the drawing: the left lines start here, off-screen. */
  left: BOX.x - SIDE,
  markTransform: "translate(231.37 40.00) scale(0.136426) translate(-20 -20)",
};

/** Stroke for every logo line: the same 1-unit line as hd-full-logo.svg, scaling with the logo. */
export const LINE_STROKE = { stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const RIGHT = {
  start: 503.8,
  /** Lines run parallel to here, then converge (stretched 30% from here). */
  anchor: 612.0,
  /** Where every line lands. */
  point: { x: 869.53, y: 140 },
  /** End of the single straight line: the right edge of the drawing, off-screen. */
  end: BOX.x + BOX.width + SIDE,
  /** Each line's height on the parallel run. */
  offsets: [82.8, 88.2, 93.7, 99.1, 104.6, 110.0, 115.5, 120.9, 126.4, 131.8, 137.3, 142.7, 148.2, 153.6, 159.1, 164.5, 170.0, 175.4, 180.9, 186.3, 191.8, 197.2],
};

const SAMPLES = 64;
const smoothstep = (u: number) => u * u * (3 - 2 * u);

/** Share of each line's offset left at u (0 at the anchor, 1 at the point). 1 → 0 with zero slope at both ends. */
export function convergence(u: number) {
  const w = u * u * (1 - u) ** 2;
  return 1 - smoothstep(u) - w * (-2.0717 - 0.9951 * u + 5.1492 * u ** 2 - 4.4079 * u ** 3);
}

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * One right-hand line. `resolve(u)` is how far that part of the line has
 * converged: 0 keeps it on its parallel run, 1 puts it on the finished curve.
 */
export function rightLinePath(offset: number, resolve: (u: number) => number = () => 1) {
  const { anchor, point } = RIGHT;
  const dy = offset - point.y;
  let d = `M${RIGHT.start} ${offset}L${anchor} ${offset}`;
  for (let k = 1; k <= SAMPLES; k++) {
    const u = k / SAMPLES;
    const x = anchor + u * (point.x - anchor);
    const y = point.y + dy * (1 - (1 - convergence(u)) * resolve(u));
    d += `L${round(x)} ${round(y)}`;
  }
  return d;
}
