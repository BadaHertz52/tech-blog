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
  pc: "text-text-primary hover:text-primary-blue",
  mobile: "text-white hover:text-gray-300",
};

export default function NavLinks({ variant, onClickLink }: NavLinksProps) {
  return (
    <>
      {NAV_ITEMS.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={`text-sm font-medium ${variantStyles[variant]} transition-colors duration-200`}
          onClick={onClickLink}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
