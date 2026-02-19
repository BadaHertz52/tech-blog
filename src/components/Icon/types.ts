export type LucideIconName =
  | "search"
  | "menu"
  | "sun"
  | "moon"
  | "calendar"
  | "clock"
  | "chevron-right"
  | "message-square"
  | "home"
  | "arrow-up"
  | "play-circle"
  | "external-link";

export type CustomIconName = "github" | "linkedin" | "bada";

export type IconName = LucideIconName | CustomIconName;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}
