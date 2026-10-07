"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-5 sm:gap-9">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[0.95rem] font-medium decoration-[1.5px] underline-offset-[0.6em] transition-colors sm:text-base",
                  active ? "text-purple underline" : "text-charcoal hover:text-purple",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
