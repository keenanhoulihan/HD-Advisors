"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky header frame. Transparent at the top of the page; once scrolled it
 * gets a soft, slightly transparent offwhite background and the logo scales
 * down a little (children read `group-data-[scrolled=true]:`).
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "group sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ease-out",
        scrolled ? "border-lavender-light bg-offwhite/85 backdrop-blur-sm" : "border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
