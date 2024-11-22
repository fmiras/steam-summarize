import { Game } from '@/app/api/game/schema'
import { Review } from '@/app/api/reviews/schema'

interface SteamApiReviewsResponse {
  success: number
  query_summary: {
    num_reviews: number
    review_score: number
    review_score_desc: string
    total_positive: number
    total_negative: number
    total_reviews: number
  }
  reviews: Review[]
  cursor: string
}

export async function fetchReviews(appId: string, cursor = '*'): Promise<SteamApiReviewsResponse> {
  const url = `https://store.steampowered.com/appreviews/${appId}?json=1&cursor=${encodeURIComponent(
    cursor
  )}&language=english`
  const response = await fetch(url)
  const data: SteamApiReviewsResponse = await response.json()
  return data
}

export async function searchGame(search: string): Promise<Game> {
  const url = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(
    search
  )}&l=english&cc=US`

  const response = await fetch(url)
  const data = await response.json()

  if (!data.items || data.items.length === 0) {
    throw new Error('No games found')
  }

  return data.items[0]
}
