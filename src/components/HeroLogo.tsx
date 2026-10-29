"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { HERO_LOGO, LINE_STROKE, RIGHT, rightLinePath } from "@/lib/hero-logo";
import { HERO } from "@/lib/motion";

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const smoothstep = (t: number) => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** Convergence sweeps from the point back toward the D, like the original hero. */
const SWEEP = 0.6;
const MID = (RIGHT.offsets.length - 1) / 2;
/**
 * A tail fades out over its last MERGE units above or below the center line
 * (~1.6px on desktop), so tails never pile up as a thick stroke while they
 * settle. Smaller than the closest line's starting distance (2.7), so at the
 * start all 22 lines are fully drawn and the single line is not there yet.
 */
const MERGE = 2.5;

/** Outer lines start a little later, so they arrive last. */
const lagOf = (index: number) => HERO.lineLag * (Math.abs(index - MID) / MID);

/** How far line `index` has converged at clock value `value`: its eased progress and its tip (0 spread, 1 on the point). */
function progress(value: number, index: number) {
  const local = easeInOut(clamp01((value - lagOf(index)) / (1 - HERO.lineLag)));
  return { local, tip: smoothstep(local * (1 + SWEEP)) };
}

/** How far line `index`'s tail is from the center line at clock value `value`. */
const distance = (value: number, index: number) =>
  Math.abs(RIGHT.offsets[index] - RIGHT.point.y) * (1 - progress(value, index).tip);

/** 0 → 1 as a tail closes the last MERGE units to the center line: it hands over to the single line. */
const merged = (value: number, index: number) => smoothstep(1 - distance(value, index) / MERGE);

/** The part of a line from the D to the point, converging (clipped to leave the gap at the D). */
function Head({ offset, index, t }: { offset: number; index: number; t: MotionValue<number> }) {
  const d = useTransform(t, (value: number) => {
    const { local } = progress(value, index);
    return rightLinePath(offset, (u) => smoothstep(local * (1 + SWEEP) - (1 - u) * SWEEP));
  });
  return <motion.path d={d} />;
}

/**
 * The part of a line from the point to the right edge. It rides at the height
 * of the line's tip, so it starts spread like the left side and settles onto
 * the center line as the line arrives; there it is the same stroke as the
 * single line, so it fades out as the single line takes over.
 */
function Tail({ offset, index, t }: { offset: number; index: number; t: MotionValue<number> }) {
  const { point } = RIGHT;
  const d = useTransform(t, (value: number) => {
    const y = point.y + (offset - point.y) * (1 - progress(value, index).tip);
    return `M${point.x} ${Math.round(y * 100) / 100}H${RIGHT.end}`;
  });
  const opacity = useTransform(t, (value: number) => 1 - merged(value, index));
  return <motion.path d={d} style={{ opacity }} />;
}

/** The single line fades in exactly as the line nearest the center fades out onto it. */
const NEAREST = Math.floor(MID);

/**
 * Home hero logo. At the start all 22 right-hand lines run, spread and
 * parallel, to the right edge, like the left side. On load they pull into one
 * point (outer lines last) and their tails settle onto the center line and
 * merge into the single straight line. `art` is the static artwork from
 * HeroLogoArt, rendered on the server. The animated lines only show when
 * JavaScript runs and motion is allowed (`hero-anim`, see globals.css);
 * otherwise the finished copy in `art` shows.
 */
export function HeroLogo({
  art,
  className,
  style,
}: {
  art: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Once it finishes, hand over to the static copy, so the last frame is exactly the static logo.
  const [done, setDone] = useState(false);
  const t = useMotionValue(0);
  const singleOpacity = useTransform(t, (value: number) => merged(value, NEAREST));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = animate(t, 1, { delay: HERO.delay, duration: HERO.duration, ease: "linear" });
    let active = true;
    lines.then(() => active && setDone(true));
    return () => {
      active = false;
      lines.stop();
    };
  }, [t]);

  return (
    <svg
      viewBox={HERO_LOGO.viewBox}
      style={style}
      fill="currentColor"
      className={className}
      data-hero-done={done || undefined}
      aria-hidden="true"
      focusable="false"
    >
      {art}
      <g className="hero-anim" fill="none" {...LINE_STROKE}>
        <g clipPath="url(#hero-clip-right)">
          {RIGHT.offsets.map((offset, i) => (
            <Head key={offset} offset={offset} index={i} t={t} />
          ))}
        </g>
        {/* Outside the clip: the logo's clip outline stops short of the right edge. */}
        {RIGHT.offsets.map((offset, i) => (
          <Tail key={offset} offset={offset} index={i} t={t} />
        ))}
        <motion.path d={`M${RIGHT.point.x} ${RIGHT.point.y}H${RIGHT.end}`} style={{ opacity: singleOpacity }} />
      </g>
    </svg>
  );
}
