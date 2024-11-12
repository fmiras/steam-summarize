export interface SteamReview {
  recommendationid: string
  language: string
  review: string
  timestamp_created: number
  timestamp_updated: number
  voted_up: boolean
  votes_up: number
  votes_funny: number
  weighted_vote_score: number
  comment_count: number
  steam_purchase: boolean
  received_for_free: boolean
  written_during_early_access: boolean
  playtime_at_review: number

  // // These fields are not used in the script
  // author?: {
  //   steamid: string
  //   num_games_owned: number
  //   num_reviews: number
  //   playtime_forever: number
  //   playtime_last_two_weeks: number
  //   last_played: number
  // }
  // hidden_in_steam_china?: boolean
  // primarily_steam_deck?: boolean
}

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
  reviews: SteamReview[]
  cursor: string
}

function mapReview(steamReview: SteamReview) {
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
  )}&language=all`
  const response = await fetch(url)
  const data: SteamApiReviewsResponse = await response.json()
  return {
    ...data,
    reviews: data.reviews.map((review) => mapReview(review)),
  }
}
