"use client";

import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { site } from "@/content/site";
import { HEADER_MARK_RIPPLE } from "@/lib/motion";
import {
  buildStackPoints,
  HEADER_MARK,
  HEADER_MARK_MONOGRAM,
  monogramTransform,
  toPath,
  type Point,
} from "@/lib/resolution-geometry";
import { MonogramShapes } from "./Monogram";

const POINTS = buildStackPoints(HEADER_MARK);

/** Ripple strength over the animation: 0 at both ends, so it starts and settles on the resting mark. */
const strength = (p: number) => (Math.sin(Math.PI * p) * (1 - p)) / 0.385;

/** A travelling ripple layered on the resting mark, fading out before the resolved tail. */
function ripple(points: Point[], index: number, p: number): Point[] {
  if (p <= 0 || p >= 1) return points;
  const amp = 2.6 * strength(p);
  return points.map(([x, y]) => {
    const fade = x < HEADER_MARK.convergeX ? (1 - x / HEADER_MARK.convergeX) ** 0.8 : 0;
    const wave = Math.sin((2 * Math.PI * x) / 46 - 4 * Math.PI * p + index * 0.7);
    return [x, y + amp * fade * wave];
  });
}

function MarkLine({ points, index, p }: { points: Point[]; index: number; p: MotionValue<number> }) {
  const d = useTransform(p, (value: number) => toPath(ripple(points, index, value)));
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={HEADER_MARK.strokeWidth}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

/**
 * Compact header mark for phones (CLAUDE.md "Header"): a mini version of the
 * full mark. From sm up the header shows the HeaderWordmark lockup instead.
 * The lines ripple briefly on load and again on hover or focus, then settle.
 * Reduced motion keeps the resting mark.
 */
export function HeaderLogo() {
  // 1 is the resting mark, so the server render and no-JS view are the final state.
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

  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      onPointerEnter={(e) => e.pointerType === "mouse" && replay()}
      onFocus={replay}
      className="-m-2 flex items-center p-2"
    >
      <svg
        viewBox={`0 0 ${HEADER_MARK.width} ${HEADER_MARK.height}`}
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="h-7 w-auto text-purple sm:h-10"
      >
        {POINTS.map((line, i) => (
          <MarkLine key={i} points={line} index={i} p={p} />
        ))}
        <g fill="currentColor" transform={monogramTransform(HEADER_MARK, HEADER_MARK_MONOGRAM)}>
          <MonogramShapes />
        </g>
      </svg>
    </Link>
  );
}
