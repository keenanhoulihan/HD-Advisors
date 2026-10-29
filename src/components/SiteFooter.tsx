"use client";

import Link from "next/link";
import { edit } from "@/lib/tina-live";
import { ContactLinks } from "./ContactLinks";
import { navItems, useSite } from "./SiteLive";

/** `logo` is the horizontal logo, rendered by the layout on the server so its paths stay out of the bundle. */
export function SiteFooter({ logo }: { logo: React.ReactNode }) {
  const siteData = useSite();
  const { site, mottos } = siteData;
  const links = [{ href: "/", label: site.nav.home, field: "home" }, ...navItems(siteData)];

  return (
    <footer className="bg-offwhite">
      <div className="page-wrap flex justify-center pt-16 text-purple sm:pt-20">{logo}</div>

      <div className="page-wrap grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-h3 text-charcoal" {...edit(mottos, "primary")}>
            {mottos.primary}
          </p>
          <p className="mt-3 text-slate" {...edit(mottos, "secondary")}>
            {mottos.secondary}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-purple" {...edit(site.footer, "exploreLabel")}>
            {site.footer.exploreLabel}
          </p>
          <ul className="mt-5 space-y-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-charcoal hover:text-purple"
                  {...edit(site.nav, item.field)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-purple" {...edit(site.footer, "contactLabel")}>
            {site.footer.contactLabel}
          </p>
          <ul className="mt-5 space-y-3 text-charcoal">
            <ContactLinks />
          </ul>
        </div>
      </div>

      <div className="page-wrap">
        <p className="border-t border-lavender-light py-6 text-sm text-slate">
          &copy; {site.name}. <span {...edit(mottos, "scaling")}>{mottos.scaling}</span>
        </p>
      </div>
    </footer>
  );
}
