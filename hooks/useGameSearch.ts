import { useState } from 'react'

interface Game {
  id: string
  name: string
}

interface UseGameSearchReturn {
  game: Game | null
  isLoading: boolean
  error: string | null
  searchGame: (query: string) => Promise<void>
}

export function useGameSearch(): UseGameSearchReturn {
  const [game, setGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchGame = async (query: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      })

      if (!response.ok) {
        throw new Error('Failed to search game')
      }

      const data = await response.json()
      setGame(data.game)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    game,
    isLoading,
    error,
    searchGame,
  }
}
