"use client";

import { motion, type Variants } from "framer-motion";
import { HERO_LOGO } from "@/lib/hero-logo";
import { HERO, STAGGER } from "@/lib/motion";
import { HeroLogo } from "./HeroLogo";
import { sectionBackground, type SectionBg } from "./Section";

/** The headline, sentence, and CTA wait until the lines have resolved. */
const heroText: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: HERO.textDelay, staggerChildren: STAGGER } },
};

/**
 * Home hero (CLAUDE.md "Home hero"). The full logo, centered on the HD, with
 * its right-hand lines converging on load (HeroLogo). `logoArt` is the static
 * logo artwork rendered on the server (HeroLogoArt). Children should be
 * RevealItems; this component orchestrates their timing. Plays once per page
 * load; under prefers-reduced-motion everything shows finished at once.
 */
export function HomeHero({
  blendTo,
  logoArt,
  children,
}: {
  blendTo: SectionBg;
  logoArt: React.ReactNode;
  children: React.ReactNode;
}) {
  const background = sectionBackground("offwhite", blendTo);

  return (
    <section
      className={`w-full overflow-x-clip pt-12 pb-20 sm:pt-16 sm:pb-28 ${background.className}`}
      style={background.style}
    >
      {/*
        The logo box keeps the HD and wordmark at their size, centered on the screen. The drawing is
        HERO_LOGO.bleed boxes wide around it, so the lines run off both edges; the band clips them.
      */}
      <div
        className="relative mx-auto w-full text-purple"
        style={{
          maxWidth: `${HERO_LOGO.maxWidthRem}rem`,
          aspectRatio: `${HERO_LOGO.box.width} / ${HERO_LOGO.box.height}`,
        }}
      >
        <HeroLogo
          art={logoArt}
          className="absolute top-0 block h-full max-w-none"
          style={{ left: `${(-(HERO_LOGO.bleed - 1) / 2) * 100}%`, width: `${HERO_LOGO.bleed * 100}%` }}
        />
      </div>
      <motion.div initial="hidden" animate="visible" variants={heroText} className="mt-10 sm:mt-12">
        {children}
      </motion.div>
    </section>
  );
}
