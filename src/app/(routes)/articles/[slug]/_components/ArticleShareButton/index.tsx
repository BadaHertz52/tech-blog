'use client'

import ShareButton from '@/components/ShareButton'
import { incrementShareCount } from '@/services/supabase/actions'

interface ArticleShareButtonProps {
  slug: string
}

export default function ArticleShareButton({
  slug,
}: ArticleShareButtonProps) {
  const handleTrackShare = async () => {
    try {
      await incrementShareCount(slug)
    } catch (error) {
      console.error('[Article Stats] Error tracking share:', error)
    }
  }

  return (
    <ShareButton
      buttonClassName="rounded-full w-8 h-8 bg-bg-white-anti-gray"
      onCopySuccess={handleTrackShare}
    />
  )
}