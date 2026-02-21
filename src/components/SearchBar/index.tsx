import { ChangeEvent, InputHTMLAttributes } from "react";

import Icon from "../Icon";

interface SearchBarProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "className" | "type"
> {
  searchBarClassName?: string;
  searchIconWidth?: string;
  value: string;
}

export default function SearchBar({
  searchBarClassName = "w-full h-full",
  searchIconWidth = "17.5px",
  value,
  placeholder = "Search articles...",
  maxLength = 100,
  ...restProps
}: SearchBarProps) {
  return (
    <div className={`relative ${searchBarClassName ?? ""}`}>
      <Icon
        name="search"
        width={searchIconWidth}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
      />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        className="border-border-light w-full rounded-lg border bg-bg-white py-[8.8px] pr-4 text-text-primary placeholder-text-secondary"
        style={{ paddingLeft: `calc(${searchIconWidth} + 4px + 16px + 2px)` }}
        {...restProps}
      />
    </div>
  );
}
