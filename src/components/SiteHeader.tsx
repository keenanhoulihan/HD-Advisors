import Link from "next/link";
import { site } from "@/content/site";
import { Monogram } from "./Monogram";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-lavender-light bg-offwhite/95 backdrop-blur-sm">
      <div className="page-wrap flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="-m-2 p-2">
          <Monogram title={`${site.name}, home`} className="h-7 w-auto text-purple sm:h-8" />
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
