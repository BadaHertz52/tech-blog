import { ReactNode } from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "black";
  children: ReactNode;
}

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  black: "btn-black",
} as const;

export default function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
