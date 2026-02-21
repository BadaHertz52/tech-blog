export const BUTTON_VARIANTS = {
  primary: "bg-primary-blue text-white hover:bg-blue-600",
  secondary: "bg-bg-pale-blue text-gray-charcoal hover:bg-blue-100",
  black: "bg-black text-white hover:bg-gray-900",
  other: "",
} as const;

export const BUTTON_BASE =
  "rounded-button font-semibold px-5 py-2 disabled:opacity-50 transition-colors duration-200";
