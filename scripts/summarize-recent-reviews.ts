import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import cliProgress from 'cli-progress'

import { fetchReviews, SteamReview } from '../lib/steam'

const GAME_ID = '1091500'
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

async function summarizeAndOutput(reviews: SteamReview[]) {
  console.log('Generating summary...')
  const response = await streamText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'user',
        content: `give me a summary for positive, negative and neutral separated by new lines, reviews are: ${reviews}`
      }
    ]
  })

  let summary = ''
  for await (const text of response.textStream) {
    process.stdout.write(text)
    summary += text
  }
  console.log('\n\nSummary generation complete.')
  return summary
}

async function main() {
  console.log(`Fetching reviews for game ID: ${GAME_ID}`)

  let { reviews, cursor } = await fetchReviews(GAME_ID)
  bar1.start(200, 0)

  while (true) {
    const data = await fetchReviews(GAME_ID, cursor)
    reviews.push(...data.reviews)

    cursor = data.cursor
    bar1.update(reviews.length)

    if (reviews.length >= 200 || !cursor) {
      break
    }
  }

  await summarizeAndOutput(reviews)
}

main()
