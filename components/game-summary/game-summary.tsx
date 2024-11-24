'use client'
import { useEffect } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react'

import { summarySchema } from '@/app/api/summary/schema'
import { CardStack } from '@/components/ui/card-stack'
import { WeightIndicator } from '@/components/ui/weight-indicator'
import { Game } from '../../app/api/game/schema'
import { Review } from '../../app/api/reviews/schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorGameSummaryProps {
  message?: string
  onRetry?: () => void
}

export function ErrorGameSummary({ message, onRetry }: ErrorGameSummaryProps) {
  return (
    <Card
      className="w-full bg-card/50 border border-destructive/30 shadow-neon 
      hover:border-destructive/50 transition-all duration-300 backdrop-blur-sm"
    >
      <CardContent className="py-12 flex flex-col items-center space-y-6">
        <div className="p-4 bg-destructive/10 rounded-full ring-4 ring-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="text-center space-y-3 max-w-xl">
          <h3 className="text-xl font-semibold text-destructive">Unable to Generate Summary</h3>
          <p className="text-muted-foreground">
            {message || 'There was an error analyzing the game reviews. Please try again.'}
          </p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            className="bg-destructive/10 hover:bg-destructive/20 border-destructive/30 
              hover:border-destructive/50 text-destructive hover:text-destructive 
              transition-all duration-300"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function GameSummary({
  query,
  game,
}: {
  query: string
  game: Game & { reviews: Review[] }
}) {
  const {
    object,
    isLoading: isLoadingSummary,
    submit,
    error: summaryError,
  } = useObject({
    api: '/api/summary',
    schema: summarySchema,
  })

  useEffect(() => {
    if (game?.id) {
      submit({ prompt: query, gameId: game.id })
    }
  }, [game?.id])

  if (isLoadingSummary) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <CardStack
          items={game.reviews
            .filter((review) => review.review.length < 250)
            .slice(0, 3)
            .map((review) => ({
              id: parseInt(review.recommendationid),
              name: `Voted: ${review.votes_up}`,
              votedUp: review.voted_up,
              designation: `Playtime: ${Math.round(
                parseInt(review.author?.playtime_at_review?.toString() || '0') / 60
              )} minutes`,
              content: review.review,
            }))}
        />
        <div className="w-full p-6 gap-2 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Generating summary</p>
        </div>
      </div>
    )
  }

  if (summaryError || !object) {
    return (
      <ErrorGameSummary
        message="Unable to analyze the game reviews at this time. Please try again later."
        onRetry={() => submit({ prompt: query, gameId: game.id })}
      />
    )
  }

  return (
    <div>
      <p className="leading-7 mb-4">{object?.overall}</p>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-primary">Pros</h4>
          <ul className="flex flex-col gap-2">
            {object?.pros
              ?.sort((a, b) => (b?.weight ?? 0) - (a?.weight ?? 0))
              .map((review, i) => (
                <li key={i} className="flex items-center gap-3 md:gap-2">
                  <div className="w-6 md:w-12">
                    <WeightIndicator weight={review?.weight ?? 0} variant="positive" />
                  </div>
                  {review?.content}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary">Cons</h4>
          <ul className="flex flex-col gap-2">
            {object?.cons
              ?.sort((a, b) => (b?.weight ?? 0) - (a?.weight ?? 0))
              .map((review, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-6 md:w-12">
                    <WeightIndicator weight={review?.weight ?? 0} variant="negative" />
                  </div>
                  {review?.content}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 w-full">
            <h4 className="font-semibold text-primary">Recommendation</h4>
          </div>
          <p>{object?.recommendation}</p>
        </div>
      </div>
    </div>
  )
}
