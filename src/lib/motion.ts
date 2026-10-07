import type { Variants } from "framer-motion";

/*
 * Shared motion language (CLAUDE.md "Motion"). Slow and calm: ease-out curves,
 * 400 to 800ms, small distances. Nothing bouncy. Every animated component
 * reads its timing from here so the site moves as one system.
 * Reduced motion is handled in globals.css: [data-reveal] and [data-draw]
 * are forced to their final state, so content just appears.
 */

/** Soft ease-out: quick to start, long gentle settle. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
} as const;

/** Vertical travel for fade-ups, in px. */
export const DISTANCE = 16;

/** Delay between siblings: header parts, list items. */
export const STAGGER = 0.08;

/** Cards and timeline entries ease in one after another, a touch slower. */
export const CARD_STAGGER = 0.12;

/** Reveal once, a little after the element's top enters the viewport. */
export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

export const staggerChildren = (stagger: number = STAGGER): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

/** The resolution line rule draws itself left to right (stroke-dashoffset via pathLength). */
export const drawLine: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: DURATION.slow, ease: EASE_OUT } },
};

/**
 * Home hero: the lines resolve over ~3.5s total (ease-in-out per line, outer
 * lines lagging so they finish last), then the text fades in once the lines
 * are mostly resolved.
 */
export const HERO = {
  delay: 0.3,
  duration: 3.4,
  /** Share of the clock the outermost lines wait before starting. */
  lineLag: 0.22,
  textDelay: 2.7,
} as const;

/** Header mark: a brief ripple that settles back into the resolved mark. */
export const HEADER_MARK_RIPPLE = {
  onLoad: 1.5,
  onHover: 1.2,
} as const;

/** Route changes: a quick, soft fade. */
export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.fast, ease: EASE_OUT },
} as const;
