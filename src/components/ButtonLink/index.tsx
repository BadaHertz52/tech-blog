import Link from "next/link";
import { ReactNode } from "react";

interface ButtonLinkProps extends Omit<React.ComponentProps<"a">, "href"> {
  href: string;
  variant?: "primary" | "secondary" | "black";
  children: ReactNode;
}

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  black: "btn-black",
} as const;

export default function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
