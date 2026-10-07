"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
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
import { MonogramShapes } from "./Monogram";

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

function AnimatedPath({ points, params, t }: { points: Point[]; params: StackParams; t: MotionValue<number> }) {
  const d = useTransform(t, (value: number) => toPath(resolvePoints(points, params, value)));
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
          <AnimatedPath key={i} points={line} params={params} t={t} />
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

/**
 * Home hero (CLAUDE.md "Scroll-driven hero"). The section pins while the
 * rippling stack slowly converges into one resolved line, then releases.
 * Under prefers-reduced-motion it renders the static resolved state, unpinned.
 */
export function ScrollHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Light smoothing so wheel steps glide instead of jumping.
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0005 });
  // Hold the ripple briefly at the start and the resolved line before release.
  const t = useTransform(progress, [0.08, 0.85], [0, 1], { clamp: true });

  return (
    <div ref={ref} className="relative h-[170svh] bg-offwhite sm:h-[210svh] motion-reduce:h-auto">
      <div
        className={cn(
          "sticky top-16 flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 py-8",
          "sm:top-20 sm:min-h-[calc(100svh-5rem)] sm:gap-12",
          "motion-reduce:static motion-reduce:min-h-0 motion-reduce:py-16 sm:motion-reduce:py-20",
        )}
      >
        <div className="text-purple">
          <div className="motion-reduce:hidden">
            <HeroLines t={t} />
          </div>
          <div className="hidden motion-reduce:block">
            <HeroLines />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
