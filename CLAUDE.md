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

## Kate's background (source of truth)

Use these facts only. Never invent numbers, clients, or results. Content lives in `src/content/about.ts`.

- Kate Hibbs Davis, Founder & Principal. Bilingual in English and Spanish. Education: William & Mary.
- Experience (most recent first, all past roles):
  - Director of External Affairs, Griffin Museum of Science and Industry, Chicago (2024 to 2026)
  - Major Gifts Officer, Smithsonian Tropical Research Institute, Washington DC, Panama, and Chicago (2017 to 2024). Led the integration of revenue generation, program development, and institution-building. Secured over $16 million in support across two capital campaigns and brought in hundreds of new donors for environmental and biodiversity science, much of it supporting the careers of emerging tropical scientists from tropical nations
  - Fulbright Specialist, Fundraising and NGO Organizational Management, Fulbright Colombia, Bogotá (2020 to 2023). Pro bono consulting for Corporación Manos Visibles: built a comprehensive fundraising strategy, designed a diversified revenue portfolio (individuals, major gifts, corporate, events, foundations), trained staff, and proposed a structural redesign of the organization
  - Director of Development Partnerships, League of Conservation Voters, Washington DC (2015 to 2017)
  - Regional Organizer, National Community Reinvestment Coalition, Washington DC (2014 to 2015)
  - Lead Organizer, IMPACT (Interfaith Movement Promoting Action by Congregations Together), Charlottesville, VA (2010 to 2014)
- Lens tags on the timeline: LCV, Revenue; STRI, Programs and Revenue; Fulbright Colombia, Revenue and Administration; Griffin Museum, External Affairs. The two organizing roles carry no tag.

**Not yet:** no case studies, testimonials, stats strip, or by-the-numbers section. This is a brand new company. Never use bracketed `[Organization]` placeholders for Kate's experience; use the real names above.

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

Mottos live in `src/content/mottos.ts`.

**Motto statements.** Between major sections, set a motto on its own with `<MottoStatement motto bg />`: `text-motto` (clamp(1.75rem, 3vw, 2.75rem), SemiBold 600, charcoal), centered, with a thin resolution line rule below. Amplified, not giant. Each page uses different mottos (assigned in `pageMottos`), and a motto never repeats elsewhere on the same page (headings and labels included). Current assignment: Home: Growing by design / Never cookie-cutter. About: Built for the long haul / Clear Strategy. Sustainable Impact. Approach: From Reactive to Intentional / Scaling Missions, Sustainably. Contact has none (single section).

## Design concept: the Resolution Line

Inspired by Jeanne Gang's Aqua Tower in Chicago. The rippling slab edges of the facade become thin parallel lines that ripple, calm, and converge into one crisp line. Complexity resolving into clarity.

**The whole site reads like the deck: complex at the top, clear at the bottom.**

| Where | Line treatment |
| --- | --- |
| Home hero | Full rippling stack (9 lines; 7 on mobile) bleeding off the left edge, passing through the HD monogram, resolving into one line on the right. Animates on load: converges into one line (see below) |
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

### Header

- Logo (`src/components/HeaderLogo.tsx`): a mini version of the full mark, the HD monogram with a 5-line stack (`HEADER_MARK` in `resolution-geometry.ts`) that converges just right of the D. Five lines and 1px non-scaling strokes keep it crisp at 28 to 40px tall; don't add lines.
- It ripples briefly on load (1.5s) and again on hover or focus (1.2s), then settles. The ripple strength is 0 at both ends, so it starts and ends on the resting mark with no jump. Reduced motion keeps the resting mark.
- Wordmark beside it from `md` up: "High Definition" in Poppins Medium charcoal, "ADVISORS" tracked wide in purple. Monogram mark only on mobile.
- `HeaderShell` is transparent at the top of the page; after scrolling it gets a soft offwhite background (85% opacity, slight blur, lavender-light rule) and the logo scales to 90%.

### Motion system

