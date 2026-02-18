"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import Icon from "@/components/Icon";
import DarkModeButton from "./components/DarkModeButton";
import NavLinks from "./components/NavLinks";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md">
      <div className="h-header xs:px-lg mx-auto flex max-w-screen-xl items-center justify-between px-md">
        <Link href="/" className="xs:gap-sm flex items-center gap-xs">
          <Icon name="bada" width={28} height={28} />
          <span className="text-xl font-extrabold text-text-primary">
            BADA.DEV
          </span>
        </Link>

        {/* PC/태블릿 네비게이션 (425px 이상) */}
        <nav className="xs:flex xs:gap-md hidden h-9 items-center gap-xs">
          <NavLinks variant="pc" />
          <DarkModeButton variant="pc" />
        </nav>

        {/* 모바일 햄버거 버튼 (425px 미만) */}
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
          className="xs:hidden flex h-6 w-6 items-center justify-center"
        >
          <Icon
            name="chevron-right"
            width={24}
            height={24}
            className={clsx(isMobileMenuOpen ? "-rotate-90" : "rotate-90")}
          />
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      <div
        className={clsx(
          "xs:hidden absolute left-0 right-0 top-full w-full",
          "overflow-hidden bg-primary-blue",
          "transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "h-[52]" : "h-0"
        )}
      >
        <nav className="flex items-center justify-between px-md py-xs">
          <NavLinks variant="mobile" onClickLink={closeMobileMenu} />
          <DarkModeButton variant="mobile" />
        </nav>
      </div>
    </header>
  );
}
