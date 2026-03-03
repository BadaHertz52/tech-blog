import { LUCIDE_ICON_MAP } from "./LucideIcon";

export type LucideIconName = keyof typeof LUCIDE_ICON_MAP;

export type CustomIconName = "github" | "linkedin" | "bada";

export type IconName = LucideIconName | CustomIconName;
