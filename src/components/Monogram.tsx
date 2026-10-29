import { MARK, MARK_PATH } from "@/lib/logo-paths";

/*
 * The HD mark (with the hidden K), from public/brand/hd-mark.svg. Fill comes
 * from currentColor, so it is purple wherever its parent's text is purple.
 */
export const MONOGRAM_WIDTH = MARK.width;
export const MONOGRAM_HEIGHT = MARK.height;

export function MonogramShapes() {
  return <path fillRule="evenodd" transform={MARK.transform} d={MARK_PATH} />;
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
