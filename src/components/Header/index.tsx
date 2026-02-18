"use client";

import { useState } from "react";
import Link from "next/link";

import Icon from "@/components/Icon";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Articles", href: "/articles" },
  { label: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="h-header sticky top-0 z-50 w-full bg-white px-lg py-md backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <Link href="/" className="xs:gap-sm flex items-center gap-xs">
          <Icon name="bada" width={28} height={28} />
          <span className="text-xl font-extrabold text-text-primary">
            BADA.DEV
          </span>
        </Link>

        <nav className="xs:gap-md flex h-9 items-center gap-xs align-middle">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-text-primary"
            >
              {label}
            </Link>
          ))}

          <button
            type="button"
            aria-label="다크모드 토글"
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-gray-light"
          >
            <Icon name="moon" width={20} height={20} />
          </button>
        </nav>
      </div>
    </header>
  );
}
