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
 * Every mark is drawn on a 64 x 64 grid, purple only, flat. Line elements
 * carry the resolution idea: slight ripples on the left (Aqua Tower floor
 * plates, never an audio waveform) that straighten toward the right. They
 * ripple once and settle on load and on hover or focus (~1.2s).
 */

export type MonogramVariant = "a" | "b" | "c" | "d";

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

function Mark({ variant, p }: { variant: MonogramVariant; p: MotionValue<number> }) {
  // Masks need ids that are unique per instance and identical on server and client.
  const id = `hd-mono-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  if (variant === "a") return <MarkA p={p} id={id} />;
  if (variant === "b") return <MarkB p={p} />;
  if (variant === "c") return <MarkC p={p} />;
  return <MarkD p={p} />;
}

type MonogramMarkProps = {
  variant: MonogramVariant;
  /** Rendered size in px (square). */
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
      <Mark variant={variant} p={p} />
    </svg>
  );
}

/** Lockup proportions in em of the "High Definition" size. */
const LOCKUP_HEIGHT_EM = 1 + 0.16 + 0.48;

type MonogramLockupProps = {
  variant: MonogramVariant;
  /** Total height in px; the mark is this tall. */
  height: number;
  href?: string;
  className?: string;
};

/** Mark on the left; "High Definition" in charcoal with "ADVISORS" tracked wide in purple underneath. */
export function MonogramLockup({ variant, height, href, className }: MonogramLockupProps) {
  const { p, play } = useRipple();
  const content = (
    <span aria-hidden="true" className="flex items-center gap-[0.4em]">
      <svg viewBox="0 0 64 64" className="block h-[1.64em] w-[1.64em] shrink-0">
        <Mark variant={variant} p={p} />
      </svg>
      <span className="flex flex-col">
        <span className="block leading-none font-medium whitespace-nowrap text-charcoal">High Definition</span>
        <span className="mt-[0.16em] block leading-none">
          <span className="block text-[0.48em] leading-none font-medium tracking-[0.55em] text-purple uppercase">
            Advisors
          </span>
        </span>
      </span>
    </span>
  );
  const shared = {
    style: { fontSize: `${height / LOCKUP_HEIGHT_EM}px` },
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
