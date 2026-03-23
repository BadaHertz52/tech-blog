"use client";

import { useEffect } from "react";

import { incrementViewCount } from "@/services/supabase/actions";

interface ArticleStatsWrapperProps {
  slug: string;
}

export default function ArticleStatsWrapper({
  slug,
}: ArticleStatsWrapperProps) {
  useEffect(() => {
    // mount 시 view count 증가 (fire-and-forget)
    incrementViewCount(slug).catch(() => {
      // 실패해도 UX 영향 없음
    });
  }, [slug]);
  return null;
}
