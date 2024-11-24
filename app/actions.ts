'use server'
import { notFound } from 'next/navigation'

import { Game } from '@/app/api/game/schema'
import { Review } from '@/app/api/reviews/schema'
import { fetchReviews, searchGame } from '@/lib/steam'

export async function getGameWithReviews(
  query: string
): Promise<Game & { reviews: Review[]; reviewDescription: string }> {
  try {
    const game = await searchGame(query)
    const response = await fetchReviews(game.id)
    return {
      ...game,
      reviews: response.reviews,
      reviewDescription: response.query_summary.review_score_desc,
    }
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes('No games found') || error.message.includes('Reviews not found'))
    ) {
      notFound()
    }
    throw error
  }
}
