import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-sm bg-purple px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-purple/85",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}
