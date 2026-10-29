# High Definition Advisors: Website

Marketing site for High Definition Advisors, a strategy consultancy founded by Kate Hibbs Davis ("Kate HD").
Stack: Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel from GitHub. Copy is edited by Kate in TinaCMS (see "Content editing").

## The company (source of truth for copy)

- Helps mission-driven organizations move past fuzzy, uncertain phases of growth into real clarity.
- Superpower: sees across every part of an organization (programs, revenue, administration, external affairs) and turns it into one actionable roadmap.
- North star is sustainability: structural scaffolding for long-term stability, not quick wins.
- Kate's background: grassroots organizing campaigns to global institutions, across politics, advocacy, the arts, and international development.
- Promise: strategy is never cookie-cutter. It is a custom-built foundation to scale a mission with purpose and precision.
- NOT a real estate firm. Never describe it that way.

## Kate's background (source of truth)

Use these facts only. Never invent numbers, clients, or results. Content lives in `content/pages/about.json` (typed by `src/content/about.ts`). Kate's own draft bio (Oct 2026) is the base for the /about bio.

- Kate Hibbs Davis, Founder & Principal. More than 15 years in organizational growth, philanthropic strategy, and external relations across cultural, scientific, and civic institutions. Issues: climate resilience, access to STE(A)M education, democracy, fair banking, affordable housing, human rights. Fluent in Spanish; works in English and Spanish.
- Education: Bachelor of Arts degrees in Immigration Studies and Hispanic Studies, The College of William & Mary (Williamsburg, VA), magna cum laude and Phi Beta Kappa.
- Lives in her hometown of Chicago with her spouse, their two daughters, and their 90-pound doodle, Timber.
- Experience (most recent first, all past roles):
  - Director of External Affairs for Major and Planned Gifts, Griffin Museum of Science and Industry, Chicago (2024 to 2026). Always use this full title, in past tense: she has left the role. Led a high-volume frontline development team, oversaw principal donor strategy for executive leadership, and grew national brand engagement
  - Major Gifts Officer, Smithsonian Tropical Research Institute, Washington DC, Panama, and Chicago (2017 to 2024). Led the integration of revenue generation, program development, and institution-building. Secured over $16 million in support across two capital campaigns and brought in hundreds of new donors for environmental and biodiversity science, much of it supporting the careers of emerging tropical scientists from tropical nations
  - Fulbright Specialist, Fundraising and NGO Organizational Management, Fulbright Colombia, Bogotá (2020 to 2023). Pro bono consulting for Corporación Manos Visibles: built a comprehensive fundraising strategy, designed a diversified revenue portfolio (individuals, major gifts, corporate, events, foundations), trained staff, and proposed a structural redesign of the organization
  - Director of Development Partnerships, League of Conservation Voters, Washington DC (2015 to 2017)
  - Regional Organizer, National Community Reinvestment Coalition, Washington DC (2014 to 2015)
  - Lead Organizer, IMPACT (Interfaith Movement Promoting Action by Congregations Together), Charlottesville, VA (2010 to 2014)
- Board and civic leadership (dates not yet known: `[Years]` placeholders in Tina):
  - Co-Chair, Capital Campaign Committee, All Saints Episcopal Church, Chicago (current): steering a $2.5M capital campaign
  - Board President and Fundraising Chair, Capitol Hill Chorale, Washington DC
  - The Fulbright work above also delivered bilingual major gifts training
- Lens tags on the timeline: LCV, Revenue; Capitol Hill Chorale, Revenue and Administration; STRI, Programs and Revenue; Fulbright Colombia, Revenue and Administration; Griffin Museum, External Affairs; All Saints, Revenue. The two organizing roles carry no tag.
- Places (map pins on /about): Chicago, Washington DC, Charlottesville VA, Williamsburg VA (William & Mary), Panama (STRI), and Bogotá (Fulbright). No region pin: the Latin America ring was removed (Oct 2026).

**Not yet:** no case studies, stats strip, or by-the-numbers section. This is a brand new company. /endorsements has the structure for endorsements and client logos but ships empty with a "coming soon" state: never add sample, invented, or placeholder endorsements or clients. Never use bracketed `[Organization]` placeholders for Kate's experience; use the real names above.

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

Motto text lives in `content/settings/mottos.json` (editable in Tina); `pageMottos` in `src/content/mottos.ts` assigns them to pages.