- All timing comes from `src/lib/motion.ts`: `EASE_OUT` (soft ease-out), durations 0.4 / 0.6 / 0.8s, 16px travel, `STAGGER` 80ms, `CARD_STAGGER` 120ms, and shared variants (`fadeUp`, `staggerChildren`, `drawLine`, `pageFade`). Never hard-code new timings; extend that file. Nothing bouncy or flashy: 400 to 800ms, ease-out, 12 to 24px.
- Scroll reveals: `RevealGroup` (triggers once on entering view, staggers children) and `RevealItem` (fades up) in `src/components/Reveal.tsx`. `SectionHeader`, `PageHeader`, and `MottoStatement` reveal label, heading, rule, and body in turn. Card grids and timeline entries use `CARD_STAGGER` so they ease in one after another.
- Heading rules (`DrawRule`) draw themselves left to right via `pathLength` (stroke-dashoffset).
- Route changes: `src/app/template.tsx` fades each new page in (400ms). The first page load is never hidden.
- Buttons share `buttonClass` (`ButtonLink.tsx`): 200ms color ease and a 2px lift on hover. Text links use the `link-underline` utility: color and underline ease in over 200ms.
- Reduced motion: no movement, content just appears. `globals.css` forces `[data-reveal]` to full opacity with no transform and `[data-draw]` to fully drawn, overriding framer-motion's inline styles. Mark any new animated element with one of those attributes.
- Never give grid cells a solid fill that matches the section: inside a blending section they show a hard edge. Use transparent cells with border rules.
- Testing tip: headless Chrome screenshots freeze these animations (virtual time stalls IntersectionObserver, real-time mode stalls animation frames), so verify reveals by scrolling with Playwright in real Chrome instead.

### Hero animation (home)

- `src/components/HeroResolve.tsx`. On page load the rippling lines calm and converge into one resolved line through the monogram on their own, no scrolling (`HERO` in `src/lib/motion.ts`: 0.3s delay, 3.4s linear clock, each line easing in-out with outer lines lagging up to 22% so they finish last; about 3.5s total). The headline, tagline, and CTA (RevealItems orchestrated by HeroResolve) fade in once the lines are mostly resolved (2.7s). Plays once per page load.
- Do not tie it to scroll or pin the hero: scroll-driven pinning felt like a glitch (the page seemed to stop). Scrolling must always feel normal.
- framer-motion `useMotionValue` + `animate` drive a 0..1 resolve value; `useTransform` rebuilds each path. Resolution sweeps right to left (`resolvePoints` in `src/lib/resolution-geometry.ts`).
- `prefers-reduced-motion`: CSS (`motion-reduce:`) renders the static resolved state and visible text instantly; the animation never starts.
- Only the visible size (mobile or desktop) animates after hydration.
- Full bleed: the hero lines and monogram span the full viewport width. The section is a direct full-width child of `main` (never inside `page-wrap`), the stacks run from x=0 to the viewBox's full width, and the section clips horizontal overflow. Use `w-full`, not `100vw` (100vw includes the scrollbar and causes horizontal scroll on Windows). Text below stays in `page-wrap`. Verified with no horizontal overflow at 360, 768, 1440, and 1920px.
- All line math lives in `src/lib/resolution-geometry.ts`, shared by `<ResolutionLine>` (server) and `HeroResolve` (client).
## Color tokens

Define as CSS variables in `globals.css` and map into Tailwind theme.

**Background rule: backgrounds are always light and pastel.** Section and panel backgrounds may only be offwhite, lavender-tint, stone, aqua-light, or lavender-light. Never use purple, charcoal, or any dark color as a section, band, or panel background. Purple is for text, labels, lines, buttons, and the monogram only. Charcoal is for text only.

**Color blocking.** Alternate section backgrounds through offwhite, lavender-tint, stone, and aqua-light so every page has rhythm. Never put two identical backgrounds back to back (the footer is offwhite, so the last section is never offwhite; page headers are offwhite, so the first section after one is never offwhite). Use the `<Section bg="...">` component so each page's sequence is explicit, and check the full order whenever a section is added or moved. Cards and panels inside a section use a different light color from the section itself.

Soft gradient blends are allowed only between section backgrounds. The logo, monogram, and resolution lines stay flat, no gradients.

