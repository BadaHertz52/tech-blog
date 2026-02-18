import CustomIcon from "./CustomIcon";
import LucideIcon, { LUCIDE_ICON_MAP } from "./LucideIcon";
import type { IconName, IconProps, LucideIconName } from "./types";

const isLucideIconName = (name: IconName): name is LucideIconName => {
  return LUCIDE_ICON_MAP.hasOwnProperty(name);
};

export default function Icon({
  name,
  width = 24,
  height = 24,
  color = "var(--color-gray-charcoal)",
  ...rest
}: IconProps) {
  if (isLucideIconName(name)) {
    return <LucideIcon name={name} width={width} height={height} color={color} {...rest} />;
  }

  return <CustomIcon name={name} width={width} height={height} color={color} {...rest} />;
}
