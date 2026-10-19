import { defineConfig, type TinaField } from "tinacms";

/*
 * Kate's editor (CLAUDE.md "Editing with Tina"). Only words, lists, and the
 * headshot are editable. Layout, colors, fonts, line art, and section order
 * live in code and are locked. Each page is one document: Kate can edit it,
 * not create or delete pages.
 */

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

/* Field helpers keep the schema readable. */
const text = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  required: true,
});
const paragraph = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  required: true,
  ui: { component: "textarea" },
});
const group = (name: string, label: string, fields: TinaField[], description?: string): TinaField => ({
  type: "object",
  name,
  label,
  description,
  fields,
});
/** A repeatable list of cards. `title` names the field shown in the list. */
const cards = (name: string, label: string, title: string, fields: TinaField[], description?: string): TinaField => ({
  type: "object",
  name,
  label,
  description,
  list: true,
  ui: { itemProps: (item: Record<string, string>) => ({ label: item?.[title] || "New item" }) },
  fields,
});
const lines = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  list: true,
});
/** Small purple label, big headline, optional intro: the pattern on every section. */
const sectionIntro = (name: string, label: string, opts: { intro?: boolean; noLabel?: boolean } = {}) =>
  group(name, label, [
    ...(opts.noLabel ? [] : [text("label", "Small label (purple caps above the headline)")]),
    text("title", "Headline"),
    ...(opts.intro ? [paragraph("intro", "Intro text")] : []),
  ]);
const mottos = lines(
  "mottos",
  "Motto statements",
  "The two large statements between sections, in order. Use a different motto on each page.",
);

const singlePage = { allowedActions: { create: false, delete: false } } as const;

export const LENSES = ["Programs", "Revenue", "Administration", "External Affairs"];

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "images", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home page",
        path: "content",
        format: "json",
        match: { include: "home" },
        ui: { ...singlePage, router: () => "/" },
        fields: [
          group("challengesIntro", "What we hear: intro", [
            text("label", "Small label"),
            text("title", "Headline"),
            paragraph("intro", "Intro text"),
          ]),
          cards("challenges", "What we hear: the four problems", "title", [
            text("title", "Title"),
            paragraph("body", "Text"),
          ]),
          group("shift", "Reactive vs Intentional", [
            text("title", "Headline"),
            group("reactive", "Left panel (today)", [
              text("label", "Small label"),
              text("title", "Title"),
              lines("points", "Points"),
            ]),
            group("intentional", "Right panel (with a roadmap)", [
              text("label", "Small label"),
              text("title", "Title"),
              lines("points", "Points"),
            ]),
          ]),
          group("founderIntro", "Who we are", [
            text("label", "Small label"),
            text("title", "Headline"),
            paragraph("body", "Text"),
            text("link", "Link text (goes to the About page)"),
          ]),
          group("lensesTeaser", "Four lenses teaser", [
            text("title", "Headline"),
            text("link", "Link text (goes to the Approach page)"),
          ]),
          mottos,
        ],
      },
      {
        name: "about",
        label: "About page",
        path: "content",
        format: "json",
        match: { include: "about" },
        ui: { ...singlePage, router: () => "/about" },
        fields: [
          sectionIntro("aboutIntro", "Page intro", { intro: true }),
          group("founder", "Kate", [
            text("name", "Name"),
            text("role", "Title"),
            {
              type: "image",
              name: "headshot",
              label: "Headshot",
              description: "Shown in a circle on a light lavender background. A square photo works best.",
            },
            text("headshotAlt", "Headshot description", "Read aloud by screen readers. Describe who is in the photo."),
            {
              type: "string",
              name: "bio",
              label: "Bio paragraphs",
              list: true,
              ui: { component: "textarea" },
            },
            cards("facts", "Quick facts", "label", [text("label", "Label"), text("value", "Value")]),
          ]),
          sectionIntro("careerIntro", "Experience: intro", { intro: true }),
          cards(
            "career",
            "Experience timeline",
            "organization",
            [
              text("role", "Role"),
              text("organization", "Organization"),
              text("location", "Location"),
              text("years", "Years", 'Write it like "2017 to 2024".'),
              paragraph("line", "One-line summary"),
              {
                type: "string",
                name: "lenses",
                label: "Lenses this role used",
                list: true,
                options: LENSES,
              },
            ],
            "Earliest role first. The most recent role is last and shows in aqua.",
          ),
          group("workedAt", "Where she's worked", [text("label", "Small label"), lines("organizations", "Organizations")]),
          sectionIntro("philosophyIntro", "How Kate works: intro"),
          cards("philosophy", "How Kate works", "title", [text("title", "Title"), paragraph("body", "Text")]),
          mottos,
        ],
      },
      {
        name: "approach",
        label: "Approach page",
        path: "content",
        format: "json",
        match: { include: "approach" },
        ui: { ...singlePage, router: () => "/approach" },
        fields: [
          sectionIntro("approachIntro", "Page intro", { intro: true }),
          cards(
            "lenses",
            "The four lenses",
            "name",
            [text("name", "Name"), text("summary", "Short summary"), paragraph("detail", "Detail (shown when selected)")],
            "Keep these four, in this order. Each has its own illustration.",
          ),
          group("integratedPlan", "One integrated plan panel", [
            text("label", "Small label"),
            text("title", "Title"),
            paragraph("body", "Text"),
          ]),
          sectionIntro("roadmapIntro", "Phased roadmap: intro", { intro: true }),
          cards(
            "phases",
            "Roadmap phases",
            "title",
            [
              text("number", "Number", 'Like "01".'),
              text("title", "Title"),
              text("timeframe", "Timeframe"),
              paragraph("body", "Text"),
            ],
            "The last phase shows in aqua.",
          ),
          group("audiencesIntro", "Who we work with: intro", [text("label", "Small label"), text("title", "Headline")]),
          cards("audiences", "Who we work with", "name", [text("name", "Name"), paragraph("body", "Text")]),
          mottos,
        ],
      },
      {
        name: "contact",
        label: "Contact page",
        path: "content",
        format: "json",
        match: { include: "contact" },
        ui: { ...singlePage, router: () => "/contact" },
        fields: [
          sectionIntro("contactIntro", "Page intro", { intro: true }),
          cards("nextSteps", "What happens next", "title", [text("title", "Title"), paragraph("body", "Text")]),
          lines("timelineOptions", "Form: timeline choices"),
          lines("budgetOptions", "Form: budget choices"),
          group("contactCopy", "Form messages", [
            text("successTitle", "After sending: headline"),
            paragraph("successBody", "After sending: text"),
            text("invalid", "When a field needs fixing"),
            paragraph("unavailable", "When the form can't send"),
          ]),
        ],
      },
      {
        name: "site",
        label: "Every page",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: { ...singlePage, router: () => "/" },
        fields: [
          paragraph("positioning", "Home hero sentence", "The one sentence under the big tagline on the home page."),
          paragraph("description", "Search engine description", "What Google shows under the site name."),
          group("contact", "Contact details (footer and contact page)", [
            text("email", "Email"),
            text("phone", "Phone"),
            text("website", "Website"),
          ]),
          group("cta", "Closing call to action (bottom of most pages)", [
            text("label", "Small label"),
            text("title", "Headline"),
            paragraph("body", "Text"),
            text("button", "Button text"),
          ]),
        ],
      },
    ],
  },
});

