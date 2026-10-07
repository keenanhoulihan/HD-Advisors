"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
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
 * Home hero (CLAUDE.md "Hero animation"). On load, the rippling stack slowly
 * converges into one resolved line through the monogram. It plays once, on its
 * own clock, so scrolling never feels hijacked. Under prefers-reduced-motion
 * it renders the static resolved state.
 */
export function HeroResolve({ blendTo, children }: { blendTo: SectionBg; children: React.ReactNode }) {
  const background = sectionBackground("offwhite", blendTo);
  const t = useMotionValue(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Let the ripple register for a beat, then resolve slowly.
    const controls = animate(t, 1, { delay: 0.8, duration: 3.6, ease: [0.45, 0, 0.25, 1] });
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
      {children}
    </section>
  );
}
