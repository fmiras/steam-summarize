import { searchGame } from '@/lib/steam'

export async function POST(req: Request) {
  const { q } = await req.json()

  try {
    const game = await searchGame(q)
    return Response.json({ game })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Game not found' }, { status: 404 })
  }
}
