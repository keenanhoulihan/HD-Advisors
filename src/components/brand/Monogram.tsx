"use client";

import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { toPath, type Point } from "@/lib/resolution-geometry";

/*
 * Compact HD monogram explorations (see /lab/monograms). Not used in the live
 * header yet. The site's current traced monogram is src/components/Monogram.tsx.
 *
 * B (monoline HD in a circle) is the chosen baseline; B1 to B6 are editorial
 * refinements of it. Each B variant has a simplified drawing for 40px and below
 * (thicker strokes, fewer details) and full detail from 48px up.
 *
 * Every mark is drawn on a 64 x 64 grid, purple only, flat. Line elements
 * carry the resolution idea: slight ripples on the left (Aqua Tower floor
 * plates, never an audio waveform) that straighten toward the right. They
 * ripple once and settle on load and on hover or focus (~1.2s).
 */

export type MonogramVariant = "a" | "b" | "c" | "d" | "b1" | "b2" | "b3" | "b4" | "b5" | "b6";

const PURPLE = "#4B2E83";
const RIPPLE_SECONDS = 1.2;

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

/** Ripple strength over a play: 0 at both ends, so it starts and settles on the resting shape. */
const strength = (p: number) => (p <= 0 || p >= 1 ? 0 : (Math.sin(Math.PI * p) * (1 - p)) / 0.385);

type Wave = {
  x0: number;
  x1: number;
  y: number;
  /** Resting ripple amplitude (keep it slight). */
  amp: number;
  wavelength: number;
  /** The ripple fades out by here; the rest of the line is straight. */
  calmX: number;
  phase?: number;
  /** Extra amplitude while animating. */
  playAmp?: number;
};

/** Sample a line that ripples slightly at x0 and is straight from calmX on. */
function wavePoints(w: Wave, p: number, step = 0.8): Point[] {
  const points: Point[] = [];
  const amp = (x: number) => (1 - smooth((x - w.x0) / (w.calmX - w.x0))) * (w.amp + (w.playAmp ?? w.amp * 1.4) * strength(p));
  const k = (2 * Math.PI) / w.wavelength;
  for (let x = w.x0; x < w.calmX; x += step) {
    points.push([x, w.y + amp(x) * Math.sin(k * x + (w.phase ?? 0) - 4 * Math.PI * p)]);
  }
  points.push([w.calmX, w.y], [w.x1, w.y]);
  return points;
}

/** A stack of lines that ripple apart on the left and converge to one point. */
function stackPoints(s: {
  x0: number;
  x1: number;
  y: number;
  lines: number;
  spread: number;
  amp: number;
  wavelength: number;
}, index: number, p: number): Point[] {
  const mid = (s.lines - 1) / 2;
  const offset = (index - mid) * (s.spread / (s.lines - 1));
  const k = (2 * Math.PI) / s.wavelength;
  const points: Point[] = [];
  for (let x = s.x0; x <= s.x1 + 0.01; x += 0.6) {
    const e = 1 - smooth((x - s.x0) / (s.x1 - s.x0));
    const ripple = (s.amp + s.amp * 1.6 * strength(p)) * Math.sin(k * x + index * 0.45 - 4 * Math.PI * p);
    points.push([x, s.y + e * (offset + ripple)]);
  }
  return points;
}