**Motto statements.** Between major sections, set a motto on its own with `<MottoStatement motto bg />`: `text-motto` (clamp(1.75rem, 3vw, 2.75rem), SemiBold 600, charcoal), centered, with a thin resolution line rule below. Amplified, not giant. Each page uses different mottos (assigned in `pageMottos`), and a motto never repeats elsewhere on the same page (headings and labels included). Current assignment: Home: Growing by design / Never cookie-cutter. About: Built for the long haul / Clear Strategy. Sustainable Impact. Approach: From Reactive to Intentional / Scaling Missions, Sustainably. Offerings: Growing by design (one statement, between Available now and Coming soon; it repeats a Home motto, which is fine across pages). Contact and Endorsements have none.

## Design concept: the Resolution Line

Inspired by Jeanne Gang's Aqua Tower in Chicago. The rippling slab edges of the facade become thin parallel lines that ripple, calm, and converge into one crisp line. Complexity resolving into clarity.

**The whole site reads like the deck: complex at the top, clear at the bottom.**

| Where | Line treatment |
| --- | --- |
| Home hero | The full logo, lines lengthened, centered on the HD. On load the right lines converge into one point and a single line draws out (see below) |
| Section dividers | Calmer lines, only partly converged |
| Content headers | Just the resolved single line, used as a thin rule under every H2 |
| Footer | The horizontal logo, centered (its short resolved line sits between mark and wordmark) |

How the lines are built (important, avoid the "audio waveform" look):
- One master gesture curve, duplicated across the line family.
- Each line varies slightly in amplitude, horizontal lag, and small individual bulges, like Aqua Tower floor plates. NOT 9 independent random sine waves.

Rules:
- Flat vector SVG only. No gradients, shadows, glows, or 3D.
- Thin, consistent stroke with `vector-effect="non-scaling-stroke"`. Rippling stacks (`strokeWidth` in `src/lib/resolution-geometry.ts`): 1px for section dividers, 0.75px for the compact card stacks (thinned by 0.5px in Oct 2026). The single resolved rule under headings stays 1.5px.
- Lines in Deep Purple. Aqua only as the single accent where noted. (No lavender-on-dark treatment: the site has no dark backgrounds.)
- Let it breathe. Never crowd text against the line stack.
- Motion: subtle and slow, never flashy. Fully respect `prefers-reduced-motion`.

### Header

- The header logo is static and clean (`src/components/HeaderLogo.tsx`): the horizontal logo (`HorizontalLogo`, inline SVG in currentColor, purple) from `md` up, sized to fit the header without making it taller; below `md` just the HD mark (`Monogram`, 24px on phones, 28px from sm) beside the Menu button.
- Nav (`NavLinks.tsx`, items from `navItems` in `src/components/SiteLive.tsx`, link names from Site Settings): About, Approach, Offerings, Endorsements (only when `showEndorsements` is on), Contact. Inline from `md`; below `md` a "Menu" button (`aria-expanded`, closes on Escape and on navigation) opens the same links in a panel under the header.
- No line stack and no animation in the header. A converging stack at header size read as a broom, and the motion felt busy. Clean and fluid is the priority here.
- `HeaderShell` is transparent at the top of the page; after scrolling it gets a soft offwhite background (85% opacity, slight blur, lavender-light rule) and the logo scales to 90%.
- The earlier animated lockups and the /lab monogram explorations are in git history (commit 81757fe and earlier, 9d19989, 1a5bdff).

### Motion system

- All timing comes from `src/lib/motion.ts`: `EASE_OUT` (soft ease-out), durations 0.4 / 0.6 / 0.8s, 16px travel, `STAGGER` 80ms, `CARD_STAGGER` 120ms, and shared variants (`fadeUp`, `staggerChildren`, `drawLine`, `pageFade`). Never hard-code new timings; extend that file. Nothing bouncy or flashy: 400 to 800ms, ease-out, 12 to 24px.
- Scroll reveals: `RevealGroup` (triggers once on entering view, staggers children) and `RevealItem` (fades up) in `src/components/Reveal.tsx`. `SectionHeader`, `PageHeader`, and `MottoStatement` reveal label, heading, rule, and body in turn. Card grids and timeline entries use `CARD_STAGGER` so they ease in one after another.
- Heading rules (`DrawRule`) draw themselves left to right via `pathLength` (stroke-dashoffset).
- Route changes: `src/app/template.tsx` fades each new page in (400ms). The first page load is never hidden.
- Buttons share `buttonClass` (`ButtonLink.tsx`): 200ms color ease and a 2px lift on hover. Text links use the `link-underline` utility: color and underline ease in over 200ms.
- Reduced motion: no movement, content just appears. `globals.css` forces `[data-reveal]` to full opacity with no transform and `[data-draw]` to fully drawn, overriding framer-motion's inline styles. Mark any new animated element with one of those attributes.
- Never give grid cells a solid fill that matches the section: inside a blending section they show a hard edge. Use transparent cells with border rules.
- Testing tip: headless Chrome screenshots freeze these animations (virtual time stalls IntersectionObserver, real-time mode stalls animation frames), so verify reveals by scrolling with Playwright in real Chrome instead.

