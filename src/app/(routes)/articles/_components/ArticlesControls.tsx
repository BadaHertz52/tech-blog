"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import Dropdown from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";
import { ROUTES } from "@/constants/paths";
import { ArticleSort } from "@/types/article";
import type { DropdownOption } from "@/components/Dropdown";

interface ArticlesControlsProps {
  currentSearch: string;
  currentSort: string;
}

type SearchParamsQueryKey = "search" | "sort";

const SORT_OPTIONS: (DropdownOption & { value: ArticleSort })[] = [
  { value: "newest", label: "최신순" },
  { value: "oldest", label: "오래된 순" },
];

const createQueryString = ({
  key,
  value,
  searchParams,
}: {
  key: SearchParamsQueryKey;
  value: string;
  searchParams: URLSearchParams;
}) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  params.set("page", "1");

  return params.toString();
};

export default function ArticlesControls({
  currentSearch,
  currentSort,
}: ArticlesControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchArticles();
    }
  };

  const searchArticles = () => {
    const queryString = createQueryString({
      key: "search",
      value: searchValue,
      searchParams,
    });
    router.push(`${ROUTES.articles}${queryString ? `?${queryString}` : ""}`);
  };

  const handleSortSelect = (value: string) => {
    const queryString = createQueryString({
      key: "sort",
      value,
      searchParams,
    });
    router.push(`${ROUTES.articles}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="mb-8 flex h-[46px] w-full items-center justify-end gap-4">
      <SearchBar
        searchBarClassName="w-[calc(100% - 175px)] xs:w-[200px] sm:w-[250px] lg:w-[300px]"
        value={searchValue}
        handleChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search articles..."
      />
      <Dropdown
        options={SORT_OPTIONS}
        selectedValue={currentSort}
        onSelect={handleSortSelect}
        placeholder="Sort by"
        dropdownClassName="w-[159px] h-full "
      />
    </div>
  );
}
