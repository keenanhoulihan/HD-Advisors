import { HeaderWordmark } from "./brand/HeaderWordmark";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderShell } from "./HeaderShell";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="page-wrap flex h-16 items-center justify-between sm:h-20">
        <div className="origin-left transition-transform duration-300 ease-out group-data-[scrolled=true]:scale-90 motion-reduce:transition-none">
          {/* The wordmark lockup is too wide beside the nav on phones, so they get the compact mark. */}
          <div className="sm:hidden">
            <HeaderLogo />
          </div>
          <div className="hidden sm:block">
            <HeaderWordmark height={40} href="/" />
          </div>
        </div>
        <NavLinks />
      </div>
    </HeaderShell>
  );
}
