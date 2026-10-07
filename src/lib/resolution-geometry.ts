import { MONOGRAM_HEIGHT, MONOGRAM_WIDTH } from "@/components/Monogram";

/*
 * Geometry for the Resolution Line (CLAUDE.md "Design concept"). Every line in
 * a stack is a copy of one master gesture curve with a small per-line lag,
 * amplitude and bulge, like Aqua Tower floor plates, so the family never reads
 * as a waveform. Left to right, the ripple calms and the spread converges.
 * Pure functions, shared by server-rendered lines and the animated hero.
 */

export type StackParams = {
  width: number;
  height: number;
  lines: number;
  /** Distance between the outer lines at the left edge. */
  spread: number;
  amplitude: number;
  wavelength: number;
  startX: number;
  endX: number;
  /** Lines stay mostly parallel until here (e.g. through the monogram). */
  holdX: number;
  /** Where the spread reaches endSpread and the ripple reaches endRipple. */
  convergeX: number;
  /** Fraction of the spread left at convergeX. 0 means fully resolved. */
  endSpread: number;
  /** Fraction of the ripple left at convergeX. */
  endRipple: number;
  seed: number;
  strokeWidth: number;
};

export type MonogramPlacement = { x: number; height: number };

export type Point = [number, number];

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smooth = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};
const frac = (n: number) => n - Math.floor(n);
const round = (n: number) => Math.round(n * 10) / 10;

function spreadAt(p: StackParams, x: number) {
  let base = 1;
  if (p.holdX > p.startX) {
    if (x < p.holdX) return 1 - 0.25 * smooth((x - p.startX) / (p.holdX - p.startX));
    base = 0.75;
  }
  return base + (p.endSpread - base) * smooth((x - p.holdX) / (p.convergeX - p.holdX));
}

function rippleAt(p: StackParams, x: number) {
  const t = clamp01((x - p.startX) / (p.convergeX - p.startX));
  return p.endRipple + (1 - p.endRipple) * (1 - t) ** 1.5;
}

function masterCurve(p: StackParams, u: number) {
  const k = (2 * Math.PI) / p.wavelength;
  return 0.72 * Math.sin(k * u + p.seed) + 0.28 * Math.sin(k * 2.17 * u + 1.3 + p.seed);
}

/** Sample points for every line in the stack. */
export function buildStackPoints(p: StackParams): Point[][] {
  const mid = (p.lines - 1) / 2;
  const cy = p.height / 2;
  const spacing = p.lines > 1 ? p.spread / (p.lines - 1) : 0;
  const step = Math.max(6, p.wavelength / 60);

  return Array.from({ length: p.lines }, (_, i) => {
    const offset = (i - mid) * spacing;
    const amp = 1 + 0.14 * Math.sin(i * 2.1 + p.seed);
    const lag = (i - mid) * p.wavelength * 0.018;
    const bulgeAt = p.convergeX * (0.12 + 0.55 * frac(i * 0.618 + p.seed * 0.37));
    const bulgeAmp = spacing * 0.3 * Math.sin(i * 1.3 + p.seed * 2);
    const bulgeWidth = p.wavelength * 0.12;

    const yAt = (x: number) => {
      const bulge = bulgeAmp * Math.exp(-(((x - bulgeAt) / bulgeWidth) ** 2));
      const ripple = p.amplitude * amp * masterCurve(p, x - lag) + bulge;
      return cy + offset * spreadAt(p, x) + rippleAt(p, x) * ripple;
    };

    const points: Point[] = [];
    // Past convergeX a resolved line is straight, so it needs no samples.
    const sampleEnd = p.endSpread === 0 && p.endRipple === 0 ? Math.min(p.convergeX, p.endX) : p.endX;
    for (let x = p.startX; x < sampleEnd; x += step) points.push([x, yAt(x)]);
    points.push([sampleEnd, yAt(sampleEnd)]);
    if (sampleEnd < p.endX) points.push([p.endX, yAt(sampleEnd)]);
    return points;
  });
}

