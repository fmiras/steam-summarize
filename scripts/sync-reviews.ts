import cliProgress from 'cli-progress'
import { createClient } from '@supabase/supabase-js'
import { fetchReviews } from '../lib/steam'

const { SUPABASE_URL = '', SUPABASE_SECRET = '' } = process.env
const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET)

const GAME_ID = '1091500'
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

async function main() {
  console.log(`Fetching reviews for game ID: ${GAME_ID}`)

  let { reviews, cursor, query_summary } = await fetchReviews(GAME_ID)
  bar1.start(query_summary.total_reviews, 0)

  while (true) {
    const data = await fetchReviews(GAME_ID, cursor)
    reviews.push(...data.reviews)

    await supabase.from('steam_reviews').insert(data.reviews).select()

    cursor = data.cursor
    bar1.update(reviews.length)

    if (!cursor) {
      break
    }
  }
}

main()
