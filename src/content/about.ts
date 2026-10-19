/*
 * Kate's background, edited in Tina via content/about.json. Facts only, from
 * CLAUDE.md "Kate's background": never invent numbers, clients, or results.
 * The career list runs earliest first, so the line stacks calm from organizing
 * roots to the most recent role.
 */
import data from "../../content/about.json";

export type CareerEntry = {
  role: string;
  organization: string;
  location: string;
  years: string;
  line: string;
  /** Which of the four lenses the role put to work. Facts only. */
  lenses?: string[];
};

export const { aboutIntro, founder, careerIntro, workedAt, philosophyIntro, philosophy } = data;
export const career: CareerEntry[] = data.career;
export type AboutContent = typeof data;