### Home hero

- `src/components/HomeHero.tsx` + `HeroLogo.tsx` (client) + `HeroLogoArt.tsx` (server). The full logo, lines running edge to edge at every width (checked 375 to 2560px). The logo box (`HERO_LOGO.box`, displayed at `maxWidthRem` ~43rem, or the screen width on phones) keeps the HD and wordmark the same size as the original logo at 36rem, centered on the screen. The drawing is `HERO_LOGO.bleed` (4.5) boxes wide around it, absolutely positioned, and the full-width hero band clips it (`overflow-x-clip`, no horizontal scroll). Never scale the drawing to fill the width: that would distort the HD and ripples.
- Left lines: the logo's own data near the H (stretched 30% out from the H), continued off-screen in code (`leftLinePath` in HeroLogoArt) with each line's fitted ripple (`LEFT_FIT`: two shared wavelengths, per-line amplitudes, max error 0.42), blended in over 80 units, so the pattern repeats naturally to the left edge of the drawing. Right: the converging lines as before, then one straight line to the right edge of the drawing.
- Geometry: `src/lib/hero-logo.ts` (shared, small) and `src/lib/hero-logo-art.ts` (server only: clip outlines, wordmark, left lines; generated from `public/brand/hd-full-logo.svg`). The clip outlines keep the small gap before the H and after the D. All 22 right lines follow one fitted convergence profile (`convergence(u)`, zero slope at both ends) and stop exactly at `RIGHT.point`; ONE straight line carries on to `RIGHT.end`, outside the clip. Never let the converging lines continue past the point: stacked strokes look thick and jagged.
- Motion (`HERO` in `src/lib/motion.ts`, same as the original line hero): after 0.225s, a 2.55s linear clock; each right line eases in-out with outer lines lagging up to 22%, and convergence sweeps from the point back toward the D. The straight line draws out of the point to the right edge of the screen (its end is measured on mount, so it draws over the visible distance; pathLength, `LINE_DRAW_EASE`, 0.8s) from 1.7s as the lines finish arriving; the text fades in at 2.025s. When both finish, `data-hero-done` hands over to the static copy, so the last frame is exactly the static logo.
- Static vs animated: the server renders a finished copy (`hero-static`) and the animated lines in their start state (`hero-anim`). An inline script in the layout's `<head>` adds `js` to `<html>` before first paint; `globals.css` shows `hero-anim` only with `js` and no reduced-motion preference. So the server render without JS, no-JS visitors, and `prefers-reduced-motion` all see the finished logo, and nothing flashes on hydration.
- Do not tie it to scroll or pin the hero: scroll-driven pinning felt like a glitch. Scrolling must always feel normal.
- Verify changes by recording frames in real Chrome (CDP screencast) and zooming on the convergence point; compare the final frame with the reduced-motion and no-JS renders.

## Color tokens

Define as CSS variables in `globals.css` and map into Tailwind theme.

**Background rule: backgrounds are always light and pastel.** Section and panel backgrounds may only be offwhite, lavender-tint, stone, aqua-light, or lavender-light. Never use purple, charcoal, or any dark color as a section, band, or panel background. Purple is for text, labels, lines, buttons, and the monogram only. Charcoal is for text only.

**Color blocking.** Alternate section backgrounds through offwhite, lavender-tint, stone, and aqua-light so every page has rhythm. Never put two identical backgrounds back to back (the footer is offwhite, so the last section is never offwhite; page headers are offwhite, so the first section after one is never offwhite). Use the `<Section bg="...">` component so each page's sequence is explicit, and check the full order whenever a section is added or moved. Cards and panels inside a section use a different light color from the section itself.

