import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { fetchReviews, searchGame } from '@/lib/steam'
import { summarySchema } from './schema'

const MAX_REVIEWS = process.env.NODE_ENV === 'production' ? 200 : 10

// curl -X POST http://localhost:3000/api/summary -H "Content-Type: application/json" -d '{"prompt":"The Last of Us"}'
export async function POST(req: Request) {
  const { prompt: query } = await req.json()

  let gameId: string | null = query.match(/^\d+$/)?.[0] ?? null
  if (!gameId) {
    const game = await searchGame(query)
    gameId = game.id
  }

  // Fetch reviews first
  const { reviews, cursor: firstCursor } = await fetchReviews(gameId)
  let cursor = firstCursor

  // Fetch up to 200 reviews
  while (reviews.length < MAX_REVIEWS && cursor) {
    const data = await fetchReviews(gameId, cursor)
    reviews.push(...data.reviews)
    cursor = data.cursor
  }

  // Create the streaming response
  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: summarySchema,
    messages: [
      {
        role: 'user',
        content: `You're a professional game reviewer. Analyze these Steam reviews and provide a structured summary: ${reviews
          .map((r) => r.review)
          .join('\n')}`,
      },
    ],
  })

  return result.toTextStreamResponse()
}