/** Quadratic segments through sample midpoints give a smooth, compact path. */
export function toPath(points: Point[]) {
  let d = `M${round(points[0][0])} ${round(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += `Q${round(x)} ${round(y)} ${round((x + nx) / 2)} ${round((y + ny) / 2)}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d}L${round(lx)} ${round(ly)}`;
}

/**
 * Pulls a line toward the center line as t goes 0 to 1. Resolution sweeps
 * right to left, so the convergence point travels back through the monogram.
 */
export function resolvePoints(points: Point[], p: StackParams, t: number): Point[] {
  const cy = p.height / 2;
  const sweep = 0.6;
  return points.map(([x, y]) => {
    const fromRight = 1 - x / p.width;
    const f = smooth(t * (1 + sweep) - fromRight * sweep);
    return [x, y + (cy - y) * f];
  });
}

/* Presets. The hero has a shorter stack on mobile that still resolves. */

export const HERO_DESKTOP: StackParams = {
  width: 1600,
  height: 300,
  lines: 9,
  spread: 100,
  amplitude: 20,
  wavelength: 640,
  startX: 0,
  // Full bleed: lines run from the left edge of the screen to the right edge.
  endX: 1600,
  holdX: 950,
  convergeX: 1230,
  endSpread: 0,
  endRipple: 0,
  seed: 0.6,
  strokeWidth: 1.5,
};
export const HERO_DESKTOP_MONOGRAM: MonogramPlacement = {
  height: 190,
  x: 800 - (190 * MONOGRAM_WIDTH) / MONOGRAM_HEIGHT / 2,
};

export const HERO_MOBILE: StackParams = {
  ...HERO_DESKTOP,
  width: 800,
  height: 260,
  lines: 7,
  spread: 72,
  amplitude: 14,
  wavelength: 380,
  endX: 800,
  holdX: 505,
  convergeX: 640,
  strokeWidth: 1.25,
};
export const HERO_MOBILE_MONOGRAM: MonogramPlacement = {
  height: 130,
  x: 400 - (130 * MONOGRAM_WIDTH) / MONOGRAM_HEIGHT / 2,
};

/**
 * Header mark: a mini version of the full logo. Five lines (enough gap between
 * them to stay crisp at ~40px tall) pass through the monogram and resolve just
 * right of the D.
 */
export const HEADER_MARK: StackParams = {
  width: 132,
  height: 44,
  lines: 5,
  spread: 16,
  amplitude: 2.2,
  wavelength: 56,
  startX: 1,
  endX: 131,
  holdX: 80,
  convergeX: 104,
  endSpread: 0,
  endRipple: 0,
  seed: 0.6,
  strokeWidth: 1,
};
export const HEADER_MARK_MONOGRAM: MonogramPlacement = {
  height: 28,
  x: 36,
};

export function partialParams(resolve: number, compact: boolean): StackParams {
  const calm = 1 - 0.65 * resolve;
  if (compact) {
    return {
      width: 400,
      height: 90,
      lines: 7,
      spread: 44,
      amplitude: 9 * calm,
      wavelength: 300,
      startX: 0,
      endX: 400,
      holdX: 0,
      convergeX: 400,
      endSpread: 1 - resolve,
      endRipple: 0.3 * (1 - resolve),
      seed: 1.7,
      strokeWidth: 1.25,
    };
  }
  return {
    width: 1600,
    height: 120,
    lines: 7,
    spread: 54,
    amplitude: 12 * calm,
    wavelength: 820,
    startX: 0,
    endX: 1600,
    holdX: 0,
    convergeX: 1600,
    endSpread: 1 - resolve,
    endRipple: 0.2 * (1 - resolve),
    seed: 1.7,
    strokeWidth: 1.5,
  };
}

export function monogramTransform(p: StackParams, m: MonogramPlacement) {
  return `translate(${m.x} ${(p.height - m.height) / 2}) scale(${m.height / MONOGRAM_HEIGHT})`;
}