function useRipple() {
  // 1 is the resting state, so the server render and no-JS view are final.
  const p = useMotionValue(1);
  const running = useRef<AnimationPlaybackControls | null>(null);
  const play = useCallback(() => {
    if (running.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    p.set(0);
    running.current = animate(p, 1, {
      duration: RIPPLE_SECONDS,
      ease: "linear",
      onComplete: () => {
        running.current = null;
      },
    });
  }, [p]);
  useEffect(() => {
    play();
    return () => running.current?.stop();
  }, [play]);
  return { p, play };
}

/** A path whose `d` is rebuilt from the ripple progress. */
function LivePath({
  p,
  build,
  ...rest
}: { p: MotionValue<number>; build: (p: number) => string } & React.SVGProps<SVGPathElement>) {
  const d = useTransform(p, build);
  // framer-motion's SVG prop types differ slightly from React's; the props passed here are plain attributes.
  return <motion.path d={d} {...(rest as object)} />;
}

/* A. Shared stem: bold H and D share one stem; three carved gaps ripple on the left of the H. */
function MarkA({ p, id }: { p: MotionValue<number>; id: string }) {
  // Above, through, and below the crossbar, clear of the letters' top and bottom edges.
  const gaps: Wave[] = [21, 32, 43].map((y, i) => ({
    x0: 4,
    x1: 62,
    y,
    amp: 0.55,
    playAmp: 1.2,
    wavelength: 14,
    calmX: 28,
    phase: i * 0.9,
  }));
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="white" />
        {gaps.map((g, i) => (
          <LivePath key={i} p={p} build={(v) => toPath(wavePoints(g, v))} fill="none" stroke="black" strokeWidth={2} />
        ))}
      </mask>
      <g fill={PURPLE} mask={`url(#${id})`}>
        <rect x="7" y="10" width="9" height="44" />
        {/* The shared stem: the H's right stem is the D's stem. */}
        <rect x="28" y="10" width="9" height="44" />
        {/* Crossbar, reaching a little into the D's bowl. */}
        <rect x="16" y="27.5" width="26" height="9" />
        <path fillRule="evenodd" d="M37 10H39A18 22 0 0 1 39 54H37ZM37 19V45H39A9 13 0 0 0 39 19Z" />
      </g>
    </>
  );
}

/* B. Monoline in a circle: thin H and D interlock; the crossbar runs on through the D and out of the circle. */
function MarkB({ p }: { p: MotionValue<number> }) {
  const line: Wave = { x0: 15, x1: 63, y: 32, amp: 0, playAmp: 1.3, wavelength: 12, calmX: 63 };
  const stroke = { fill: "none", stroke: PURPLE, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <>
      <circle cx="32" cy="32" r="27" {...stroke} />
      <path d="M15 20V44M26 20V44M32 20V44M32 20H37A12 12 0 0 1 37 44H32" {...stroke} />
      <LivePath p={p} build={(v) => toPath(wavePoints(line, v, 0.6))} {...stroke} />
    </>
  );
}

