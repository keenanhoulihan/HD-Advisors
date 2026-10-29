"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { edit } from "@/lib/tina-live";
import { navItems, useSite } from "./SiteLive";

type NavItem = ReturnType<typeof navItems>[number];

/**
 * Inline links from md up. Below md there isn't room beside the monogram, so a
 * Menu button opens the same links in a simple panel under the header.
 */
export function NavLinks() {
  const siteData = useSite();
  const items = navItems(siteData);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const panelId = useId();

  // Close the panel after navigating.
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (item: NavItem, className: string) => {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        {...edit(siteData.site.nav, item.field)}
        className={cn("link-underline font-medium", active ? "text-purple" : "text-charcoal hover:text-purple", className)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav aria-label="Main">
      <ul className="hidden items-center gap-6 md:flex lg:gap-9">
        {items.map((item) => (
          <li key={item.href}>{link(item, "text-base")}</li>
        ))}
      </ul>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpenedAt(pathname);
          setOpen((value) => !value);
        }}
        className="-mr-2 flex items-center gap-3 p-2 font-medium text-charcoal md:hidden"
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className={cn("h-[1.5px] bg-purple transition-transform duration-200 ease-out motion-reduce:transition-none", open && "translate-y-[3.25px] rotate-45")} />
          <span className={cn("h-[1.5px] bg-purple transition-transform duration-200 ease-out motion-reduce:transition-none", open && "-translate-y-[3.25px] -rotate-45")} />
        </span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-lavender-light bg-offwhite md:hidden"
      >
        <ul className="page-wrap py-4">
          {items.map((item) => (
            <li key={item.href} className="border-t border-lavender-light first:border-t-0">
              {link(item, "block py-4 text-lg")}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
