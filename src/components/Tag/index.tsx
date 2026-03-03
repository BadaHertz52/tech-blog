import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  bgClassName?: string;
  textClassName?: string;
  className?: string;
}

export default function Tag({
  children,
  bgClassName = "bg-gray-light",
  textClassName = "text-primary-blue",
  className = "",
}: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-button px-3 py-1 text-xs font-semibold uppercase ${bgClassName} ${textClassName} ${className}`}
    >
      {children}
    </span>
  );
}
