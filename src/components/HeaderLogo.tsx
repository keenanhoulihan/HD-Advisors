import Link from "next/link";
import { site } from "@/content/site";
import { Monogram } from "./Monogram";

/**
 * Header logo (CLAUDE.md "Header"). Static and clean, like the deck header:
 * the HD monogram, a short thin resolved line, then "HIGH DEFINITION
 * ADVISORS" in tracked Poppins Medium caps. No line stack and no motion: at
 * header size a converging stack reads as a broom.
 *
 * The monogram is SVG and the name is live text, so both stay crisp on retina
 * screens. Below lg there isn't room beside the five nav links, so only the
 * monogram shows.
 */
export function HeaderLogo() {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className="-m-2 flex items-center gap-3 p-2 text-purple"
    >
      <Monogram className="block h-6 w-auto sm:h-7" />
      <span aria-hidden="true" className="hidden h-px w-8 shrink-0 bg-current lg:block" />
      <span
        aria-hidden="true"
        className="hidden text-[0.75rem] leading-none font-medium tracking-[0.25em] whitespace-nowrap uppercase lg:block"
      >
        High Definition Advisors
      </span>
    </Link>
  );
}
