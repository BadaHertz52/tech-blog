import { ChangeEvent } from "react";

import Icon from "../Icon";

interface SearchBarProps {
  searchBarClassName?: string;
  searchIconWidth?: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({
  searchBarClassName = "w-full h-full",
  searchIconWidth = "17.5px",
  value,
  handleChange,
  onKeyDown,
  placeholder = "Search articles...",
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
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="border-border-light w-full rounded-lg border bg-bg-white py-[8.8px] pr-4 text-text-primary placeholder-text-secondary"
        style={{ paddingLeft: `calc(${searchIconWidth} + 4px + 16px + 2px)` }}
      />
    </div>
  );
}
