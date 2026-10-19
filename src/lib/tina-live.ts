"use client";

import { useTina } from "tinacms/dist/react";
import {
  AboutPartsFragmentDoc,
  ApproachPartsFragmentDoc,
  ContactPartsFragmentDoc,
  HomePartsFragmentDoc,
  SitePartsFragmentDoc,
} from "../../tina/__generated__/types";

/*
 * Live preview for Kate's editor (CLAUDE.md "Editing with Tina"). Pages render
 * from the JSON in content/ at build time. Inside the Tina editor, useTina
 * swaps in her unsaved edits as she types; everywhere else it returns the
 * JSON unchanged, so visitors never depend on Tina.
 */

const DOC = "... on Document { id _sys { filename basename hasReferences breadcrumbs path relativePath extension } }";
const doc = (collection: string, fragment: string) =>
  `${collection}(relativePath: "${collection}.json") { ${DOC} ...${fragment} }`;

/** Each page query also loads "Every page" settings, so the CTA and hero sentence preview live too. */
export const liveQueries = {
  home: `query homeLive { ${doc("home", "HomeParts")} ${doc("site", "SiteParts")} } ${HomePartsFragmentDoc} ${SitePartsFragmentDoc}`,
  about: `query aboutLive { ${doc("about", "AboutParts")} ${doc("site", "SiteParts")} } ${AboutPartsFragmentDoc} ${SitePartsFragmentDoc}`,
  approach: `query approachLive { ${doc("approach", "ApproachParts")} ${doc("site", "SiteParts")} } ${ApproachPartsFragmentDoc} ${SitePartsFragmentDoc}`,
  contact: `query contactLive { ${doc("contact", "ContactParts")} ${doc("site", "SiteParts")} } ${ContactPartsFragmentDoc} ${SitePartsFragmentDoc}`,
};

export function useLive<T extends object>(query: string, data: T): T {
  return useTina({ query, variables: {}, data }).data as T;
}
