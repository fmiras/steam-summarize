import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { fetchReviews } from '@/lib/steam'

// curl -X POST http://localhost:3000/api/summarize -H "Content-Type: application/json" -d '{"gameId":"1091500"}'
export async function POST(req: Request) {
  const { prompt: gameId } = await req.json()

  // Fetch reviews first
  const { reviews, cursor } = await fetchReviews(gameId)

  // Fetch up to 200 reviews
  while (reviews.length < 200 && cursor) {
    const data = await fetchReviews(gameId, cursor)
    reviews.push(...data.reviews)
    cursor = data.cursor
  }

  // Create the streaming response
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: 'user',
        content: `you're a professional game reviewer, give me a summary of this reviews: ${reviews
          .map((r) => r.review)
          .join('\n')}`,
      },
    ],
  })

  return result.toDataStreamResponse()
}
