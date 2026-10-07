import Link from "next/link";
import { mottos } from "@/content/mottos";
import { nav, site } from "@/content/site";
import { ResolutionLine } from "./ResolutionLine";

export function SiteFooter() {
  return (
    <footer className="bg-offwhite">
      <ResolutionLine variant="monogram" className="pt-16 sm:pt-20" />

      <div className="page-wrap grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-h3 text-charcoal">{site.tagline}</p>
          <p className="mt-3 text-slate">{mottos.secondary}</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-purple">Explore</p>
          <ul className="mt-5 space-y-3">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-charcoal hover:text-purple">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-purple">Get in touch</p>
          <ul className="mt-5 space-y-3 text-charcoal">
            <li>{site.contact.email}</li>
            <li>{site.contact.phone}</li>
            <li>{site.contact.website}</li>
          </ul>
        </div>
      </div>

      <div className="page-wrap">
        <p className="border-t border-lavender-light py-6 text-sm text-slate">
          &copy; {site.name}. {mottos.scaling}
        </p>
      </div>
    </footer>
  );
}
