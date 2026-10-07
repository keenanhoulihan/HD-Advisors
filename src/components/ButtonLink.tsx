import Link from "next/link";
import { cn } from "@/lib/cn";

/** Shared button look: 200ms color ease and a very slight lift on hover. */
export const buttonClass =
  "inline-flex items-center gap-3 rounded-sm bg-purple px-7 py-3.5 text-base font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-purple/85 active:translate-y-0 motion-reduce:hover:translate-y-0";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonClass, className)}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
