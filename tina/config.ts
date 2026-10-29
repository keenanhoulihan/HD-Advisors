import { defineConfig, type Collection, type TinaField } from "tinacms";

/*
 * TinaCMS editor for the site's copy (CLAUDE.md "Content editing").
 * Kate edits at /admin; every save commits a JSON file in content/ and Vercel
 * rebuilds. The site reads those JSON files directly, so Tina is only the
 * editor and never runs on public pages. Labels are plain English for Kate.
 */

const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

// ---- Field helpers ---------------------------------------------------------

const text = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
});

const longText = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  ui: { component: "textarea" },
});

const paragraphs = (name: string, label: string, description?: string): TinaField =>
  longText(name, label, [description, "Leave a blank line between paragraphs."].filter(Boolean).join(" "));

const textList = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  description,
  list: true,
});

const toggle = (name: string, label: string, description?: string): TinaField => ({
  type: "boolean",
  name,
  label,
  description,
});

const group = (name: string, label: string, fields: TinaField[], description?: string): TinaField => ({
  type: "object",
  name,
  label,
  description,
  fields,
});

const itemList = (
  name: string,
  label: string,
  itemLabelField: string,
  fields: TinaField[],
  description?: string,
): TinaField => ({
  type: "object",
  name,
  label,
  description,
  list: true,
  ui: { itemProps: (item) => ({ label: item?.[itemLabelField] || "New item" }) },
  fields,
});

/** Label, heading, and short intro: the pattern every section header uses. */
const sectionHeader = (name: string, label: string, withIntro = true): TinaField =>
  group(name, label, [
    text("label", "Small label above the heading"),
    text("title", "Heading"),
    ...(withIntro ? [longText("intro", "Intro text")] : []),
  ]);

const REPLACE_PHOTO = "Replace with new photo. Kate is sending a new one; upload it here when it arrives.";

const photo = (name: string, label: string, description?: string): TinaField => ({
  type: "image",
  name,
  label,
  description,
});

const LENSES = ["Programs", "Revenue", "Administration", "External Affairs"];

