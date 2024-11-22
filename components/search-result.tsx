'use client'
import { useEffect } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { motion } from 'framer-motion'
import { AlertCircle, Loader2, ComputerIcon as SteamIcon } from 'lucide-react'

import { summarySchema } from '@/app/api/summary/schema'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { WeightIndicator } from '@/components/ui/weight-indicator'
import { useGameSearch } from '@/hooks/use-game-search'
import { useReviews } from '@/hooks/use-reviews'

import { CardStack } from './ui/card-stack'

export default function SearchResult({ query }: { query: string }) {
  const { game, isLoading: isLoadingGame, error: gameError } = useGameSearch(query)
  const { reviews, isLoading: isLoadingReviews } = useReviews(game?.id)

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

  if (gameError) {
    return (
      <motion.section
        aria-label="Error"
        key="error"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-full bg-card border border-destructive/30 shadow-neon hover:border-destructive/50 transition-all duration-300">
          <CardContent className="py-12 flex flex-col items-center space-y-6">
            <div className="p-4 bg-destructive/10 rounded-full ring-4 ring-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div className="text-center space-y-3 max-w-xl">
              <h3 className="text-xl font-semibold text-destructive">Unable to Find Game</h3>
              <p className="text-muted-foreground">
                {'Game not found. Please try again with a different game.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    )
  }

  if (!query) {
    return (
      <motion.section
        aria-label="Welcome"
        key="welcome"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="bg-card border border-dashed border-border shadow-neon">
          <CardContent className="py-14 flex flex-col items-center text-center">
            <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <SteamIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Start Your Search</h2>
            <h3 className="text-muted-foreground max-w-md">
              Type a game name above or try one of our suggestions to see what the Steam community
              thinks.
            </h3>
          </CardContent>
        </Card>
      </motion.section>
    )
  }

  return (
    <motion.section
      aria-label="Game Summary Loading"
      key="loading-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-card border border-border shadow-neon">
        <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            {isLoadingGame ? (
              <Skeleton className="h-16 w-16 rounded-md" />
            ) : (
              <Avatar className="h-16 w-16 rounded-md">
                <AvatarImage
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${game?.id}/header.jpg`}
                  className="object-cover"
                  alt={game?.name ?? 'Game'}
                />
                <AvatarFallback className="rounded-md bg-muted">
                  <SteamIcon className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl text-foreground [&]:m-0">
                {isLoadingGame ? <Skeleton className="w-48 h-4" /> : game?.name}
              </h2>
              <h3 className="text-primary [&]:m-0">
                {isLoadingGame ? <Skeleton className="w-64 h-4" /> : 'Community Review Summary'}
              </h3>
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href={`https://store.steampowered.com/app/${game?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <SteamIcon className="h-4 w-4" />
                View on Steam
              </div>
            </a>
            <a
              href={`https://store.steampowered.com/app/${game?.id}#app_reviews_hash`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View Reviews
            </a>
          </div>
        </CardHeader>
        <CardContent className="py-4 flex flex-col items-center justify-center space-y-4">
          {isLoadingGame || isLoadingSummary ? (
            <div className="w-full flex flex-col items-center justify-center">
              {isLoadingReviews ? (
                <CardStack
                  items={Array.from({ length: 3 }).map((_, i) => ({
                    id: i,
                    name: <Skeleton className="w-24 h-4" />,
                    designation: <Skeleton className="w-24 h-4" />,
                    content: <Skeleton className="w-full h-4" />,
                    votedUp: null,
                  }))}
                />
              ) : (
                <CardStack
                  items={reviews
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
              )}
              <div className="w-full p-6 gap-2 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Generating summary</p>
              </div>
            </div>
          ) : (
            object && (
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
          )}
        </CardContent>
      </Card>
    </motion.section>
  )
}