/* C. Broken square: the frame opens on the left, where rippled lines enter and converge into the H crossbar. */
function MarkC({ p }: { p: MotionValue<number> }) {
  const stack = { x0: 1.5, x1: 20, y: 32, lines: 4, spread: 14, amp: 0.45, wavelength: 15 };
  const stroke = { fill: "none", stroke: PURPLE, strokeWidth: 3, strokeLinecap: "square" as const, strokeLinejoin: "miter" as const };
  return (
    <>
      <path d="M17 6.5H57.5V57.5H17" {...stroke} />
      <path d="M20 20V44M31 20V44M20 32H31M37 44V20H41A11 12 0 0 1 41 44Z" {...stroke} strokeLinecap="butt" />
      {Array.from({ length: stack.lines }, (_, i) => (
        <LivePath
          key={i}
          p={p}
          build={(v) => toPath(stackPoints(stack, i, v))}
          fill="none"
          stroke={PURPLE}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

/* D. Flowing ligature: the D's curve sweeps out into a gentle S that settles into a straight line to the right. */
function MarkD({ p }: { p: MotionValue<number> }) {
  // The S-sweep is the resting wave; the straight tail ripples only while animating.
  const tail: Wave = { x0: 47, x1: 63, y: 32.5, amp: 0, playAmp: 1.1, wavelength: 10, calmX: 63, phase: -(2 * Math.PI * 47) / 10 };
  const stroke = { fill: "none", stroke: PURPLE, strokeWidth: 4.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  // Upper bowl turns out of the D at its widest point and flows into the tail.
  const sweep = "M17 14H22C33 14 41 20.5 41.5 29C41.9 31.6 43.5 32.5 47 32.5";
  return (
    <>
      <path d="M6 14V50M6 32H17M17 14V50M17 50H22C33 50 41.5 44 41.8 31" {...stroke} />
      <LivePath p={p} build={(v) => `${sweep}${toPath(wavePoints(tail, v, 0.6)).replace(/^M[^QL]*/, "")}`} {...stroke} />
    </>
  );
}

/* ---------- B family: editorial refinements of the monoline circle mark ---------- */

type P = Point;

/** Points along a cubic bezier (smooth curves only; never hand-wobbled). */
function cubic(a: P, b: P, c: P, d: P, n = 28): P[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const u = 1 - t;
    return [
      u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
      u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
    ];
  });
}

const straight = (a: P, b: P, n = 16): P[] =>
  Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);

/** Concatenate point runs that share their joining point. */
const joinRuns = (...runs: P[][]): P[] => runs.reduce<P[]>((all, run) => all.concat(all.length ? run.slice(1) : run), []);

const fmt = (n: number) => (Math.round(n * 100) / 100).toString();

/** Normalized arc length (0..1) at each point. */
function arcT(points: P[]) {
  const d = [0];
  for (let i = 1; i < points.length; i++) {
    d.push(d[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  }
  const total = d[d.length - 1] || 1;
  return d.map((v) => v / total);
}

/**
 * A filled outline around a centerline with a varying width: true thick-to-thin
 * strokes (a plain SVG stroke can't change width along its length).
 */
function ribbon(points: P[], width: (t: number) => number): string {
  const t = arcT(points);
  const left: P[] = [];
  const right: P[] = [];
  points.forEach(([x, y], i) => {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len;
    const ny = (b[0] - a[0]) / len;
    const w = width(t[i]) / 2;
    left.push([x + nx * w, y + ny * w]);
    right.push([x - nx * w, y - ny * w]);
  });
  const run = (pts: P[]) => pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join("L");
  return `M${run(left)}L${run(right.reverse())}Z`;
}

/** Plain polyline for stroked paths (points are already dense and smooth). */
const polyline = (pts: P[]) => `M${pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join("L")}`;

/** Offset points along y by a ripple that only exists while animating. */
function rippleRun(pts: P[], p: number, amp: number, wavelength: number, from: number, to: number, phase = 0): P[] {
  const s = strength(p);
  if (!s) return pts;
  const k = (2 * Math.PI) / wavelength;
  return pts.map(([x, y]) => {
    const e = Math.sin(Math.PI * Math.min(1, Math.max(0, (x - from) / (to - from))));
    return [x, y + amp * s * e * Math.sin(k * x + phase - 4 * Math.PI * p)];
  });
}

type Detail = "small" | "full";

const monoline = (width: number) => ({
  fill: "none",
  stroke: PURPLE,
  strokeWidth: width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* B1. Pill frame: monoline HD in a tall pill; the crossbar runs on as a hairline and breaks out on the right. */
function MarkB1({ p, detail }: { p: MotionValue<number>; detail: Detail }) {
  const small = detail === "small";
  const bar = straight([18, 32], [62, 32], 60);
  return (
    <>
      <rect x="14" y="4" width="36" height="56" rx="18" {...monoline(small ? 2.2 : 1.2)} />
      <path d="M18 20V44M27 20V44M32 44V20H36A10 12 0 0 1 36 44Z" {...monoline(small ? 2.6 : 2.4)} />
      <LivePath p={p} build={(v) => polyline(rippleRun(bar, v, 1.1, 12, 27, 62))} {...monoline(small ? 2.2 : 1)} />
    </>
  );
}

/* B2. Loop into line: the D's bowl runs past its stem into one loop that unwinds into a long hairline. */
const B2_PATH = joinRuns(
  cubic([32, 20], [41.5, 20], [49, 24.5], [49, 32]),
  cubic([49, 32], [49, 39.5], [44, 44], [37, 44]),
  cubic([37, 44], [34, 44], [31.5, 44], [29.5, 44.4], 10),
  // A teardrop loop: out past the stem, down, and back around underneath.
  cubic([29.5, 44.4], [24.5, 45.4], [22.8, 51.6], [27.6, 53]),
  cubic([27.6, 53], [31.6, 54.1], [34, 50.6], [38.5, 49.5]),
  cubic([38.5, 49.5], [41, 48.9], [43, 48.8], [46, 48.8], 12),
  straight([46, 48.8], [63, 48.8], 34),
);
const B2_TAPER_START = arcT(B2_PATH)[B2_PATH.findIndex(([x, y]) => x === 29.5 && y === 44.4)];
const B2_TAIL_START = arcT(B2_PATH)[B2_PATH.findIndex(([x, y]) => x === 46 && y === 48.8)];

function MarkB2({ p, detail }: { p: MotionValue<number>; detail: Detail }) {
  const small = detail === "small";
  const [thick, thin] = small ? [2.6, 2] : [2.4, 1];
  const width = (t: number) =>
    t <= B2_TAPER_START ? thick : t >= B2_TAIL_START ? thin : thick + (thin - thick) * smooth((t - B2_TAPER_START) / (B2_TAIL_START - B2_TAPER_START));
  return (
    <>
      <circle cx="32" cy="32" r="27" {...monoline(small ? 2.2 : 1.2)} />
      <path d="M15 20V44M26 20V44M15 32H26M32 20V44" {...monoline(thick)} />
      <LivePath
        p={p}
        build={(v) => ribbon(rippleRun(B2_PATH, v, 1.1, 11, 46, 63), width)}
        fill={PURPLE}
      />
    </>
  );
}

/* B3. Contrast stroke: heavy verticals, curves and crossbar tapering to hairlines, like an engraved letter. */
function MarkB3({ p, detail }: { p: MotionValue<number>; detail: Detail }) {
  const small = detail === "small";
  const stem = small ? 4.4 : 4;
  const [irx, iry] = small ? [8.8, 10.2] : [9.2, 11];
  const bar = straight([19, 32], [63, 32], 60);
  return (
    <>
      <circle cx="32" cy="32" r="27" {...monoline(small ? 2 : 1)} />
      <g fill={PURPLE}>
        <rect x={17 - stem / 2} y="20" width={stem} height="24" />
        <rect x={27 - stem / 2} y="20" width={stem} height="24" />
        <rect x={37 - stem} y="20" width={stem} height="24" />
        <path d={`M37 20A13 12 0 0 1 37 44V${32 + iry}A${irx} ${iry} 0 0 0 37 ${32 - iry}Z`} />
      </g>
      <LivePath p={p} build={(v) => polyline(rippleRun(bar, v, 1, 12, 29, 63))} {...monoline(small ? 2 : 1)} strokeLinecap="butt" />
    </>
  );
}

/* B4. Rising flourish: hairlines rise from the H, converge to one fine point, and curve down into the D. */
function MarkB4({ p, detail }: { p: MotionValue<number>; detail: Detail }) {
  const small = detail === "small";
  const point: P = [31, 12.5];
  // Each strand arrives at the point heading the same way the final curve leaves it.
  const strands: Array<[P, P, P]> = [
    [[15, 19.5], [13.8, 12.6], [24, 10.6]],
    [[15, 19.5], [16, 14.6], [24.6, 12.1]],
    [[26, 19.5], [26, 16], [26.4, 12.9]],
  ];
  const shown = small ? strands.slice(1, 2) : strands;
  const bar = straight([15, 32], [63, 32], 60);
  const strand = ([s, c1, c2]: [P, P, P], i: number, v: number): P[] => {
    const sway = 1.3 * strength(v) * Math.sin(i * 1.7 - 4 * Math.PI * v);
    return cubic(s, [c1[0] - sway, c1[1]], [c2[0], c2[1] + sway], point);
  };
  const into = cubic(point, [35.4, 13.4], [38.6, 16.2], [38.8, 20.2]);
  return (
    <>
      <circle cx="32" cy="32" r="27" {...monoline(small ? 2.2 : 1.4)} />
      <path d="M15 20V44M26 20V44M32 44V20H37A12 12 0 0 1 37 44Z" {...monoline(small ? 2.6 : 2)} />
      <LivePath p={p} build={(v) => polyline(rippleRun(bar, v, 1, 12, 26, 63))} {...monoline(small ? 2.2 : 1.4)} />
      {shown.map((st, i) => (
        <LivePath key={i} p={p} build={(v) => polyline(strand(st, i, v))} {...monoline(small ? 1.6 : 0.9)} />
      ))}
      <path d={polyline(into)} {...monoline(small ? 1.6 : 0.9)} />
    </>
  );
}

/* B5. Lead-in lines: no frame; three rippled hairlines converge into the crossbar of an italic, high-contrast HD. */
function MarkB5({ p, detail }: { p: MotionValue<number>; detail: Detail }) {
  const small = detail === "small";
  const hair = small ? 1.6 : 1;
  const [irx, iry] = small ? [8.6, 14.2] : [9, 15];
  const lead = (o: number, i: number, v: number): P[] => {
    const r = (i % 2 ? -0.8 : 0.8) + 1.2 * strength(v) * Math.sin(i * 1.3 - 4 * Math.PI * v);
    return cubic([6, 32 + o], [11, 32 + o + r], [16, 32 + o * 0.2], [21, 32]);
  };
  const offsets = small ? [-5, 0, 5] : [-6, 0, 6];
  return (
    <g transform="translate(4.5 0)">
      {offsets.map((o, i) => (
        <LivePath key={i} p={p} build={(v) => polyline(lead(o, i, v))} {...monoline(hair)} />
      ))}
      {/* Italic: skewed about the crossbar line so the lead-ins still meet it. */}
      <g fill={PURPLE} transform="translate(5.64 0) skewX(-10)">
        <rect x="21" y="16" width="4" height="32" />
        <rect x="32" y="16" width="4" height="32" />
        <rect x="25" y={32 - hair / 2} width="7" height={hair} />
        <path d={`M36 16A13 16 0 0 1 36 48V${32 + iry}A${irx} ${iry} 0 0 0 36 ${32 - iry}Z`} />
      </g>
    </g>
  );
}

/* B6. Converging rays: fine lines of varying length point in from the left and resolve at the H. */
function MarkB6({ p, detail }: { p: MotionValue<number>; detail: Detail }) {
  const small = detail === "small";
  const focus: P = [19, 32];
  // `reach` is the share of the room between the H and the circle each ray fills.
  const rays = small
    ? [
        { deg: 150, reach: 0.8 },
        { deg: 180, reach: 0.95 },
        { deg: 210, reach: 0.8 },
      ]
    : [
        { deg: 128, reach: 0.55 },
        { deg: 148, reach: 0.9 },
        { deg: 166, reach: 0.65 },
        { deg: 180, reach: 0.97 },
        { deg: 194, reach: 0.65 },
        { deg: 212, reach: 0.9 },
        { deg: 232, reach: 0.55 },
      ];
  const bar = straight([19, 32], [63, 32], 60);
  const gap = 4.5;
  const ray = (deg: number, reach: number, i: number, v: number) => {
    const dir: P = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
    // Keep each ray inside the circle.
    const fx = focus[0] - 32;
    const fy = focus[1] - 32;
    const b = fx * dir[0] + fy * dir[1];
    const room = -b + Math.sqrt(b * b - (fx * fx + fy * fy - 24.5 * 24.5));
    const l = gap + (room - 1 - gap) * reach;
    const start: P = [focus[0] + dir[0] * l, focus[1] + dir[1] * l];
    // Rays stop short of the H, so they read as converging light rather than arrows.
    const end: P = [focus[0] + dir[0] * gap, focus[1] + dir[1] * gap];
    // Rays are straight at rest and bow very slightly once while animating.
    const bow = 0.9 * strength(v) * Math.sin(i * 1.9 - 4 * Math.PI * v);
    const mid: P = [(start[0] + end[0]) / 2 - dir[1] * bow, (start[1] + end[1]) / 2 + dir[0] * bow];
    return cubic(start, mid, mid, end, 12);
  };
  return (
    <>
      <circle cx="32" cy="32" r="27" {...monoline(small ? 2.2 : 1.4)} />
      <path d="M19 20V44M29 20V44M34 44V20H38A11 12 0 0 1 38 44Z" {...monoline(small ? 2.6 : 2)} />
      <LivePath p={p} build={(v) => polyline(rippleRun(bar, v, 1, 12, 29, 63))} {...monoline(small ? 2.2 : 1.4)} />
      {rays.map((r, i) => (
        <LivePath key={i} p={p} build={(v) => polyline(ray(r.deg, r.reach, i, v))} {...monoline(small ? 1.5 : 0.9)} />
      ))}
    </>
  );
}

/** Simplified marks (thicker strokes, fewer details) at or below this size, so hairlines never vanish. */
const SMALL_MAX_PX = 40;

function Mark({ variant, p, size }: { variant: MonogramVariant; p: MotionValue<number>; size: number }) {
  // Masks need ids that are unique per instance and identical on server and client.
  const id = `hd-mono-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const detail: Detail = size <= SMALL_MAX_PX ? "small" : "full";
  switch (variant) {
    case "a":
      return <MarkA p={p} id={id} />;
    case "b":
      return <MarkB p={p} />;
    case "c":
      return <MarkC p={p} />;
    case "d":
      return <MarkD p={p} />;
    case "b1":
      return <MarkB1 p={p} detail={detail} />;
    case "b2":
      return <MarkB2 p={p} detail={detail} />;
    case "b3":
      return <MarkB3 p={p} detail={detail} />;
    case "b4":
      return <MarkB4 p={p} detail={detail} />;
    case "b5":
      return <MarkB5 p={p} detail={detail} />;
    case "b6":
      return <MarkB6 p={p} detail={detail} />;
  }
}

type MonogramMarkProps = {
  variant: MonogramVariant;
  /** Rendered size in px (square). 40px and below uses the simplified drawing. */
  size: number;
  className?: string;
};

export function MonogramMark({ variant, size, className }: MonogramMarkProps) {
  const { p, play } = useRipple();
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="High Definition Advisors"
      onPointerEnter={(e) => e.pointerType === "mouse" && play()}
      className={cn("block shrink-0", className)}
    >
      <Mark variant={variant} p={p} size={size} />
    </svg>
  );
}

/* Lockup proportions, in em of the "High Definition" size. */
const ADVISORS_EM = 0.48;
const HORIZONTAL_EM = 1 + 0.16 + ADVISORS_EM;
const STACKED_MARK_EM = 2.2;
const STACKED_EM = STACKED_MARK_EM + 0.4 + 1 + 0.16 + ADVISORS_EM;

type MonogramLockupProps = {
  variant: MonogramVariant;
  /** horizontal: mark left of the wordmark. stacked: mark centered above it. */
  layout?: "horizontal" | "stacked";
  /** Total height in px. */
  height: number;
  href?: string;
  className?: string;
};

/** The mark with "High Definition" in charcoal and "ADVISORS" tracked wide in purple. */
export function MonogramLockup({ variant, layout = "horizontal", height, href, className }: MonogramLockupProps) {
  const { p, play } = useRipple();
  const stacked = layout === "stacked";
  const fontSize = height / (stacked ? STACKED_EM : HORIZONTAL_EM);
  const markEm = stacked ? STACKED_MARK_EM : HORIZONTAL_EM;
  const words = (
    <span className={cn("flex flex-col", stacked && "items-center")}>
      <span className="block leading-none font-medium whitespace-nowrap text-charcoal">High Definition</span>
      <span className="mt-[0.16em] block leading-none">
        {/* The negative margin cancels the trailing letter-space so stacked text centers truly. */}
        <span
          className={cn(
            "block text-[0.48em] leading-none font-medium tracking-[0.55em] text-purple uppercase",
            stacked && "-mr-[0.55em]",
          )}
        >
          Advisors
        </span>
      </span>
    </span>
  );
  const content = (
    <span aria-hidden="true" className={cn("flex", stacked ? "flex-col items-center gap-[0.4em]" : "items-center gap-[0.4em]")}>
      <svg viewBox="0 0 64 64" className="block shrink-0" style={{ width: `${markEm}em`, height: `${markEm}em` }}>
        <Mark variant={variant} p={p} size={markEm * fontSize} />
      </svg>
      {words}
    </span>
  );
  const shared = {
    style: { fontSize: `${fontSize}px` },
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && play(),
    onFocus: play,
    className: cn("inline-flex leading-none", className),
  };
  if (href) {
    return (
      <Link href={href} aria-label="High Definition Advisors, home" {...shared}>
        {content}
      </Link>
    );
  }
  return (
    <span role="img" aria-label="High Definition Advisors" {...shared}>
      {content}
    </span>
  );
}
