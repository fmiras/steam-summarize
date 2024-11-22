import { z } from 'zod'

export const reviewsQuerySchema = z.object({
  q: z.string(),
  cursor: z.string().optional(),
})

export const reviewSchema = z.object({
  recommendationid: z.string(),
  language: z.string(),
  review: z.string(),
  timestamp_created: z.number(),
  timestamp_updated: z.number(),
  voted_up: z.boolean(),
  votes_up: z.number(),
  votes_funny: z.number(),
  weighted_vote_score: z.number(),
  comment_count: z.number(),
  steam_purchase: z.boolean(),
  received_for_free: z.boolean(),
  written_during_early_access: z.boolean(),
  playtime_at_review: z.number(),
  author: z
    .object({
      steamid: z.string(),
      name: z.string(),
      num_games_owned: z.number(),
      num_reviews: z.number(),
    })
    .optional(),
})

export type Review = z.infer<typeof reviewSchema>
