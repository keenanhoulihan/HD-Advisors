/** Splits a Tina textarea into paragraphs on blank lines. */
export function toParagraphs(text: string | null | undefined): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
