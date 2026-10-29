import { ADVISORS, CLIP_LEFT, CLIP_RIGHT, LEFT_LINES, WORDMARK } from "@/lib/hero-logo-art";
import { HERO_LOGO, LINE_STROKE, RIGHT, rightLinePath } from "@/lib/hero-logo";
import { MARK_PATH } from "@/lib/logo-paths";

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
        {LEFT_LINES.map((d, i) => (
          <path key={i} d={d} />
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
