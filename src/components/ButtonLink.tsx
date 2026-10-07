import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  /** "light" for use on purple backgrounds. */
  variant?: "primary" | "light";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-sm px-7 py-3.5 text-base font-medium transition-colors",
        variant === "primary" ? "bg-purple text-white hover:bg-charcoal" : "bg-offwhite text-purple hover:bg-lavender-light",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
