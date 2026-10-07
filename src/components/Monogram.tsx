/*
 * HD monogram traced from public/brand/hd-logo.png. Replace these paths with
 * the official SVG once it exists in public/brand/.
 */
export const MONOGRAM_WIDTH = 382;
export const MONOGRAM_HEIGHT = 250;

export function MonogramShapes() {
  return (
    <>
      <path d="M0 0H49V97H129V0H177V250H129V150H49V250H0Z" />
      <path
        fillRule="evenodd"
        d="M197 0H277A105 125 0 0 1 277 250H197ZM245 47V203H277A58 78 0 0 0 277 47Z"
      />
    </>
  );
}

type MonogramProps = {
  className?: string;
  /** Accessible name. Omit when the monogram is decorative. */
  title?: string;
};

export function Monogram({ className, title }: MonogramProps) {
  return (
    <svg
      viewBox={`0 0 ${MONOGRAM_WIDTH} ${MONOGRAM_HEIGHT}`}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <MonogramShapes />
    </svg>
  );
}
