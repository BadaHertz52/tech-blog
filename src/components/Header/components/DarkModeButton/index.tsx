import clsx from "clsx";

import Icon from "@/components/Icon";

interface DarkModeButtonProps {
  variant: "pc" | "mobile";
}

const variantStyles = {
  pc: {
    button: "bg-gray-light",
    iconColor: "var(--color-gray-charcoal)",
  },
  mobile: {
    button: "",
    iconColor: "var(--color-white)",
  },
};

export default function DarkModeButton({ variant }: DarkModeButtonProps) {
  const { button, iconColor } = variantStyles[variant];

  return (
    <button
      type="button"
      aria-label="다크모드 토글"
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-sm",
        button
      )}
    >
      <Icon name="moon" width={20} height={20} color={iconColor} />
    </button>
  );
}
