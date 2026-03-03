"use client";

import clsx from "clsx";
import { useState } from "react";

import Icon from "../Icon";
import { openToast } from "../Toast";

interface ShareButtonProps {
  iconClassName?: string;
  url?: string;
  buttonClassName?: string;
  linkIconName?: "external-link" | "link2";
}

export default function ShareButton({
  linkIconName = "link2",
  url = window.location.href,
  buttonClassName,
  iconClassName = "h-auto w-[16px] text-gray-600",
}: ShareButtonProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);

      openToast({
        variant: "success",
        description: "클립보드에 링크가 복사되었습니다!",
      });
    } catch (error) {
      openToast({
        variant: "error",
        description: "링크 복사에 실패했습니다. 다시 시도해주세요.",
      });
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={clsx("flex items-center justify-center", buttonClassName)}
      aria-label="Copy link to clipboard"
      title="Copy link"
    >
      <Icon name={linkIconName} className={iconClassName} />
    </button>
  );
}
