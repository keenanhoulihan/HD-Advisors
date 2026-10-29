import Link from "next/link";
import { site } from "@/content/site";
import { HorizontalLogo } from "./HorizontalLogo";
import { Monogram } from "./Monogram";

/**
 * Header logo (CLAUDE.md "Header" and "Logo usage"). Static and clean: the
 * horizontal logo from md up, just the HD mark below md where the Menu button
 * sits beside it. Both are inline SVG in currentColor (purple), so they stay
 * crisp on retina screens. No motion here.
 */
export function HeaderLogo() {
  return (
    <Link href="/" aria-label={`${site.name}, home`} className="-m-2 flex items-center p-2 text-purple">
      <Monogram className="block h-6 w-auto sm:h-7 md:hidden" />
      <HorizontalLogo className="hidden h-7 w-auto md:block lg:h-10" />
    </Link>
  );
}
