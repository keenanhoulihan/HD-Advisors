# High Definition Advisors: Website

Marketing site for High Definition Advisors, a strategy consultancy founded by Kate Hibbs Davis ("Kate HD").
Stack: Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel from GitHub.

## The company (source of truth for copy)

- Helps mission-driven organizations move past fuzzy, uncertain phases of growth into real clarity.
- Superpower: sees across every part of an organization (programs, revenue, administration, external affairs) and turns it into one actionable roadmap.
- North star is sustainability: structural scaffolding for long-term stability, not quick wins.
- Kate's background: grassroots organizing campaigns to global institutions, across politics, advocacy, the arts, and international development.
- Promise: strategy is never cookie-cutter. It is a custom-built foundation to scale a mission with purpose and precision.
- NOT a real estate firm. Never describe it that way.

## Mottos and lines to weave through the site

Use these as headlines, section labels, pull quotes, and microcopy. Primary tagline appears on every page.

- **Clarity for Complex Growth** (primary tagline, always present)
- Four Lenses, One Roadmap
- From Reactive to Intentional
- Growing by design, not by opportunity
- Built for the long haul, not the quick win
- Never cookie-cutter
- Clear Strategy. Sustainable Impact. (secondary)
- Scaling Missions, Sustainably. (secondary)

## Design concept: the Resolution Line

Inspired by Jeanne Gang's Aqua Tower in Chicago. The rippling slab edges of the facade become thin parallel lines that ripple, calm, and converge into one crisp line. Complexity resolving into clarity.

**The whole site reads like the deck: complex at the top, clear at the bottom.**

| Where | Line treatment |
| --- | --- |
| Home hero | Full rippling stack (9 lines; 7 on mobile) bleeding off the left edge, passing through the HD monogram, resolving into one line on the right. Scroll-driven: pins and converges into one line (see below) |
| Section dividers | Calmer lines, only partly converged |
| Content headers | Just the resolved single line, used as a thin rule under every H2 |
| Footer | Fully resolved. One line runs through the HD monogram |

How the lines are built (important, avoid the "audio waveform" look):
- One master gesture curve, duplicated across the line family.
- Each line varies slightly in amplitude, horizontal lag, and small individual bulges, like Aqua Tower floor plates. NOT 9 independent random sine waves.
- Lines run unbroken from the left edge, through the letterforms, to the right.

Rules:
- Flat vector SVG only. No gradients, shadows, glows, or 3D.
- Thin, consistent stroke: about 2px at 1920px wide; use `vector-effect="non-scaling-stroke"`.
- Lines in Deep Purple. Aqua only as the single accent where noted. (No lavender-on-dark treatment: the site has no dark backgrounds.)
- Let it breathe. Never crowd text against the line stack.
- Motion: subtle and slow, never flashy. Fully respect `prefers-reduced-motion`.

### Scroll-driven hero (home)

- `src/components/ScrollHero.tsx`. The hero pins (CSS `position: sticky`, not JS pinning, so mobile scroll stays smooth) while the rippling paths gradually converge into one resolved line through the monogram, then the pin releases.
- framer-motion `useScroll({ target, offset: ["start start", "end end"] })` → light `useSpring` smoothing → `useTransform` to a 0..1 resolve value. Resolution sweeps right to left (`resolvePoints` in `src/lib/resolution-geometry.ts`).
- Pin length: 170svh tall on mobile, 210svh from `sm` up. Use `svh` units so mobile address bars don't cause jumps.
- `prefers-reduced-motion`: CSS (`motion-reduce:`) renders the static resolved state with no pin. No JS needed.
- Only the visible size (mobile or desktop) animates after hydration.
- All line math lives in `src/lib/resolution-geometry.ts`, shared by `<ResolutionLine>` (server) and `ScrollHero` (client).

## Color tokens

Define as CSS variables in `globals.css` and map into Tailwind theme.

**Background rule: backgrounds are always light and pastel.** Section and panel backgrounds may only be offwhite, lavender-tint, stone, aqua-light, or lavender-light. Never use purple, charcoal, or any dark color as a section, band, or panel background. Purple is for text, labels, lines, buttons, and the monogram only. Charcoal is for text only.

**Color blocking.** Alternate section backgrounds through offwhite, lavender-tint, stone, and aqua-light so every page has rhythm. Never put two identical backgrounds back to back (the footer is offwhite, so the last section is never offwhite; page headers are offwhite, so the first section after one is never offwhite). Use the `<Section bg="...">` component so each page's sequence is explicit, and check the full order whenever a section is added or moved. Cards and panels inside a section use a different light color from the section itself.

