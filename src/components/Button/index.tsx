import { ButtonHTMLAttributes, ReactNode } from "react";

const BUTTON_BASE_STYLE =
  "rounded-button font-semibold px-5 py-2 disabled:opacity-50";

const VARIANT_STYLE = {
  primary: "bg-primary-blue text-white",
  secondary: "bg-bg-pale-blue text-gray-charcoal",
  black: "bg-black text-white",
  other: "",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_STYLE;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${BUTTON_BASE_STYLE} ${VARIANT_STYLE[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
