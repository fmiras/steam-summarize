import { useState, useEffect } from 'react'

export function useSteamReviews(appId: string) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/steam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appId }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch summary')
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        let result = ''

        while (true) {
          const { done, value } = await reader!.read()
          if (done) break
          result += decoder.decode(value)
        }

        setSummary(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSummary()
  }, [appId])

  return { summary, isLoading, error }
}
