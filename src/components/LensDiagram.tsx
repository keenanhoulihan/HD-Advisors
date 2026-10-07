"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { integratedPlan, lenses } from "@/content/approach";
import { cn } from "@/lib/cn";
import { CARD_STAGGER, fadeUp, staggerChildren, VIEWPORT } from "@/lib/motion";
import { lensIllustrations } from "./LensIllustrations";

// Card centers in a four-column row, as fractions of the diagram width.
const LENS_CENTERS = [0.125, 0.375, 0.625, 0.875];

const lensPath = (center: number) => {
  const x = center * 1000;
  return `M${x} 0C${x} 70 500 50 500 120`;
};

/**
 * Four Lenses, One Roadmap. Hover (mouse), tap, or keyboard focus on a lens
 * highlights its line flowing into the integrated plan and reveals its detail.
 */
export function LensDiagram() {
  const [active, setActive] = useState<number | null>(null);
  const release = (i: number) => setActive((current) => (current === i ? null : current));

  return (
    <div>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerChildren(CARD_STAGGER)}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {lenses.map((lens, i) => {
          const isActive = active === i;
          const Illustration = lensIllustrations[i];
          const detailId = `lens-detail-${i}`;
          return (
            <motion.li
              key={lens.name}
              data-reveal=""
              variants={fadeUp}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onPointerLeave={(e) => e.pointerType === "mouse" && release(i)}
              className={cn(
                "relative flex flex-col border bg-offwhite p-6 transition-colors duration-300 motion-reduce:transition-none sm:p-8",
                isActive ? "border-purple" : "border-lavender-light",
              )}
            >
              <Illustration className="h-auto w-full" />
              {/* The button's overlay makes the whole card the tap target. */}
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={detailId}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => release(i)}
                className="mt-6 text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-purple"
              >
                <span className="eyebrow block text-purple">Lens {String(i + 1).padStart(2, "0")}</span>
                <span className="mt-3 block text-h3 text-charcoal">{lens.name}</span>
                <span className="mt-3 block font-medium text-charcoal">{lens.summary}</span>
              </button>
              <div
                id={detailId}
                aria-hidden={!isActive}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
                  // Desktop reserves the space so hovering never shifts the row.
                  isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:grid-rows-[1fr]",
                )}
              >
                <p className="overflow-hidden text-slate">
                  <span className="block pt-3">{lens.detail}</span>
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* The four lenses converge into one plan. */}
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="hidden h-28 w-full lg:block"
      >
        {LENS_CENTERS.map((center, i) => (
          <path
            key={center}
            d={lensPath(center)}
            stroke="currentColor"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className={cn(
              "transition-colors duration-300 motion-reduce:transition-none",
              active === null || active === i ? "text-purple" : "text-lavender-light",
            )}
          />
        ))}
        {active !== null && (
          <path
            key={`flow-${active}`}
            d={lensPath(LENS_CENTERS[active])}
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="0.5 16"
            vectorEffect="non-scaling-stroke"
            className="text-purple motion-safe:animate-lens-flow motion-reduce:hidden"
          />
        )}
      </svg>
      <svg
        viewBox="0 0 2 56"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="mx-auto block h-14 w-0.5 text-purple lg:hidden"
      >
        <path d="M1 0V56" stroke="currentColor" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        {active !== null && (
          <path
            d="M1 0V56"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="0.5 16"
            vectorEffect="non-scaling-stroke"
            className="motion-safe:animate-lens-flow motion-reduce:hidden"
          />
        )}
      </svg>

      <div className="border-[1.5px] border-purple bg-aqua-light px-8 py-10 text-center sm:px-12 sm:py-12">
        <p className="eyebrow text-purple">{integratedPlan.label}</p>
        <h3 className="mt-3 text-h3 text-charcoal">{integratedPlan.title}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-slate">{integratedPlan.body}</p>
        <p aria-live="polite" className="mt-4 min-h-[1.5em] text-sm font-medium text-purple">
          {active !== null && `${lenses[active].name} flows into the plan.`}
        </p>
      </div>
    </div>
  );
}