**Section blends.** Neighboring sections melt into each other instead of meeting at a hard edge. Every full-width band (`<Section>`, `PageHeader`, `HeroResolve`, `MottoStatement`, `CtaBand`) takes `blendTo`, the next band's background: its bottom `min(11rem, 45%)` fades from its own color to that color with a plain `linear-gradient`, so the next band starts on its own flat color with no seam. Set `blendTo` on every band and update it whenever the order changes. `CtaBand` always blends into the offwhite footer, and the footer has no top border. Only pastel tokens blend (offwhite, lavender-tint, lavender-light, stone, aqua-light). Keep it subtle: light shifting across a wall, never a rainbow. AA holds across every blend for charcoal, slate, and purple text; aqua large text passes on all blends in use but not on lavender-light, so never set aqua text on lavender-light.

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
- Wordmark: "High Definition" in Poppins Medium charcoal, "ADVISORS" tracked wide in purple. Never redraw or re-space. The header sets it as live text to match the logo.

## Photography

- Kate's headshot: `public/images/kate-headshot.png`, a transparent cutout (background removed with rembg `isnet-general-use` + alpha matting from an 800x800 original on bright yellow). Render it with `<KateHeadshot size="large" | "small" />`, which uses `next/image` with the alt text "Kate Hibbs Davis, Founder and Principal of High Definition Advisors".
- Always place the cutout on a lavender-tint background. On /about as a circle (160px on mobile, 220px from md) with lavender tint inside and a 1.5px purple ring, vertically centered beside her title and name, bio below. Not sticky, small and circular in the home "Who we are" intro.
- No blur placeholder on transparent images (it shows through the transparent areas).
- A higher-resolution original would sharpen the large version on retina screens.

## Site map

1. `/` Home
   - Hero (animates on load, see above): HD monogram + full resolution line, "Clarity for Complex Growth", one-sentence positioning, CTA "Start a conversation" to /contact
   - "What we hear" strip: the problem (growth outpaced structure, revenue concentrated, roles blurred, story scattered)
   - Motto statement
   - From Reactive to Intentional: current state vs future state panels (offwhite vs aqua-light, on a stone section)
   - "Who we are" founder intro: small circular headshot, short intro, link to /about
   - Four Lenses, One Roadmap teaser
   - Motto statement
   - Closing CTA band on lavender-tint (Tint colorway: purple monogram and lines). Light background, never purple
2. `/about` Background
   - Kate Hibbs Davis, Founder & Principal: headshot on lavender tint, bio (deck bio as the base plus a few concrete proof points from "Kate's background"), languages and education
   - Motto statement
   - Experience timeline styled like the phased roadmap: six roles, earliest (organizing roots) to most recent, line stacks calming left to right, most recent in aqua. Each entry: role, organization, years, one short line
   - Each timeline card is tagged with the lenses that role put to work (together they span all four). This replaces a separate lens section, which repeated the Approach page
   - "Where she's worked": organization names set large as text in a ruled grid, inside the same lavender-tint section as the timeline so they read as one continuous area. Cells are transparent (inner rules only) and the section has extra bottom padding so the blend starts below the grid. No logos: they need each organization's permission and would read as HD Advisors clients
   - Motto statement
   - Philosophy ("How Kate works"): never cookie-cutter, structure that lasts
3. `/approach` Scope of work
   - Four Lenses: Programs (what you deliver and for whom), Revenue (funding mix and paths to growth), Administration (people, systems, governance), External Affairs (partners, policy, reputation). Diagram: four cards whose lines converge into "One integrated plan" panel (aqua-light background, purple outline)
   - Interactive lenses (`src/components/LensDiagram.tsx`): each card has an original thin-line illustration (`LensIllustrations.tsx`) showing the lens in action: Programs, people around a table working; Revenue, one hand passing a coin to another; Administration, blocks assembling into an org structure; External Affairs, a figure speaking to a small group. Illustration rules: flat, no fills or shading, one 1.5px non-scaling stroke matching the resolution line, purple with at most one aqua accent, each on a resolved baseline so they read as one line family. Hover (mouse pointer only), tap, or keyboard focus on a card highlights its line flowing into the plan panel (others dim to lavender-light, dots flow along the active line unless reduced motion) and reveals the lens detail. The trigger is a real `<button>` with `aria-expanded`; the panel announces the active lens via `aria-live`.
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
- Placeholders stay bracketed: [email], [phone], [website]. (The headshot and Kate's organizations are real now.)
- No em dashes in any site copy.
