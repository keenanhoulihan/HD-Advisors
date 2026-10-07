"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue, type Variants } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";
import {
  buildStackPoints,
  HERO_DESKTOP,
  HERO_DESKTOP_MONOGRAM,
  HERO_MOBILE,
  HERO_MOBILE_MONOGRAM,
  monogramTransform,
  resolvePoints,
  toPath,
  type MonogramPlacement,
  type Point,
  type StackParams,
} from "@/lib/resolution-geometry";
import { HERO, STAGGER } from "@/lib/motion";
import { MonogramShapes } from "./Monogram";
import { sectionBackground, type SectionBg } from "./Section";

type HeroGeometry = { params: StackParams; monogram: MonogramPlacement; points: Point[][] };

const DESKTOP: HeroGeometry = {
  params: HERO_DESKTOP,
  monogram: HERO_DESKTOP_MONOGRAM,
  points: buildStackPoints(HERO_DESKTOP),
};
const MOBILE: HeroGeometry = {
  params: HERO_MOBILE,
  monogram: HERO_MOBILE_MONOGRAM,
  points: buildStackPoints(HERO_MOBILE),
};

const DESKTOP_QUERY = "(min-width: 40rem)";

/** null until hydrated, so the server and first client render match. */
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Each line runs its own eased resolve inside the shared clock. Outer lines
 * start a little later, so they finish last.
 */
function AnimatedPath({
  points,
  params,
  t,
  index,
}: {
  points: Point[];
  params: StackParams;
  t: MotionValue<number>;
  index: number;
}) {
  const mid = (params.lines - 1) / 2;
  const lag = HERO.lineLag * (mid ? Math.abs(index - mid) / mid : 0);
  const d = useTransform(t, (value: number) => {
    const local = easeInOut(Math.min(1, Math.max(0, (value - lag) / (1 - HERO.lineLag))));
    return toPath(resolvePoints(points, params, local));
  });
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth={params.strokeWidth}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}

function HeroSvg({
  geometry,
  t,
  slice = false,
  className,
}: {
  geometry: HeroGeometry;
  /** Omit for the static, fully resolved state. */
  t?: MotionValue<number>;
  slice?: boolean;
  className?: string;
}) {
  const { params, monogram, points } = geometry;
  return (
    <svg
      viewBox={`0 0 ${params.width} ${params.height}`}
      preserveAspectRatio={slice ? "xMidYMid slice" : undefined}
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {points.map((line, i) =>
        t ? (
          <AnimatedPath key={i} index={i} points={line} params={params} t={t} />
        ) : (
          <path
            key={i}
            d={toPath(resolvePoints(line, params, 1))}
            stroke="currentColor"
            strokeWidth={params.strokeWidth}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ),
      )}
      <g className="text-purple" fill="currentColor" transform={monogramTransform(params, monogram)}>
        <MonogramShapes />
      </g>
    </svg>
  );
}

/** Both sizes render until hydration; after that only the visible one animates. */
function HeroLines({ t }: { t?: MotionValue<number> }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  return (
    <>
      {isDesktop !== true && <HeroSvg geometry={MOBILE} t={t} className="block h-auto w-full sm:hidden" />}
      {isDesktop !== false && (
        // Fixed height with slice keeps the stack bleeding off the left edge
        // while leaving room for the headline on short laptop screens.
        <div className="hidden h-[min(19vw,30svh)] sm:block">
          <HeroSvg geometry={DESKTOP} t={t} slice className="h-full w-full" />
        </div>
      )}
    </>
  );
}

/** The headline, tagline, and CTA wait until the lines are mostly resolved. */
const heroText: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: HERO.textDelay, staggerChildren: STAGGER } },
};

/**
 * Home hero (CLAUDE.md "Hero animation"). On load, the rippling lines calm and
 * converge into one resolved line on their own clock (no scrolling), outer
 * lines last, then the text fades in. Plays once per page load. Under
 * prefers-reduced-motion everything renders resolved and visible instantly.
 * Children should be RevealItems; this component orchestrates their timing.
 */
export function HeroResolve({ blendTo, children }: { blendTo: SectionBg; children: React.ReactNode }) {
  const background = sectionBackground("offwhite", blendTo);
  const t = useMotionValue(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The shared clock is linear; each line applies its own ease-in-out.
    const controls = animate(t, 1, { delay: HERO.delay, duration: HERO.duration, ease: "linear" });
    return () => controls.stop();
  }, [t]);

  return (
    <section
      className={`flex flex-col gap-10 pt-10 pb-20 sm:gap-12 sm:pt-16 sm:pb-28 ${background.className}`}
      style={background.style}
    >
      <div className="text-purple">
        <div className="motion-reduce:hidden">
          <HeroLines t={t} />
        </div>
        <div className="hidden motion-reduce:block">
          <HeroLines />
        </div>
      </div>
      <motion.div initial="hidden" animate="visible" variants={heroText}>
        {children}
      </motion.div>
    </section>
  );
}
