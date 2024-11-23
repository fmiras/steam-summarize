'use server'
import { notFound, redirect } from 'next/navigation'
import { track } from '@vercel/analytics/server'

import { Game } from '@/app/api/game/schema'
import { Review } from '@/app/api/reviews/schema'
import { fetchReviews, searchGame } from '@/lib/steam'

export async function search(formData: FormData) {
  const query = formData.get('query')?.toString() || ''
  await track('Search', { query })
  console.log('query', query)
  redirect(`/?q=${encodeURIComponent(query.trim())}`)
}

export async function getGameWithReviews(query: string): Promise<Game & { reviews: Review[] }> {
  try {
    const game = await searchGame(query)
    const response = await fetchReviews(game.id)
    return { ...game, reviews: response.reviews }
  } catch (error) {
    if (error instanceof Error && error.message.includes('No games found')) {
      notFound()
    }
    throw error
  }
}
