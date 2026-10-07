"use client";

import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { HEADER_MARK_RIPPLE } from "@/lib/motion";
import { toPath, type Point } from "@/lib/resolution-geometry";
import { ALT_LOGO_HEIGHT_EM } from "./alt-logo-sizes";

/*
 * Alternate horizontal header logos: wordmark lockups with slight wave lines.
 * Exploration only (see /lab/logos); not used in the live header yet.
 *
 * Text is live HTML in Poppins Medium so it stays crisp; the line work is SVG
 * sized in em, so a whole lockup scales from one `height` prop. All lines share
 * one gentle master curve with a small per-line lag (Aqua Tower floor plates,
 * never an audio waveform) and calm to a straight resolved line.
 */

export type AltLogoVariant = "a" | "b" | "c" | "d";

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
  faint,
}: {
  spec: StackSpec;
  points: Point[];
  index: number;
  p: MotionValue<number>;
  faint?: boolean;
}) {
  const d = useTransform(p, (value: number) => toPath(rippled(spec, points, index, value)));
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={1}
      strokeOpacity={faint ? 0.5 : 1}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function Stack({
  spec,
  p,
  className,
  stretch = false,
  faint = false,
  children,
}: {
  spec: StackSpec;
  p: MotionValue<number>;
  className?: string;
  /** Stretch to the box width (for lines that span the text). */
  stretch?: boolean;
  faint?: boolean;
  children?: React.ReactNode;
}) {
  const lines = buildLines(spec);
  return (
    <svg
      viewBox={`0 0 ${spec.width} ${spec.height}`}
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block overflow-visible text-purple", className)}
    >
      {lines.map((points, i) => (
        <StackLine key={i} spec={spec} points={points} index={i} p={p} faint={faint} />
      ))}
      {children}
    </svg>
  );
}

/* Type, in em of the "High Definition" size. */
const HIGH_DEFINITION = "block leading-none font-medium whitespace-nowrap text-charcoal";

/**
 * "ADVISORS" (0.48em, see ADVISORS_EM). Spacing goes on the outer span so it
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

/* A: three lines (enough gap to stay crisp at header size) ripple on the left and converge early into the rule ADVISORS sits under. */
const SPEC_A: StackSpec = { width: 100, height: 10, lines: 3, cy: 6.5, spread: 6, amp: 0.8, wavelength: 22, x0: 0, convergeX: 42, x1: 100 };

/* B: a short stack on the left converging into one line that points into the wordmark. Units: 1/100 em. */
const SPEC_B: StackSpec = { width: 240, height: 164, lines: 5, cy: 82, spread: 64, amp: 5, wavelength: 95, x0: 4, convergeX: 175, x1: 240 };

/* C: a thin band of three lines between the rows, resolving by the right edge of the text. */
const SPEC_C: StackSpec = { width: 100, height: 10, lines: 3, cy: 5, spread: 6, amp: 0.7, wavelength: 26, x0: 0, convergeX: 90, x1: 100 };

/* D: faint lines trailing off the resolved line to the left of the wordmark. Units: 1/100 em. */
const SPEC_D: StackSpec = { width: 215, height: 208, lines: 3, cy: 130, spread: 52, amp: 4.5, wavelength: 85, x0: 4, convergeX: 150, x1: 215 };

function Lockup({ variant, p }: { variant: AltLogoVariant; p: MotionValue<number> }) {
  if (variant === "a") {
    return (
      <span className="inline-flex w-max flex-col">
        <span className={HIGH_DEFINITION}>High Definition</span>
        <Stack spec={SPEC_A} p={p} stretch className="h-[0.65em] w-full" />
        <Advisors spaceAbove="mt-[0.15em]" />
      </span>
    );
  }

  if (variant === "b") {
    return (
      <span className="inline-flex items-center gap-[0.3em]">
        <Stack spec={SPEC_B} p={p} className="h-[1.64em] w-[2.4em] shrink-0" />
        <span className="flex flex-col">
          <span className={HIGH_DEFINITION}>High Definition</span>
          <Advisors spaceAbove="mt-[0.16em]" />
        </span>
      </span>
    );
  }

  if (variant === "c") {
    return (
      <span className="inline-flex w-max flex-col">
        <span className={HIGH_DEFINITION}>High Definition</span>
        <Stack spec={SPEC_C} p={p} stretch className="my-[0.08em] h-[0.6em] w-full" />
        <Advisors />
      </span>
    );
  }

  // D: the resolved line sits in the gap between the rows, so it never touches a letter.
  return (
    <span className="inline-flex items-start">
      <Stack spec={SPEC_D} p={p} faint className="h-[2.08em] w-[2.15em] shrink-0">
        {/* The solid start of the resolved line, out of the faint trailing lines. */}
        <path d="M70 130H215" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </Stack>
      <span className="relative flex flex-col">
        <span aria-hidden="true" className="absolute inset-x-0 top-[1.3em] h-px bg-purple" />
        <span className={HIGH_DEFINITION}>High Definition</span>
        <Advisors spaceAbove="mt-[0.6em]" />
      </span>
    </span>
  );
}

type AltLogoProps = {
  variant: AltLogoVariant;
  /** Total lockup height in px (header: 36 to 44 desktop, 30 mobile). */
  height: number;
  /** Renders as a link (accessible name "High Definition Advisors, home"). */
  href?: string;
  className?: string;
};

/**
 * Waves ripple gently and settle on load (~1.5s) and again on hover or focus.
 * Reduced motion keeps the resting lines.
 */
export function AltLogo({ variant, height, href, className }: AltLogoProps) {
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
  const style = { fontSize: `${height / ALT_LOGO_HEIGHT_EM[variant]}px` };
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
          <Lockup variant={variant} p={p} />
        </span>
      </Link>
    );
  }

  return (
    <span role="img" aria-label="High Definition Advisors" {...shared}>
      <Lockup variant={variant} p={p} />
    </span>
  );
}
