import { useEffect, useState, useCallback } from 'react'
import type { Review } from '@/app/api/reviews/schema'

interface UseReviewsReturn {
  reviews: Review[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  fetchReviews: (query: string, cursor?: string) => Promise<void>
}

export function useReviews(gameId?: string): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchReviews = useCallback(async (query: string, cursor?: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams({ q: query })
      if (cursor) {
        params.append('cursor', cursor)
      }

      const response = await fetch(`/api/reviews?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }

      const data = await response.json()

      if (cursor) {
        setReviews((prev) => [...prev, ...data.reviews])
      } else {
        setReviews(data.reviews)
      }

      setHasMore(data.next_cursor !== null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (gameId) {
      fetchReviews(gameId)
    }
  }, [gameId, fetchReviews])

  return {
    reviews,
    isLoading,
    error,
    hasMore,
    fetchReviews,
  }
}
