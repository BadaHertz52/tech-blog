"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import Dropdown from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";
import { ROUTES } from "@/constants/paths";
import { ArticleSort } from "@/types/article";
import type { DropdownOption } from "@/components/Dropdown";

interface ArticlesControlsProps {
  currentKeyword: string;
  currentSort: ArticleSort;
}

type SearchParamsQueryKey = "keyword" | "sort";

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
  currentKeyword,
  currentSort,
}: ArticlesControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keywordValue, setKeywordValue] = useState(currentKeyword);

  useEffect(() => {
    setKeywordValue(currentKeyword);
  }, [currentKeyword]);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywordValue(e.target.value);
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchArticles();
    }
  };

  const searchArticles = () => {
    const queryString = createQueryString({
      key: "keyword",
      value: keywordValue,
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
        searchBarClassName="flex-1 min-w-[140px] text-sm xs:text-base xs:max-w-[250px] lg:max-w-[300px]"
        value={keywordValue}
        onChange={handleKeywordChange}
        onKeyDown={handleKeywordKeyDown}
        onSearchClick={searchArticles}
        placeholder="검색어를 입력하세요"
      />
      <Dropdown
        options={SORT_OPTIONS}
        selectedValue={currentSort}
        onSelect={handleSortSelect}
        placeholder="Sort by"
        dropdownClassName="h-full text-sm xs:text-base"
      />
    </div>
  );
}
