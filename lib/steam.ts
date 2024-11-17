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

function mapReview(steamReview: Review) {
  const {
    recommendationid,
    language,
    review,
    timestamp_created,
    timestamp_updated,
    voted_up,
    votes_up,
    votes_funny,
    weighted_vote_score,
    comment_count,
    steam_purchase,
    received_for_free,
    written_during_early_access,
    playtime_at_review,
  } = steamReview

  return {
    recommendationid,
    language,
    review,
    timestamp_created,
    timestamp_updated,
    voted_up,
    votes_up,
    votes_funny,
    weighted_vote_score,
    comment_count,
    steam_purchase,
    received_for_free,
    written_during_early_access,
    playtime_at_review,
  }
}

export async function fetchReviews(appId: string, cursor = '*'): Promise<SteamApiReviewsResponse> {
  const url = `https://store.steampowered.com/appreviews/${appId}?json=1&cursor=${encodeURIComponent(
    cursor
  )}&language=english`
  const response = await fetch(url)
  const data: SteamApiReviewsResponse = await response.json()
  return {
    ...data,
    reviews: data.reviews.map((review) => mapReview(review)),
  }
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
