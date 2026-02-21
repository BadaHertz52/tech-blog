import Icon from "../Icon";

interface SearchBarProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "className" | "type"
> {
  searchBarClassName?: string;
  searchIconWidth?: string;
  value: string;
  onSearchClick: () => void;
}

export default function SearchBar({
  searchBarClassName = "w-full h-full",
  searchIconWidth = "17.5px",
  value,
  placeholder = "Search articles...",
  maxLength = 100,
  onSearchClick,
  ...restProps
}: SearchBarProps) {
  return (
    <div className={`relative ${searchBarClassName ?? ""}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-label="검색 입력"
        className="border-border-light w-full rounded-lg border bg-bg-white py-[8.8px] pl-4 text-text-primary placeholder-text-secondary"
        style={{ paddingRight: `calc(${searchIconWidth} + 4px + 16px + 2px)` }}
        {...restProps}
      />
      <button
        type="button"
        onClick={onSearchClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1"
        aria-label="검색 버튼"
      >
        <Icon
          name="search"
          width={searchIconWidth}
          className="transition-transform duration-300 hover:scale-105"
        />
      </button>
    </div>
  );
}