Soft gradient blends are allowed only between section backgrounds. The logos and resolution lines stay flat, no gradients.

**Section blends.** Neighboring sections melt into each other instead of meeting at a hard edge. Every full-width band (`<Section>`, `PageHeader`, `HomeHero`, `MottoStatement`, `CtaBand`) takes `blendTo`, the next band's background: its bottom `min(11rem, 45%)` fades from its own color to that color with a plain `linear-gradient`, so the next band starts on its own flat color with no seam. Set `blendTo` on every band and update it whenever the order changes. `CtaBand` always blends into the offwhite footer, and the footer has no top border. Only pastel tokens blend (offwhite, lavender-tint, lavender-light, stone, aqua-light). Keep it subtle: light shifting across a wall, never a rainbow. AA holds across every blend for charcoal, slate, and purple text; aqua large text passes on all blends in use but not on lavender-light, so never set aqua text on lavender-light.

| Token | Hex | Use |
| --- | --- | --- |
| purple | #4B2E83 | Logos, labels, rules, resolution line, buttons, text. Never a background |
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

- Files live in `public/brand/`, all single-color purple #4B2E83 with text already outlined:
  - `hd-full-logo.svg`: full logo (the HD mark with the hidden K, rippling lines resolving through it, "High Definition / ADVISORS").
  - `hd-horizontal-logo.svg`: horizontal logo (HD mark, short line, "High Definition / ADVISORS").
  - `hd-mark.svg`: the HD mark on its own.
  - `hd-badge.svg`: rounded purple square with the HD cut out, for favicon and app icon.
- Which goes where: header = horizontal (mark only below `md`); home hero = full (rebuilt inline with lengthened, animated lines, see "Home hero"); footer = horizontal; small spots and icons = mark (`Monogram`, e.g. the CTA band) or badge (`src/app/icon.svg`, `src/app/apple-icon.png` 180x180). The social image `src/app/opengraph-image.png` (1200x630) is the full logo over "Clarity for Complex Growth" in Poppins Medium charcoal on offwhite; its alt text is `opengraph-image.alt.txt`.
- On the site, logos are always single-color purple. `Monogram` and `HorizontalLogo` draw the outlines inline in currentColor from `src/lib/logo-paths.ts` (copied from the SVG files; update both together). The full logo file is the source for the hero geometry and the social image.
- Logo only on flat, light color. Never on photos, gradients, or busy patterns. Never redraw, recolor in parts, or re-space the wordmark.

## Photography

- Kate's photos are Tina image fields labeled "Replace with new photo" (Home "Who we are" and About). Kate is sending new photos; both currently point at the existing cutout. `KateHeadshot` takes `src` and `alt` from content.
- Home "Who we are" uses Kate's new portrait, `public/images/kate_1.webp` (960x1200 WebP from `kate_1.png`, which is the unused original), in a 4:5 frame with a 1.5px purple border (`<KateHeadshot size="portrait" position="center 30%">`): 240x300 beside the text from md, full content width (up to 24rem) stacked above it on phones. The photo is itself 4:5, so nothing is cropped. It is a full photo, not a cutout.
- Kate's cutout headshot (still on /about): `public/images/kate-headshot.png`, a transparent cutout (background removed with rembg `isnet-general-use` + alpha matting from an 800x800 original on bright yellow). Render it with `<KateHeadshot size="large" | "small" src alt />`, which uses `next/image`; the alt text in content is "Kate Hibbs Davis, Founder and Principal of High Definition Advisors".
- Always place the cutout on a lavender-tint background. On /about as a circle (160px on mobile, 220px from md) with lavender tint inside and a 1.5px purple ring, vertically centered beside her title and name, bio below.
- No blur placeholder on transparent images (it shows through the transparent areas).
- A higher-resolution original would sharpen the large version on retina screens.

## Site map

1. `/` Home (backgrounds: hero offwhite, lavender-tint, stone, motto offwhite, stone, aqua-light, motto offwhite, CTA lavender-tint)
   - Hero (fades in on load, see above): the full logo, "Clarity for Complex Growth", one-sentence positioning, CTA "Start a conversation" to /contact
   - "Who we are" right after the hero, on lavender-tint: small circular headshot, Kate's first-person intro ("I am Kate Hibbs Davis, or Kate HD..."), a "Why HD?" callout tying her initials to seeing an organization in high definition (marked as a draft in Tina until Kate approves it), and a "Read Kate's full bio" link to /about
   - "What we hear" strip: the problem (growth outpaced structure, revenue concentrated, roles blurred, story scattered)
   - Motto statement
   - From Reactive to Intentional: current state vs future state panels (offwhite vs aqua-light, on a stone section)
   - Four Lenses, One Roadmap teaser
   - Motto statement
   - Closing CTA band on lavender-tint (purple HD mark and lines). Light background, never purple
