import { HeaderLogo } from "./HeaderLogo";
import { HeaderShell } from "./HeaderShell";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="page-wrap flex h-16 items-center justify-between sm:h-20">
        <div className="origin-left transition-transform duration-300 ease-out group-data-[scrolled=true]:scale-90 motion-reduce:transition-none">
          <HeaderLogo />
        </div>
        <NavLinks />
      </div>
    </HeaderShell>
  );
}
