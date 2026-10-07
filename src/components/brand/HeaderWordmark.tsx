"use client";

import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { HEADER_MARK_RIPPLE } from "@/lib/motion";
import { toPath, type Point } from "@/lib/resolution-geometry";

/*
 * Header wordmark lockup (CLAUDE.md "Header"): "Lead-in waves". A short stack
 * of slightly rippled lines on the left converges into one line pointing into
 * "High Definition", with "ADVISORS" tracked wide underneath, like the
 * business card. Shown from sm up; phones use the compact HeaderLogo mark.
 *
 * Text is live HTML in Poppins Medium so it stays crisp; the line work is SVG
 * sized in em, so the lockup scales from one `height` prop. The lines share
 * one gentle master curve with a small per-line lag (Aqua Tower floor plates,
 * never an audio waveform) and calm to a straight resolved line.
 * The other explored lockups (A, C, D) are in git history, commit 9d19989.
 */

type StackSpec = {
  /** viewBox size. */
  width: number;
  height: number;
  lines: number;
  /** y of the resolved line. */
  cy: number;
  /** Distance between the outer lines at the left. */
  spread: number;
  /** Resting ripple amplitude. Keep it slight. */
  amp: number;
  wavelength: number;
  x0: number;
  /** Lines are one straight line from here on. */
  convergeX: number;
  x1: number;
};

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

/** 1 at the left edge, easing to 0 where the lines converge. */
const envelope = (s: StackSpec, x: number) => 1 - smooth((x - s.x0) / (s.convergeX - s.x0));

function buildLines(s: StackSpec): Point[][] {
  const mid = (s.lines - 1) / 2;
  const spacing = s.lines > 1 ? s.spread / (s.lines - 1) : 0;
  const step = (s.convergeX - s.x0) / 28;
  return Array.from({ length: s.lines }, (_, i) => {
    const offset = (i - mid) * spacing;
    const lineAmp = s.amp * (1 + 0.15 * Math.sin(i * 2.1));
    const points: Point[] = [];
    for (let x = s.x0; x < s.convergeX; x += step) {
      const e = envelope(s, x);
      const wave = Math.sin((2 * Math.PI * x) / s.wavelength + i * 0.35);
      points.push([x, s.cy + e * (offset + lineAmp * wave)]);
    }
    points.push([s.convergeX, s.cy], [s.x1, s.cy]);
    return points;
  });
}

/** Ripple strength over a play: 0 at both ends, so it starts and settles on the resting lines. */
const strength = (p: number) => (Math.sin(Math.PI * p) * (1 - p)) / 0.385;

function rippled(s: StackSpec, points: Point[], index: number, p: number): Point[] {
  if (p <= 0 || p >= 1) return points;
  const amp = (s.spread / Math.max(1, s.lines - 1)) * 0.55 * strength(p);
  return points.map(([x, y]) => {
    const wave = Math.sin((2 * Math.PI * x) / (s.wavelength * 0.8) - 4 * Math.PI * p + index * 0.7);
    return [x, y + amp * envelope(s, x) * wave];
  });
}

function StackLine({
  spec,
  points,
  index,
  p,
}: {
  spec: StackSpec;
  points: Point[];
  index: number;
  p: MotionValue<number>;
}) {
  const d = useTransform(p, (value: number) => toPath(rippled(spec, points, index, value)));
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function Stack({ spec, p, className }: { spec: StackSpec; p: MotionValue<number>; className?: string }) {
  const lines = buildLines(spec);
  return (
    <svg
      viewBox={`0 0 ${spec.width} ${spec.height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block overflow-visible text-purple", className)}
    >
      {lines.map((points, i) => (
        <StackLine key={i} spec={spec} points={points} index={i} p={p} />
      ))}
    </svg>
  );
}

/* Type, in em of the "High Definition" size. */
const HIGH_DEFINITION = "block leading-none font-medium whitespace-nowrap text-charcoal";

/**
 * "ADVISORS" at 0.48em. Spacing goes on the outer span so it
 * is measured in the "High Definition" size, not the smaller ADVISORS size.
 */
function Advisors({ spaceAbove }: { spaceAbove?: string }) {
  return (
    <span className={cn("block leading-none", spaceAbove)}>
      <span className="block text-[0.48em] leading-none font-medium tracking-[0.55em] text-purple uppercase">
        Advisors
      </span>
    </span>
  );
}

/* Five lines converge into one that points into the wordmark. Units: 1/100 em. */
const SPEC: StackSpec = { width: 240, height: 164, lines: 5, cy: 82, spread: 64, amp: 5, wavelength: 95, x0: 4, convergeX: 175, x1: 240 };

/** Total lockup height in em: "High Definition", gap, "ADVISORS". */
const HEIGHT_EM = 1 + 0.16 + 0.48;

function Lockup({ p }: { p: MotionValue<number> }) {
  return (
    <span className="inline-flex items-center gap-[0.3em]">
      <Stack spec={SPEC} p={p} className="h-[1.64em] w-[2.4em] shrink-0" />
      <span className="flex flex-col">
        <span className={HIGH_DEFINITION}>High Definition</span>
        <Advisors spaceAbove="mt-[0.16em]" />
      </span>
    </span>
  );
}

type HeaderWordmarkProps = {
  /** Total lockup height in px (header: 40). */
  height: number;
  /** Renders as a link (accessible name "High Definition Advisors, home"). */
  href?: string;
  className?: string;
};

/**
 * Waves ripple gently and settle on load (~1.5s) and again on hover or focus.
 * Reduced motion keeps the resting lines.
 */
export function HeaderWordmark({ height, href, className }: HeaderWordmarkProps) {
  // 1 is the resting state, so the server render and no-JS view are final.
  const p = useMotionValue(1);
  const running = useRef<AnimationPlaybackControls | null>(null);

  const play = useCallback(
    (duration: number) => {
      if (running.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      p.set(0);
      running.current = animate(p, 1, {
        duration,
        ease: "linear",
        onComplete: () => {
          running.current = null;
        },
      });
    },
    [p],
  );

  useEffect(() => {
    play(HEADER_MARK_RIPPLE.onLoad);
    return () => running.current?.stop();
  }, [play]);

  const replay = () => play(HEADER_MARK_RIPPLE.onHover);
  const style = { fontSize: `${height / HEIGHT_EM}px` };
  const shared = {
    style,
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && replay(),
    onFocus: replay,
    // leading-none and flex wrappers keep the lockup exactly `height` tall (no inherited line-height strut).
    className: cn("inline-flex leading-none", className),
  };

  if (href) {
    return (
      <Link href={href} aria-label="High Definition Advisors, home" {...shared}>
        <span aria-hidden="true" className="flex">
          <Lockup p={p} />
        </span>
      </Link>
    );
  }

  return (
    <span role="img" aria-label="High Definition Advisors" {...shared}>
      <Lockup p={p} />
    </span>
  );
}
