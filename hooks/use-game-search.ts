import { useCallback, useEffect, useState } from 'react'

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

export function useGameSearch(query: string): UseGameSearchReturn {
  const [game, setGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchGame = useCallback(async (query: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/game?q=${query}`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to search game')
      }

      const data = await response.json()
      setGame(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (query) {
      searchGame(query)
    }
  }, [query, searchGame])

  return {
    game,
    isLoading,
    error,
    searchGame,
  }
}
