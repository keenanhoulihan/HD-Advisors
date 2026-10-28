"use client";

import { motion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { resume as resumeContent } from "@/content/about";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";
import { ResumeMap } from "./ResumeMap";
import { ResumeTimeline } from "./ResumeTimeline";

type Resume = typeof resumeContent;

/**
 * Kate's interactive bio: Who I Am, Where I've Been (map), What I've Done
 * (timeline). WAI-ARIA tabs: arrow keys, Home, and End move between tabs, and
 * every panel stays in the page so its text is always there for search and
 * screen readers.
 */
export function ResumeTabs({ resume }: { resume: Resume }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = [
    { label: resume.whoIAm.tabLabel, panel: <WhoIAm content={resume.whoIAm} /> },
    { label: resume.places.tabLabel, panel: <ResumeMap content={resume.places} /> },
    { label: resume.timeline.tabLabel, panel: <ResumeTimeline content={resume.timeline} /> },
  ];

  const select = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key]);
    }
  };

  return (
    <div className="bg-offwhite">
      <div role="tablist" aria-label={resume.title} className="grid grid-cols-3 border-b border-lavender-light" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.label}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "relative px-2 py-5 text-center text-sm font-medium transition-colors duration-200 ease-out sm:px-6 sm:text-base",
                selected ? "text-purple" : "text-slate hover:text-purple",
              )}
            >
              {tab.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-px h-[1.5px] origin-left bg-purple transition-transform duration-400 ease-out motion-reduce:transition-none",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="p-6 focus-visible:outline-offset-[-2px] sm:p-10"
        >
          {i === active && (
            <motion.div data-reveal="" initial="hidden" animate="visible" variants={fadeUp}>
              {tab.panel}
            </motion.div>
          )}
          {/* Inactive panels keep their text in the page for search and assistive tech. */}
          {i !== active && tab.panel}
        </div>
      ))}
    </div>
  );
}

function WhoIAm({ content }: { content: Resume["whoIAm"] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
      <div>
        <h3 className="text-h3 text-charcoal">{content.title}</h3>
        <div className="mt-5 space-y-5 text-charcoal">
          {toParagraphs(content.body).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <ul className="space-y-6">
        {content.values.map((value) => (
          <li key={value.title} className="border-t border-lavender pt-5">
            <p className="font-semibold text-purple">{value.title}</p>
            <p className="mt-1 text-slate">{value.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
