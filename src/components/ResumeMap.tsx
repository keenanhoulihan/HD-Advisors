"use client";

import { useState } from "react";
import type { MapPin, resume } from "@/content/about";
import { cn } from "@/lib/cn";
import { edit, list } from "@/lib/tina-live";
import { AMERICAS_MAP, MID_ATLANTIC_INSET, type MapFrame } from "@/lib/map-geometry";

/*
 * "Where I've Been": a flat SVG map of the Americas (one static path from
 * scripts/build-map-geometry.mjs, no map library) with clickable pins placed
 * from each pin's latitude and longitude. Washington DC, Charlottesville, and
 * Williamsburg sit too close together at this scale, so pins inside the
 * Mid-Atlantic bounds show in a zoomed inset instead.
 */

const RAD = Math.PI / 180;

const project = (frame: MapFrame, pin: MapPin) => ({
  x: frame.scale * pin.lng * RAD + frame.tx,
  y: -frame.scale * pin.lat * RAD + frame.ty,
});

const inBounds = (frame: MapFrame, pin: MapPin) => {
  const [west, north, east, south] = frame.bounds;
  return pin.lng >= west && pin.lng <= east && pin.lat <= north && pin.lat >= south;
};

// Where the inset sits on the main map: open Atlantic, east of the coast.
const INSET_X = 418;
const INSET_Y = 72;
const INSET_SCALE = 0.72;
const INSET_H = MID_ATLANTIC_INSET.height * INSET_SCALE;

type Placed = { pin: MapPin; index: number; x: number; y: number };

export function ResumeMap({ content }: { content: (typeof resume)["places"] }) {
  const [active, setActive] = useState(0);
  const { width, height } = AMERICAS_MAP;

  const pins = list(content.pins);
  const placed: Placed[] = pins.map((pin, index) => {
    if (inBounds(MID_ATLANTIC_INSET, pin)) {
      const p = project(MID_ATLANTIC_INSET, pin);
      return { pin, index, x: INSET_X + p.x * INSET_SCALE, y: INSET_Y + p.y * INSET_SCALE };
    }
    return { pin, index, ...project(AMERICAS_MAP, pin) };
  });

  // The small frame on the main map that the inset zooms into.
  const [west, north, east, south] = MID_ATLANTIC_INSET.bounds;
  const nw = project(AMERICAS_MAP, { lat: north, lng: west } as MapPin);
  const se = project(AMERICAS_MAP, { lat: south, lng: east } as MapPin);

  // Kate may remove pins while editing: never point past the end of the list.
  const current = pins[Math.min(active, pins.length - 1)];

  return (
    <div>
      <p className="text-slate" {...edit(content, "intro")}>
        {content.intro}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-12">
        <div className="relative mx-auto w-full max-w-136">
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={content.mapLabel} className="block h-auto w-full">
            <path d={AMERICAS_MAP.path} className="fill-lavender-light" />

            {/* Zoom frame and its leader line: thin, resolved, purple. */}
            <rect
              x={nw.x}
              y={nw.y}
              width={se.x - nw.x}
              height={se.y - nw.y}
              className="fill-none stroke-purple"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={se.x}
              y1={nw.y}
              x2={INSET_X}
              y2={INSET_Y + INSET_H}
              className="stroke-purple"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />

            <g transform={`translate(${INSET_X} ${INSET_Y}) scale(${INSET_SCALE})`}>
              <rect width={MID_ATLANTIC_INSET.width} height={MID_ATLANTIC_INSET.height} className="fill-offwhite" />
              <path d={MID_ATLANTIC_INSET.path} className="fill-lavender-light" />
              <rect
                width={MID_ATLANTIC_INSET.width}
                height={MID_ATLANTIC_INSET.height}
                className="fill-none stroke-purple"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <text x={INSET_X} y={INSET_Y - 10} className="fill-slate text-[15px] font-medium tracking-[0.2em] uppercase">
              {content.insetLabel}
            </text>
          </svg>

          {/* Pins are real buttons laid over the map, so they take focus and clicks like any control. */}
          {placed.map(({ pin, index, x, y }) => {
            const selected = index === active;
            return (
              <button
                key={index}
                type="button"
                aria-pressed={selected}
                aria-label={pin.place}
                title={pin.place}
                onClick={() => setActive(index)}
                className="group absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:size-10"
                style={{ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` }}
              >
                {pin.isRegion ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-7 rounded-full border-[1.5px] border-purple transition-[background-color] duration-200 ease-out sm:size-9",
                      selected ? "bg-purple/15" : "bg-transparent group-hover:bg-purple/10",
                    )}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-full bg-purple ring-offwhite transition-[width,height] duration-200 ease-out motion-reduce:transition-none",
                      selected ? "size-4 ring-4 outline-[1.5px] outline-offset-4 outline-purple outline-solid" : "size-2.5 ring-2 group-hover:size-3.5",
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div>
          {current && (
            <div aria-live="polite" className="border-l-[1.5px] border-purple bg-lavender-tint p-6 sm:p-8">
              <p className="eyebrow text-purple" {...edit(current, "place")}>
                {current.place}
              </p>
              <h3 className="mt-3 text-h3 text-charcoal" {...edit(current, "title")}>
                {current.title}
              </h3>
              <p className="mt-3 text-slate" {...edit(current, "body")}>
                {current.body}
              </p>
            </div>
          )}

          {/* The same places as a list: easier on small screens and for keyboard users. */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {pins.map((pin, index) => (
              <li key={index}>
                <button
                  type="button"
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                  className={cn(
                    "rounded-full border border-purple px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-out",
                    index === active ? "bg-purple text-white" : "text-purple hover:bg-lavender-light",
                  )}
                >
                  {pin.place}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
