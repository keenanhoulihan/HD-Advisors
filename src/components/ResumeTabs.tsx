"use client";

import { motion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { resume as resumeContent } from "@/content/about";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";
import { edit, list } from "@/lib/tina-live";
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
    { source: resume.whoIAm, panel: <WhoIAm content={resume.whoIAm} /> },
    { source: resume.places, panel: <ResumeMap content={resume.places} /> },
    { source: resume.timeline, panel: <ResumeTimeline content={resume.timeline} /> },
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
              key={i}
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
              <span {...edit(tab.source, "tabLabel")}>{tab.source.tabLabel}</span>
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
          key={i}
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
        <h3 className="text-h3 text-charcoal" {...edit(content, "title")}>
          {content.title}
        </h3>
        <div className="mt-5 space-y-5 text-charcoal" {...edit(content, "body")}>
          {toParagraphs(content.body).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
      <ul className="space-y-6">
        {list(content.values).map((value, i) => (
          <li key={i} className="border-t border-lavender pt-5">
            <p className="font-semibold text-purple" {...edit(value, "title")}>
              {value.title}
            </p>
            <p className="mt-1 text-slate" {...edit(value, "body")}>
              {value.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
