import Link from "next/link";
import { ReactNode } from "react";

import { BUTTON_BASE, BUTTON_VARIANTS } from "@/constants/buttonStyles";

interface ButtonLinkProps extends Omit<React.ComponentProps<"a">, "href"> {
  href: string;
  variant?: keyof typeof BUTTON_VARIANTS;
  children: ReactNode;
}

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
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
