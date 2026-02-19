import {
  ArrowUp,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Home,
  Menu,
  MessageSquare,
  Moon,
  PlayCircle,
  Search,
  Sun,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

import type { LucideIconName } from "./types";

export const LUCIDE_ICON_MAP: Record<LucideIconName, React.FC<LucideProps>> = {
  "arrow-up": ArrowUp,
  calendar: Calendar,
  "chevron-right": ChevronRight,
  clock: Clock,
  "external-link": ExternalLink,
  home: Home,
  menu: Menu,
  "message-square": MessageSquare,
  moon: Moon,
  "play-circle": PlayCircle,
  search: Search,
  sun: Sun,
};

interface LucideIconProps extends LucideProps {
  name: LucideIconName;
}

export default function LucideIcon({
  name,
  width = 24,
  height = 24,
  ...rest
}: LucideIconProps) {
  const IconComponent = LUCIDE_ICON_MAP[name];
  return <IconComponent width={width} height={height} {...rest} />;
}
