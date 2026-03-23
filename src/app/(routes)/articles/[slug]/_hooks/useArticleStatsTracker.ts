'use client'

import { useEffect } from 'react'
import { incrementViewCount } from '@/services/supabase/actions'

export const useArticleStatsTracker = (slug: string) => {
  useEffect(() => {
    // mount 시 view count 증가 (fire-and-forget)
    incrementViewCount(slug).catch(() => {
      // 실패해도 UX 영향 없음
    })
  }, [slug])
}