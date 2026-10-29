"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HERO_LOGO, LINE_STROKE, RIGHT, rightLinePath } from "@/lib/hero-logo";
import { DURATION, HERO, LINE_DRAW_EASE } from "@/lib/motion";

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
 * One right-hand line converging on the shared clock: its own ease-in-out,
 * outer lines starting a little later so they arrive last. At t = 1 every
 * part of every line is fully resolved, so the frame is the static logo.
 */
function ConvergingLine({ offset, index, t }: { offset: number; index: number; t: MotionValue<number> }) {
  const lag = HERO.lineLag * (Math.abs(index - MID) / MID);
  const d = useTransform(t, (value: number) => {
    const local = easeInOut(clamp01((value - lag) / (1 - HERO.lineLag)));
    return rightLinePath(offset, (u) => smoothstep(local * (1 + SWEEP) - (1 - u) * SWEEP));
  });
  return <motion.path d={d} />;
}

/**
 * Home hero logo: the full logo with lengthened lines. On load the right-hand
 * lines converge into one point, then a single straight line draws out of it
 * (ease-out) as the last lines arrive. `art` is the static artwork from
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
  const ref = useRef<SVGSVGElement>(null);
  // The straight line draws only to the right edge of the screen, so it moves at the same pace at any width.
  const [lineEnd, setLineEnd] = useState<number>(RIGHT.end);
  // Once it finishes, hand over to the static copy, so the last frame is exactly the static logo.
  const [done, setDone] = useState(false);
  const t = useMotionValue(0);
  const draw = useMotionValue(0);
  // A zero-length dash with a round cap still paints a dot, so stay hidden until drawing starts.
  const drawOpacity = useTransform(draw, (v) => (v > 0 ? 1 : 0));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = ref.current;
    if (svg) {
      const box = svg.getBoundingClientRect();
      const { x, width } = svg.viewBox.baseVal;
      const screenRight = x + ((document.documentElement.clientWidth - box.left) * width) / box.width;
      setLineEnd(Math.min(RIGHT.end, screenRight + 2));
    }
    const lines = animate(t, 1, { delay: HERO.delay, duration: HERO.duration, ease: "linear" });
    const straight = animate(draw, 1, { delay: HERO.lineDrawDelay, duration: DURATION.slow, ease: LINE_DRAW_EASE });
    let active = true;
    Promise.all([lines, straight]).then(() => active && setDone(true));
    return () => {
      active = false;
      lines.stop();
      straight.stop();
    };
  }, [t, draw]);

  return (
    <svg
      ref={ref}
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
            <ConvergingLine key={offset} offset={offset} index={i} t={t} />
          ))}
        </g>
        <motion.path d={`M${RIGHT.point.x} ${RIGHT.point.y}H${lineEnd}`} style={{ pathLength: draw, opacity: drawOpacity }} />
      </g>
    </svg>
  );
}
