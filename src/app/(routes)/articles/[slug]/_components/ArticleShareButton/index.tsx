"use client";

import clsx from "clsx";

import ShareButton from "@/components/ShareButton";
import { incrementShareCount } from "@/services/supabase/actions";

interface ArticleShareButtonProps {
  slug: string;
  iconClassName?: string;
  buttonClassName?: string;
}

export default function ArticleShareButton({
  slug,
  iconClassName,
  buttonClassName,
}: ArticleShareButtonProps) {
  const handleTrackShare = async () => {
    try {
      await incrementShareCount(slug);
    } catch (error) {
      console.error("[Article Stats] Error tracking share:", error);
    }
  };

  return (
    <ShareButton
      buttonClassName={clsx(
        "rounded-full w-8 h-8 bg-bg-white-anti-gray",
        buttonClassName
      )}
      iconClassName={iconClassName}
      onCopySuccess={handleTrackShare}
    />
  );
}
