"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { drawLine, fadeUp, staggerChildren, STAGGER, VIEWPORT } from "@/lib/motion";

/*
 * Scroll reveals built from the shared variants in src/lib/motion.ts.
 * RevealGroup triggers once when it enters view and staggers its RevealItems;
 * items can sit at any depth inside the group.
 */

const tags = {
  div: motion.div,
  header: motion.header,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type Tag = keyof typeof tags;

type RevealProps = {
  as?: Tag;
  className?: string;
  id?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

export function RevealGroup({ as = "div", stagger = STAGGER, children, ...rest }: RevealProps & { stagger?: number }) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={staggerChildren(stagger)} {...rest}>
      {children}
    </Component>
  );
}

export function RevealItem({ as = "div", children, ...rest }: RevealProps) {
  const Component = tags[as] as typeof motion.div;
  return (
    <Component data-reveal="" variants={fadeUp} {...rest}>
      {children}
    </Component>
  );
}

/**
 * The resolved single line under headings, drawn left to right. Inside a
 * RevealGroup it takes its turn in the stagger; on its own it triggers itself.
 */
export function DrawRule({ className, standalone = false }: { className?: string; standalone?: boolean }) {
  const trigger = standalone ? { initial: "hidden", whileInView: "visible", viewport: VIEWPORT } : {};
  return (
    <svg
      viewBox="0 0 80 2"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-0.5 w-20 overflow-visible", className)}
    >
      <motion.line
        data-draw=""
        x1="0"
        y1="1"
        x2="80"
        y2="1"
        stroke="currentColor"
        strokeWidth={1.5}
        variants={drawLine}
        {...trigger}
      />
    </svg>
  );
}
