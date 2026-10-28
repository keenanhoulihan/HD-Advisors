"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import {
  AboutPartsFragmentDoc,
  ApproachPartsFragmentDoc,
  ContactPartsFragmentDoc,
  EndorsementsPagePartsFragmentDoc,
  HomePartsFragmentDoc,
  MottosPartsFragmentDoc,
  OfferingsPartsFragmentDoc,
  SitePartsFragmentDoc,
} from "../../tina/__generated__/types";

/*
 * Visual editing for Kate (CLAUDE.md "Content editing"). Pages render from the
 * JSON in content/ at build time. Inside the Tina editor, useTina swaps in her
 * unsaved edits as she types; everywhere else it returns the JSON unchanged,
 * so visitors never depend on Tina. Each top-level key of a view's data is a
 * document in its query (home, site, ...), which is how Tina maps clicks on
 * the page back to fields.
 */

const DOC = "... on Document { id _sys { filename basename hasReferences breadcrumbs path relativePath extension } }";

/** One document by file name: `home(relativePath: "home.json") { ...HomeParts }`. */
const doc = (collection: string, file: string, fragment: string) =>
  `${collection}(relativePath: "${file}.json") { ${DOC} ...${fragment} }`;

const query = (name: string, docs: string[], fragments: string[]) =>
  `query ${name} { ${docs.join(" ")} } ${fragments.join(" ")}`;

export const liveQueries = {
  site: query(
    "siteLive",
    [doc("site", "site", "SiteParts"), doc("mottos", "mottos", "MottosParts")],
    [SitePartsFragmentDoc, MottosPartsFragmentDoc],
  ),
  home: query(
    "homeLive",
    [doc("home", "home", "HomeParts"), doc("approach", "approach", "ApproachParts")],
    [HomePartsFragmentDoc, ApproachPartsFragmentDoc],
  ),
  about: query("aboutLive", [doc("about", "about", "AboutParts")], [AboutPartsFragmentDoc]),
  approach: query("approachLive", [doc("approach", "approach", "ApproachParts")], [ApproachPartsFragmentDoc]),
  contact: query("contactLive", [doc("contact", "contact", "ContactParts")], [ContactPartsFragmentDoc]),
  offerings: query("offeringsLive", [doc("offerings", "offerings", "OfferingsParts")], [OfferingsPartsFragmentDoc]),
  endorsements: query(
    "endorsementsLive",
    [doc("endorsementsPage", "endorsements", "EndorsementsPageParts")],
    [EndorsementsPagePartsFragmentDoc],
  ),
};

/**
 * Live data for a view. `form` is the content file whose fields the sidebar
 * opens on (the page itself, not Site Settings, which every page also loads).
 */
export function useLive<T extends object>(liveQuery: string, data: T, form?: string): T {
  return useTina({
    query: liveQuery,
    variables: {},
    data,
    ...(form ? { experimental___selectFormByFormId: () => `content/${form}.json` } : {}),
  }).data;
}

/**
 * Click-to-edit: spread on the element that shows a field, e.g.
 * `<h2 {...edit(intro, "title")}>`. For a string in a list, pass its index.
 */
// tinaField's own types only accept keys it knows about; our content types come from the JSON.
const fieldId = tinaField as (object: object, property?: string, index?: number) => string;

export const edit = (object: object | null | undefined, field?: string, index?: number) => {
  const id = object ? fieldId(object, field, index) : "";
  return id ? { "data-tina-field": id } : {};
};

/** Lists Kate is editing can briefly hold empty items; never crash on them. */
export const list = <T>(items: T[] | null | undefined): T[] => items ?? [];
