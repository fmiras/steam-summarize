import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { fetchReviews, searchGame } from '@/lib/steam'
import { z } from 'zod'
import { reviewSchema } from './schema'

// curl -X POST http://localhost:3000/api/summarize -H "Content-Type: application/json" -d '{"gameId":"1091500"}'
export async function POST(req: Request) {
  const { prompt: search } = await req.json()
  let gameId = search.match(/^\d+$/)
  if (!gameId) {
    gameId = await searchGame(search)
  }

  // Fetch reviews first
  const { reviews, cursor: firstCursor } = await fetchReviews(gameId)
  let cursor = firstCursor

  // Fetch up to 200 reviews
  while (reviews.length < 200 && cursor) {
    const data = await fetchReviews(gameId, cursor)
    reviews.push(...data.reviews)
    cursor = data.cursor
  }

  // Create the streaming response
  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: reviewSchema,
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
