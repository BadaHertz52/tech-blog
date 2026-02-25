"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

import { useOpenToast } from "@/hooks/useOpenToast";
import Icon from "../Icon";

interface ShareButtonProps {
  iconClassName?: string;
  url?: string;
  linkIconName?: "external-link" | "link2";
}

export default function ShareButton({
  linkIconName = "link2",
  url,
  iconClassName = "h-auto w-[16px] text-gray-600",
}: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { openToast } = useOpenToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
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
      className="flex items-center justify-center p-3 transition-colors duration-200 hover:bg-gray-200"
      aria-label={isCopied ? "Link copied" : "Copy link to clipboard"}
      title={isCopied ? "Copied!" : "Copy link"}
    >
      <Icon name={linkIconName} className={iconClassName} />
    </button>
  );
}
