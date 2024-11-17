import { fetchReviews, searchGame } from '@/lib/steam'
import { reviewsQuerySchema } from './schema'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const params = Object.fromEntries(url.searchParams)

  const { q, cursor } = reviewsQuerySchema.parse(params)

  let gameId: string | null = q.match(/^\d+$/)?.[0] ?? null
  if (!gameId) {
    const game = await searchGame(q)
    gameId = game.id
  }
  const data = await fetchReviews(gameId, cursor)

  return Response.json(data)
}
