import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Articles", href: "/articles" },
  { label: "About Me", href: "/about-me" },
];

interface NavLinksProps {
  variant: "pc" | "mobile";
  onClickLink?: () => void;
}

const variantStyles = {
  pc: "text-text-primary",
  mobile: "text-white",
};

export default function NavLinks({ variant, onClickLink }: NavLinksProps) {
  return (
    <>
      {NAV_ITEMS.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`text-sm font-medium ${variantStyles[variant]}`}
          onClick={onClickLink}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
