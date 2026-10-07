"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { pageFade } from "@/lib/motion";

declare global {
  interface Window {
    __hdHasNavigated?: boolean;
  }
}

/**
 * Soft fade between routes. Templates remount on every navigation; the first
 * page load renders at full opacity so the server HTML is never hidden.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [initial] = useState(() =>
    typeof window !== "undefined" && window.__hdHasNavigated ? pageFade.initial : false,
  );

  useEffect(() => {
    window.__hdHasNavigated = true;
  }, []);

  return (
    <motion.div data-reveal="" initial={initial} animate={pageFade.animate} transition={pageFade.transition}>
      {children}
    </motion.div>
  );
}
