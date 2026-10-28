"use client";

import { useId, useState } from "react";
import type { resume } from "@/content/about";
import { cn } from "@/lib/cn";
import { ResolutionLine } from "./ResolutionLine";

/**
 * "What I've Done": a vertical timeline, earliest first. Each entry is a real
 * button (aria-expanded) that opens its detail in place. Like the phased
 * roadmap, the line stack calms with each step, and the most recent entry is
 * the one aqua accent.
 */
export function ResumeTimeline({ content }: { content: (typeof resume)["timeline"] }) {
  const baseId = useId();
  const { entries } = content;
  const [open, setOpen] = useState<number | null>(entries.length - 1);

  return (
    <div>
      <p className="text-slate">{content.intro}</p>

      <ol className="relative mt-8 border-l-[1.5px] border-lavender pl-6 sm:pl-10">
        {entries.map((entry, i) => {
          const expanded = open === i;
          const latest = i === entries.length - 1;
          const panelId = `${baseId}-entry-${i}`;
          return (
            <li key={`${entry.role}-${entry.organization}`} className="relative pb-2 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-[1.6rem] -left-[calc(1.5rem+5.75px)] size-2.5 rounded-full ring-4 ring-offwhite sm:-left-[calc(2.5rem+5.75px)]",
                  latest ? "bg-aqua" : "bg-purple",
                )}
              />
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : i)}
                  className="group flex w-full items-start justify-between gap-6 py-4 text-left"
                >
                  <span>
                    <span className="eyebrow block text-purple">{entry.years}</span>
                    <span className="mt-2 block text-lg leading-snug font-semibold text-charcoal transition-colors duration-200 ease-out group-hover:text-purple sm:text-xl">
                      {entry.role}
                    </span>
                    <span className="mt-1 block text-slate">{entry.organization}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-8 text-xl leading-none text-purple transition-transform duration-200 ease-out motion-reduce:transition-none",
                      expanded && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
              </h3>

              <div id={panelId} hidden={!expanded} className="pb-6">
                <div className="max-w-xl bg-lavender-tint p-6">
                  <ResolutionLine variant="partial" compact resolve={(i + 1) / entries.length} tone={latest ? "aqua" : "purple"} />
                  <p className="mt-5 text-sm text-slate">{entry.location}</p>
                  <p className="mt-2 text-charcoal">{entry.description}</p>
                  {(entry.isBoard || entry.lenses.length > 0) && (
                    <ul aria-label="Tags" className="mt-5 flex flex-wrap gap-2">
                      {entry.isBoard && (
                        <li className="rounded-full bg-purple px-3 py-1 text-xs font-medium tracking-wide text-white">
                          Board and civic
                        </li>
                      )}
                      {entry.lenses.map((lens) => (
                        <li
                          key={lens}
                          className="rounded-full border border-purple px-3 py-1 text-xs font-medium tracking-wide text-purple"
                        >
                          {lens}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
