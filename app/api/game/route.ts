import { searchGame } from '@/lib/steam'

export async function POST(req: Request) {
  const { prompt: search } = await req.json()

  try {
    const game = await searchGame(search)
    return Response.json({ game })
  } catch (error) {
    return Response.json({ error: 'Game not found' }, { status: 404 })
  }
}
