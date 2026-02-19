"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

import Icon from "@/components/Icon";
import DarkModeButton from "./components/DarkModeButton";
import NavLinks from "./components/NavLinks";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md">
      <div className="mx-auto flex h-header max-w-screen-xl items-center justify-between px-md xs:px-lg">
        <Link href="/" className="flex items-center gap-xs xs:gap-sm">
          <Icon name="bada" width={28} height={28} />
          <span className="text-xl font-extrabold text-text-primary">
            BADA.DEV
          </span>
        </Link>

        {/* PC/태블릿 네비게이션 (425px 이상) */}
        <nav className="hidden h-9 items-center gap-xs xs:flex xs:gap-md">
          <NavLinks variant="pc" />
          <DarkModeButton variant="pc" />
        </nav>

        {/* 모바일 햄버거 버튼 (425px 미만) */}
        <button
          type="button"
          aria-label={`${isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}`}
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
          className="flex h-6 w-6 items-center justify-center xs:hidden"
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
          "absolute left-0 right-0 top-full w-full xs:hidden",
          "overflow-hidden bg-primary-blue",
          "transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "h-[52px]" : "h-0"
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
