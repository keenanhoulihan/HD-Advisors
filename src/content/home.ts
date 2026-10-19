/*
 * Home page copy. The words live in content/home.json so Kate can edit them
 * in Tina (/admin); layout stays in code.
 */
import data from "../../content/home.json";

export const { challengesIntro, challenges, shift, founderIntro, lensesTeaser } = data;
export type HomeContent = typeof data;
