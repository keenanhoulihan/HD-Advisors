import { ADVISORS, CLIP_LEFT, CLIP_RIGHT, LEFT_FIT, LEFT_LINES, WORDMARK } from "@/lib/hero-logo-art";
import { HERO_LOGO, LINE_STROKE, RIGHT, rightLinePath } from "@/lib/hero-logo";
import { MARK_PATH } from "@/lib/logo-paths";

/**
 * Point spacing, in logo units (about 0.66px each on desktop): the ripple is
 * gentle (wavelengths 350 and 190), so this stays well under a pixel of error
 * and keeps the page light (the art is in the HTML and the hydration data).
 */
const STEP = 12;
/** Keep every other point of the logo's own line data (about 5.7 units apart). */
const DATA_STRIDE = 2;
/** Over this distance the generated ripple hands over to the logo's own line data. */
const BLEND = 80;

const round = (n: number) => Math.round(n * 10) / 10;
const smoothstep = (u: number) => u * u * (3 - 2 * u);

/** Line i continued with its fitted ripple: the same shape, period after period, at any x. */
function fitted(i: number, x: number) {
  const [a, b, c, d, e] = LEFT_FIT.lines[i];
  const k = (2 * Math.PI) / LEFT_FIT.wavelengths[0];
  const j = (2 * Math.PI) / LEFT_FIT.wavelengths[1];
  return a + b * Math.sin(k * x) + c * Math.cos(k * x) + d * Math.sin(j * x) + e * Math.cos(j * x);
}

/**
 * Left line i from the left edge of the drawing to the H: the generated ripple
 * off-screen, blending into the logo's own data over BLEND, then the data
 * unchanged near the H (where the clip leaves the small gap).
 */
function leftLinePath(i: number) {
  const all = LEFT_LINES[i]
    .slice(1)
    .split(" L")
    .map((pair) => pair.split(" ").map(Number) as [number, number]);
  const data = all.filter((_, k) => k % DATA_STRIDE === 0 || k === all.length - 1);
  const start = data[0][0];
  const points: [number, number][] = [];
  for (let x = HERO_LOGO.left; x < start; x += STEP) points.push([x, fitted(i, x)]);
  for (const [x, y] of data) {
    const w = smoothstep(Math.min(1, (x - start) / BLEND));
    points.push([x, w * y + (1 - w) * fitted(i, x)]);
  }
  return `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join("L")}`;
}

/**
 * The parts of the home hero logo that never move, rendered on the server
 * (HeroLogo animates the right-hand lines on top). Includes a finished copy of
 * the right lines and straight line, shown when there is no JavaScript or the
 * visitor prefers reduced motion (`hero-static`, see globals.css).
 */
export function HeroLogoArt() {
  return (
    <>
      <defs>
        <clipPath id="hero-clip-left" clipPathUnits="userSpaceOnUse">
          <path d={CLIP_LEFT} />
        </clipPath>
        <clipPath id="hero-clip-right" clipPathUnits="userSpaceOnUse">
          <path d={CLIP_RIGHT} />
        </clipPath>
      </defs>
      <g fill="none" {...LINE_STROKE} clipPath="url(#hero-clip-left)">
        {LEFT_LINES.map((_, i) => (
          <path key={i} d={leftLinePath(i)} />
        ))}
      </g>
      <g className="hero-static" fill="none" {...LINE_STROKE}>
        <g clipPath="url(#hero-clip-right)">
          {RIGHT.offsets.map((offset) => (
            <path key={offset} d={rightLinePath(offset)} />
          ))}
        </g>
        {/* Outside the clip: the logo's clip outline stops short of the lengthened line. */}
        <path d={`M${RIGHT.point.x} ${RIGHT.point.y}H${RIGHT.end}`} />
      </g>
      <path fillRule="evenodd" transform={HERO_LOGO.markTransform} d={MARK_PATH} />
      <path d={WORDMARK} />
      <path d={ADVISORS} />
    </>
  );
}