2. `/about` About Kate (backgrounds: header offwhite, stone, aqua-light, motto offwhite, lavender-tint, motto offwhite, stone, CTA lavender-tint)
   - Kate Hibbs Davis, Founder & Principal: headshot on lavender tint, the full bio (Kate's draft, lightly tightened), quick facts (languages, education, home)
   - Core competencies in three columns: Strategic Leadership & Governance; Advancement & Revenue Generation; Stakeholder Engagement & Alliances
   - Motto statement
   - Interactive bio (`ResumeTabs.tsx`), real WAI-ARIA tabs (arrow keys, Home, End; inactive panels stay in the DOM, hidden):
     - Who I Am: short first-person intro and three values (draft in Tina for Kate to rewrite)
     - Where I've Been (`ResumeMap.tsx`): flat SVG map of the Americas (land in lavender-light, no stroke), pins placed from latitude and longitude in Tina. The outline is one static path generated by `npm run build:map` (`scripts/build-map-geometry.mjs`, Natural Earth via world-atlas, plain equirectangular so pins use the same linear math) into `src/lib/map-geometry.ts`; no map library ships. DC, Charlottesville, and Williamsburg would overlap, so pins inside the Mid-Atlantic bounds render in a zoomed inset in the open Atlantic, joined by a thin purple frame and leader line. Pins are real `<button>`s laid over the SVG (`aria-pressed`), the card announces via `aria-live`, and a row of place chips repeats the pins for small screens. A pin marked as a region would show as a ring (none in use)
     - What I've Done (`ResumeTimeline.tsx`): vertical timeline, earliest first, roles plus board and civic work. Each entry is a `<button aria-expanded>` that opens its detail (location, description, "Board and civic" tag, lens tags) with a compact line stack that calms entry by entry; the most recent entry (open by default) is the aqua accent
   - "Where she's worked": organization names set large as text in a ruled grid, inside the same lavender-tint section as the tabs so they read as one continuous area. Cells are transparent (inner rules only) and the section has extra bottom padding so the blend starts below the grid. No logos: they need each organization's permission and would read as HD Advisors clients
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
5. `/offerings` Consulting Offerings (backgrounds: header offwhite, lavender-tint, motto offwhite, stone, CTA lavender-tint)
   - Header "Consulting Offerings | Fall 2026": the season is a Tina field (`PageHeader titleAside`; on phones it drops to its own line without the divider)
   - Each offering has a title, a description, and an "Available now" toggle. Available now: numbered offwhite cards with calming line stacks. Coming soon: outlined cards, body optional. Ends with the CtaBand ("Start a conversation")
   - Available now: Your Roadmap to Sustainability and Scale; Coaching Fundraisers to Reach New Heights + Building a Culture of Philanthropy; Your Right Hand While in Transition: Interim and Fractional Leadership; The CEO Whisperer: Finding Your Leader's Fundraising Voice and Style for Maximum Impact. Coming soon: Your Impact, Your Way: Philanthropic Advisory; In the Room(s) Where It Happens: Revenue Meets Brand Engagement
6. `/endorsements` Endorsements + Clients
   - Endorsement cards (quote, name, title, organization, optional photo) and a ruled client logo grid, each rendered only when Tina has entries. With neither, a "coming soon" band with an unresolved line stack
   - Hidden by default: `showEndorsements` (Site Settings, "Show the Endorsements page in the menu") is off, which removes it from the header and footer nav and sets `noindex`. The route still builds so Kate can preview it

Global: sticky minimal header (horizontal logo left, or the HD mark on phones; nav right, Menu button on phones), footer with the horizontal logo, tagline, and contact links.

## Technical conventions

- App Router. Each `page.tsx` is a thin server file (metadata + JSON import) that renders a client view in `src/views/*View.tsx`, so Tina can preview edits live (see "Content editing"). Other components stay Server Components unless they animate or need state.
- Reusable `<ResolutionLine variant="partial" | "rule" />` component that generates SVG paths from parameters (line count, master curve, per-line lag/amplitude, convergence x).
- Content in `content/**/*.json` (edited in TinaCMS), imported by thin typed modules in `src/content/*.ts`, so copy edits never touch layout. Multi-paragraph fields are textareas split on blank lines (`toParagraphs` in `src/lib/text.ts`).
- Metadata per page via `generateMetadata`; OG image using the Primary colorway.
- Accessibility: semantic landmarks, visible focus states in purple, aqua never for small text, AA contrast.
- Responsive down to 360px. On mobile the line stack shortens but still resolves.
- Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`. Never commit `.env.local`.
- Contact details are real (Site Settings): kate@katehd.com, 773.405.0207, https://www.katehd.com/. `ContactLinks` renders them as mailto, tel (+1), and website links in the footer and on /contact; a value still in [brackets] shows as plain text.
- No em dashes in any site copy.

## Content editing (TinaCMS)

- Schema: `tina/config.ts`. Kate edits at `/admin`; each save commits JSON to GitHub and Vercel rebuilds. Pages import the JSON at build time, so visitors never depend on Tina.
- Visual editing with click-to-edit. Each view calls `useLive(liveQueries.<page>, data, "pages/<file>")` (`src/lib/tina-live.ts`, wrapping Tina's `useTina`); outside the editor it returns the JSON unchanged. The third argument makes the sidebar open on that page's form. Site Settings and Mottos (header, footer, hero sentence, mottos, CTA band) load once in the layout through `<SiteLive>` (`src/components/SiteLive.tsx`); components read them with `useSite()`.
- Every element that shows a field spreads `{...edit(object, "field")}` (or `edit(object, "list", index)` for a string in a list), which adds Tina's `data-tina-field` so Kate can click it on the page. `SectionHeader` and `PageHeader` take `source` (plus `fields` or `labelEdit` when names differ). Use the list index as the React key and wrap lists in `list()` so typing or adding an item never remounts or crashes. Any new copy goes in content JSON + schema + view, never hard-coded.
- Queries use Tina's generated fragments (`tina/__generated__/types.ts`), so `tinacms build` must run before `next build` (the build script does this, with `--local` when there is no `TINA_TOKEN`).
- Collections, all with plain-English labels: Home Page, About Kate, Consulting Offerings, Endorsements Page, Endorsements (one file per entry, `content/endorsements/`), Clients (`content/clients/`), Approach Page, Contact Page, Site Settings (company copy, contact placeholders, CTA band, menu link names, footer headings, `showEndorsements`), Mottos. Page collections are single fixed files (no create or delete), each with a `router` to its page; Site Settings and Mottos open on the home page.
- Endorsements and Clients are read from their folders at build time (`src/content/endorsements.ts`, module-scope `readFileSync`, allowed in prerender) and sorted by an `order` field. They edit as forms (no `router`): only the Endorsements Page document previews live.
- Placeholders Kate fills are bracketed in content (`[Kate to finish this sentence]`, `[Kate to write this description.]`, `[Years]`). Drafts written for Kate carry an "This is a draft" toggle (Home "Why HD?" callout, About "Who I Am"); it is a note for Kate and does not hide anything.
- Uploads go to `public/uploads/`. `next.config.ts` allows `assets.tina.io` images, which Tina serves while Kate previews an upload. Generated `public/admin/` and `tina/__generated__/` are gitignored; commit `tina/tina-lock.json`.
- Scripts: `npm run dev` runs Tina's local editor with `next dev` (`dev:site` for Next alone). `npm run build` runs `tinacms build` (Tina Cloud when `TINA_TOKEN` is set, otherwise `--local`), then `next build`. Tina Cloud is connected in Vercel (Production and Preview); every branch must push an up-to-date `tina/tina-lock.json` or the build fails its schema check, so regenerate it (`tinacms build --local --skip-cloud-checks`) after any schema change.
- Kate's how-to guide: `docs/editing-guide.md`. Update it whenever a collection or label changes.
- History: a first live-preview editor for four pages (Oct 19 2026, commit 78556ca) was replaced by a form-only setup for all six pages, then by this visual setup (Oct 28 2026), after the editor showed an empty sidebar because pages had a `router` but never called `useTina`.
- Env vars (Vercel): `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` from the Tina Cloud project linked to the GitHub repo.
