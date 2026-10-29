"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, HERO } from "@/lib/motion";
import { sectionBackground, type SectionBg } from "./Section";

/**
 * Home hero (CLAUDE.md "Home hero"). The full logo (public/brand/hd-full-logo.svg),
 * centered, fades and rises in on load, then the text follows. Plays once per
 * page load; under prefers-reduced-motion everything simply appears (globals.css
 * forces [data-reveal] to its final state). Children should be RevealItems; this
 * component orchestrates their timing.
 */
export function HomeHero({ blendTo, children }: { blendTo: SectionBg; children: React.ReactNode }) {
  const background = sectionBackground("offwhite", blendTo);

  return (
    <section
      className={`w-full overflow-x-clip pt-12 pb-20 sm:pt-16 sm:pb-28 ${background.className}`}
      style={background.style}
    >
      <motion.div initial="hidden" animate="visible" variants={HERO.sequence}>
        <motion.div data-reveal="" variants={fadeUp} className="page-wrap">
          {/* The company name is the eyebrow just below, so the logo itself is decorative. */}
          <Image
            src="/brand/hd-full-logo.svg"
            alt=""
            width={873}
            height={420}
            priority
            unoptimized
            className="mx-auto h-auto w-full max-w-xl"
          />
        </motion.div>
        <motion.div variants={HERO.text} className="mt-10 sm:mt-12">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