/** One fixed file per page: no creating or deleting, only editing. */
const page = (name: string, label: string, file: string, fields: TinaField[], route?: string): Collection => ({
  name,
  label,
  path: file.startsWith("settings/") ? "content/settings" : "content/pages",
  format: "json",
  match: { include: file.replace(/^(settings|pages)\//, "") },
  ui: {
    allowedActions: { create: false, delete: false },
    ...(route ? { router: () => route } : {}),
  },
  fields,
});

// ---- Collections -----------------------------------------------------------

const siteSettings = page(
  "site",
  "Site Settings",
  "settings/site",
  [
  text("name", "Company name"),
  longText("description", "Search engine description", "Shown in Google results and link previews."),
  longText("positioning", "Home page hero sentence", "The one sentence under “Clarity for Complex Growth.”"),
  toggle(
    "showEndorsements",
    "Show the Endorsements page in the menu",
    "Leave this off until Kate has endorsements ready. While it is off, the page is hidden from the menu and from search engines.",
  ),
  group("contact", "Contact details", [
    text("email", "Email", "Linked so visitors can tap to email."),
    text("phone", "Phone", "Shown as typed, for example 773.405.0207. Linked so visitors can tap to call."),
    text("website", "Website", "The full address, starting with https://. Shown without it, for example katehd.com."),
  ]),
  group(
    "cta",
    "Closing “Start a conversation” band",
    [
      text("label", "Small label"),
      text("title", "Heading"),
      longText("body", "Text"),
      text("button", "Button text"),
    ],
    "Appears at the bottom of every page.",
  ),
  group(
    "nav",
    "Menu link names",
    [
      text("home", "Home (footer only)"),
      text("about", "About"),
      text("approach", "Approach"),
      text("offerings", "Offerings"),
      text("endorsements", "Endorsements"),
      text("contact", "Contact"),
    ],
    "The words in the top menu and the footer. Each one always links to the same page.",
  ),
  group("footer", "Footer", [
    text("exploreLabel", "Heading above the page links"),
    text("contactLabel", "Heading above the contact details"),
  ]),
  ],
  "/",
);

const mottos = page(
  "mottos",
  "Mottos",
  "settings/mottos",
  [
  text("primary", "Main tagline", "Appears on every page."),
  text("lenses", "Four Lenses, One Roadmap"),
  text("shift", "From Reactive to Intentional"),
  text("design", "Growing by design"),
  text("longHaul", "Built for the long haul"),
  text("custom", "Never cookie-cutter"),
  text("secondary", "Clear Strategy. Sustainable Impact."),
  text("scaling", "Scaling Missions, Sustainably."),
  ],
  "/",
);

const home = page(
  "home",
  "Home Page",
  "pages/home",
  [
    text("heroButton", "Hero button text", "The button under the big headline at the top of the home page."),
    group("founderIntro", "Who we are (Kate's intro, right under the hero)", [
      text("label", "Small label above the heading"),
      text("title", "Heading"),
      paragraphs("body", "Intro text"),
      photo("photo", "Kate's photo (Replace with new photo)", REPLACE_PHOTO),
      text("photoAlt", "Photo description for screen readers"),
      group("hdCallout", "“Why HD?” callout", [
        toggle(
          "isDraft",
          "This is a draft",
          "DRAFT written by the web team for Kate to review. Rewrite it in your own words, then turn this off.",
        ),
        text("label", "Callout heading"),
        longText("body", "Callout text"),
      ]),
      text("link", "Link to the bio page"),
    ]),
    sectionHeader("challengesIntro", "What we hear: heading"),
    itemList("challenges", "What we hear: challenges", "title", [text("title", "Title"), longText("body", "Text")]),
    group("shift", "From Reactive to Intentional", [
      text("title", "Heading"),
      group("reactive", "Left panel (today)", [
        text("label", "Small label"),
        text("title", "Title"),
        textList("points", "Points"),
      ]),
      group("intentional", "Right panel (with a roadmap)", [
        text("label", "Small label"),
        text("title", "Title"),
        textList("points", "Points"),
      ]),
    ]),
    group("lensesTeaser", "Four Lenses teaser", [text("title", "Heading"), text("link", "Link text")]),
  ],
  "/",
);

const about = page(
  "about",
  "About Kate",
  "pages/about",
  [
    sectionHeader("intro", "Page heading"),
    group("founder", "Kate's bio", [
      text("role", "Title"),
      text("name", "Name"),
      photo("photo", "Kate's photo (Replace with new photo)", REPLACE_PHOTO),
      text("photoAlt", "Photo description for screen readers"),
      paragraphs("bio", "Bio"),
      itemList("facts", "Quick facts", "label", [text("label", "Label"), text("value", "Value")]),
    ]),
    sectionHeader("competenciesIntro", "Core competencies: heading", false),
    itemList("competencies", "Core competencies (three columns)", "title", [
      text("title", "Column heading"),
      textList("items", "Skills"),
    ]),
    group("resume", "Interactive bio (three tabs)", [
      text("label", "Small label above the heading"),
      text("title", "Heading"),
      longText("intro", "Intro text"),
      group("whoIAm", "Tab 1: Who I Am", [
        text("tabLabel", "Tab name"),
        toggle(
          "isDraft",
          "This is a draft",
          "DRAFT written by the web team from Kate's bio. Rewrite it in your own words, then turn this off.",
        ),
        text("title", "Heading"),
        paragraphs("body", "Text"),
        itemList("values", "Values", "title", [text("title", "Value"), text("body", "Short line")]),
      ]),
      group("places", "Tab 2: Where I've Been (map)", [
        text("tabLabel", "Tab name"),
        text("intro", "Intro text"),
        text("mapLabel", "Map description for screen readers"),
        text("insetLabel", "Label for the zoomed-in Mid-Atlantic box"),
        itemList(
          "pins",
          "Map pins",
          "place",
          [
            text("place", "Place name"),
            {
              type: "number",
              name: "lat",
              label: "Latitude",
              description: "Find it on Google Maps: right-click the spot and copy the first number.",
            },
            {
              type: "number",
              name: "lng",
              label: "Longitude",
              description: "The second number from Google Maps (negative for the Americas).",
            },
            toggle("isRegion", "This is a whole region, not a city", "Shows a soft ring instead of a pin."),
            text("title", "Card heading"),
            longText("body", "Card text"),
          ],
          "Pins in Washington DC, Charlottesville, and Williamsburg also show in the zoomed-in Mid-Atlantic box.",
        ),
      ]),
      group("timeline", "Tab 3: What I've Done (timeline)", [
        text("tabLabel", "Tab name"),
        text("intro", "Intro text"),
        itemList(
          "entries",
          "Timeline entries",
          "role",
          [
            text("role", "Role"),
            text("organization", "Organization"),
            text("location", "Location"),
            text("years", "Years", "For example: 2015 to 2017. Board roles still need dates: replace [Years]."),
            toggle("isBoard", "Board or civic role", "Shows a “Board and civic” tag."),
            longText("description", "Short description"),
            {
              type: "string",
              name: "lenses",
              label: "Lenses this role used",
              list: true,
              options: LENSES,
            },
          ],
          "Earliest first. Drag to reorder. The last entry is highlighted as the most recent.",
        ),
      ]),
    ]),
    group("workedAt", "Where she's worked", [text("label", "Small label"), textList("organizations", "Organizations")]),
    sectionHeader("philosophyIntro", "Philosophy: heading", false),
    itemList("philosophy", "Philosophy", "title", [text("title", "Title"), longText("body", "Text")]),
  ],
  "/about",
);

const approach = page(
  "approach",
  "Approach Page",
  "pages/approach",
  [
    sectionHeader("approachIntro", "Page heading"),
    group("lensesIntro", "Four lenses: heading", [
      text("label", "Small label"),
      text("title", "Heading"),
      text("hint", "Hint under the heading"),
    ]),
    itemList("lenses", "The four lenses", "name", [
      text("name", "Name"),
      text("summary", "One-line summary"),
      longText("detail", "Detail (shown when selected)"),
    ]),
    group("integratedPlan", "One integrated plan panel", [
      text("label", "Small label"),
      text("title", "Heading"),
      longText("body", "Text"),
    ]),
    sectionHeader("roadmapIntro", "Phased roadmap: heading"),
    itemList("phases", "Roadmap phases", "title", [
      text("number", "Number"),
      text("title", "Title"),
      text("timeframe", "Timeframe"),
      longText("body", "Text"),
    ]),
    sectionHeader("audiencesIntro", "Who we work with: heading", false),
    itemList("audiences", "Who we work with", "name", [text("name", "Name"), longText("body", "Text")]),
  ],
  "/approach",
);

const contact = page(
  "contact",
  "Contact Page",
  "pages/contact",
  [
    sectionHeader("contactIntro", "Page heading"),
    textList("timelineOptions", "Timeline choices on the form"),
    textList("budgetOptions", "Budget choices on the form"),
    group("contactCopy", "Form messages", [
      text("successTitle", "Thank-you heading"),
      longText("successBody", "Thank-you text"),
      text("invalid", "Message when a field needs fixing"),
      longText("unavailable", "Message if the form cannot send"),
    ]),
    itemList("nextSteps", "What happens next", "title", [text("title", "Step"), longText("body", "Text")]),
    group("asideCopy", "Side column headings", [
      text("nextStepsLabel", "Heading above the steps"),
      text("otherWaysLabel", "Heading above the contact details"),
    ]),
    group(
      "formLabels",
      "Form labels and button",
      [
        text("name", "Name box label"),
        text("email", "Email box label"),
        text("organization", "Organization box label"),
        text("message", "Message box label"),
        text("timeline", "Timeline menu label"),
        text("budget", "Budget menu label"),
        text("optional", "Word shown next to optional boxes"),
        text("timelinePlaceholder", "Timeline menu: text before a choice"),
        text("budgetPlaceholder", "Budget menu: text before a choice"),
        text("submit", "Send button"),
        text("sending", "Send button while sending"),
      ],
      "The words on the contact form itself.",
    ),
  ],
  "/contact",
);

const offerings = page(
  "offerings",
  "Consulting Offerings",
  "pages/offerings",
  [
    group("intro", "Page heading", [
      text("label", "Small label"),
      text("title", "Heading"),
      text("season", "Season", "Shown after the heading, for example: Fall 2026."),
      longText("intro", "Intro text"),
    ]),
    group("available", "Available now: heading", [text("label", "Small label"), text("title", "Heading")]),
    group("comingSoon", "Coming soon: heading", [
      text("label", "Small label"),
      text("title", "Heading"),
      longText("intro", "Intro text"),
    ]),
    itemList(
      "offerings",
      "Offerings",
      "title",
      [
        text("title", "Title"),
        toggle("availableNow", "Available now", "On: listed under Available now. Off: listed under Coming soon."),
        paragraphs("body", "Description", "Anything in [brackets] is a placeholder for Kate to write."),
      ],
      "Drag to reorder.",
    ),
  ],
  "/offerings",
);

const endorsementsPage = page(
  "endorsementsPage",
  "Endorsements Page",
  "pages/endorsements",
  [
    sectionHeader("intro", "Page heading"),
    text("endorsementsLabel", "Heading above the endorsements"),
    text("clientsLabel", "Heading above the client logos"),
    group(
      "comingSoon",
      "Coming soon message",
      [text("title", "Heading"), longText("body", "Text")],
      "Shown while there are no endorsements or clients yet.",
    ),
  ],
  "/endorsements",
);

const endorsement: Collection = {
  name: "endorsement",
  label: "Endorsements",
  path: "content/endorsements",
  format: "json",
  fields: [
    { type: "string", name: "quote", label: "Quote", required: true, ui: { component: "textarea" } },
    { type: "string", name: "name", label: "Name", required: true, isTitle: true },
    text("title", "Their title"),
    text("organization", "Organization"),
    photo("photo", "Photo (optional)"),
    { type: "number", name: "order", label: "Order", description: "Lower numbers show first." },
  ],
};

const client: Collection = {
  name: "client",
  label: "Clients",
  path: "content/clients",
  format: "json",
  fields: [
    { type: "string", name: "name", label: "Organization name", required: true, isTitle: true },
    photo("logo", "Logo", "Only add a logo with the organization's permission. SVG or PNG on a transparent background works best."),
    text("url", "Website (optional)"),
    { type: "number", name: "order", label: "Order", description: "Lower numbers show first." },
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      home,
      about,
      offerings,
      endorsementsPage,
      endorsement,
      client,
      approach,
      contact,
      siteSettings,
      mottos,
    ],
  },
});
