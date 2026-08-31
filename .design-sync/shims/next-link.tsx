import { ComponentProps } from "react";

interface ShimLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
}

export default function Link({ href, children, ...rest }: ShimLinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
