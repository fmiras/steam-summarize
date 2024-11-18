import { NextRequest } from 'next/server'
import { searchGame } from '@/lib/steam'

// curl -X POST http://localhost:3000/api/game?q=Half-Life
export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const q = searchParams.get('q')

  if (!q) {
    return Response.json({ error: 'Missing query parameter' }, { status: 400 })
  }

  try {
    const game = await searchGame(q)
    return Response.json(game)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Game not found' }, { status: 404 })
  }
}