| Token | Hex | Use |
| --- | --- | --- |
| purple | #4B2E83 | Monogram, labels, rules, resolution line, buttons, text. Never a background |
| aqua | #4F8F7C | One accent per section max. Large text (24px+) and graphics only |
| lavender | #B8A9D6 | Form borders and subtle rules on tinted backgrounds |
| lavender-light | #E6E0F0 | Dividers, borders, occasional light background |
| aqua-light | #DCEBE5 | Highlight panels |
| charcoal | #2B2A2E | Body text, headlines. Never a background |
| slate | #5E5A63 | Secondary text, captions |
| offwhite | #FBF9F6 | Primary background |
| lavender-tint | #F1EDF6 | Section backgrounds |
| stone | #F3EFE8 | Quiet panels |

Balance: off-white 60%, charcoal 20%, purple 12%, aqua 5%, lavender 3%. Warm neutrals do most of the work.

## Typography

One family: Poppins via `next/font/google` (weights 400, 500, 600, 700). Hierarchy from weight and color, not extra typefaces.

| Role | Weight | Desktop size | Line height |
| --- | --- | --- | --- |
| Display / H1 | SemiBold 600 | clamp(2.5rem, 5vw, 5rem) | 1.1 |
| H2 | SemiBold 600 | clamp(2rem, 3.5vw, 3.5rem) | 1.15 |
| H3 / Subhead | SemiBold 600 | 1.5rem | 1.25 |
| Body | Regular 400 | 1.125rem | 1.5 |
| Label | Medium 500, ALL CAPS | 0.8rem | tracking 0.25em, purple |

Pattern for every section: purple tracked label above, charcoal H2, single resolution line rule below.

## Logo usage

- Files live in `public/brand/` (SVG preferred, PNG fallback).
- Approved colorways: Primary (on off-white) and Tint (on lavender tint). Reverse (on purple) and Dark (on charcoal) exist for other media but never appear on the site, because the site has no dark backgrounds.
- Logo only on flat color. Never on photos, gradients, or busy patterns.
- Wordmark: "High Definition" in Poppins Medium charcoal, "ADVISORS" tracked wide in purple. Never redraw or re-space.

## Site map

1. `/` Home
   - Hero: HD monogram + full resolution line, "Clarity for Complex Growth", one-sentence positioning, CTA "Start a conversation" to /contact
   - "What we heard" style strip: the problem (growth outpaced structure, revenue concentrated, roles blurred, story scattered)
   - From Reactive to Intentional: current state vs future state panels (stone vs aqua-light)
   - Four Lenses, One Roadmap teaser
   - Closing CTA band on lavender-tint (Tint colorway: purple monogram and lines). Light background, never purple
2. `/about` Background
   - Kate Hibbs Davis, Founder & Principal: bio, headshot placeholder
   - Selected experience: politics, advocacy, the arts, international development
   - Philosophy: never cookie-cutter, built for the long haul
3. `/approach` Scope of work
   - Four Lenses: Programs (what you deliver and for whom), Revenue (funding mix and paths to growth), Administration (people, systems, governance), External Affairs (partners, policy, reputation). Diagram: four cards whose lines converge into "One integrated plan" panel (aqua-light background, purple outline)
   - Phased roadmap: 01 Listen and Assess (months 1 to 3), 02 Align and Prioritize (4 to 6), 03 Build the Structure (7 to 12), 04 Launch and Sustain (year 2+). Line stack above each phase gets calmer left to right, phase 04 in aqua
   - Who we work with: mission-driven orgs, nonprofits, foundations
4. `/contact`
   - Form: name, email, organization, what's going on (textarea), optional budget/timeline select
   - Server Action + zod validation + honeypot field, sends via Resend to Kate's inbox
   - Success state: "Thanks. Clarity starts with a conversation."

Global: sticky minimal header (HD monogram left, nav right), footer with fully resolved line through monogram, tagline, contact placeholders.

## Technical conventions

- App Router, Server Components by default; `"use client"` only for animation and the form UI.
- Reusable `<ResolutionLine variant="full" | "partial" | "rule" | "monogram" />` component that generates SVG paths from parameters (line count, master curve, per-line lag/amplitude, convergence x).
- Content (bio, lenses, phases, mottos) in `src/content/*.ts` so copy edits never touch layout.
- Metadata per page via `generateMetadata`; OG image using the Primary colorway.
- Accessibility: semantic landmarks, visible focus states in purple, aqua never for small text, AA contrast.
- Responsive down to 360px. On mobile the line stack shortens but still resolves.
- Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`. Never commit `.env.local`.
- Placeholders stay bracketed: [email], [phone], [website], [headshot], [Organization].
- No em dashes in any site copy.
