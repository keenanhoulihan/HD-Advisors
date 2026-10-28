import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import data from "../../content/pages/endorsements.json";

/*
 * Endorsements and client logos. Kate adds one file per entry in TinaCMS
 * (content/endorsements/, content/clients/). Both start empty, and the page
 * shows its "coming soon" state until they have entries. Never add sample
 * or invented entries.
 */

export type Endorsement = {
  quote: string;
  name: string;
  title?: string;
  organization?: string;
  photo?: string;
  order?: number;
};

export type Client = {
  name: string;
  logo?: string;
  url?: string;
  order?: number;
};

/** Reads every JSON file in a content folder, sorted by `order`. Runs at build time. */
function readFolder<T extends { order?: number }>(folder: string): T[] {
  const dir = path.join(process.cwd(), "content", folder);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(readFileSync(path.join(dir, file), "utf8")) as T)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

export const endorsementsPage = data;
export const endorsements = readFolder<Endorsement>("endorsements").filter((item) => item.quote && item.name);
export const clients = readFolder<Client>("clients").filter((item) => item.name);
