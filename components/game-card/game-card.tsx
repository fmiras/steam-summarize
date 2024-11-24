import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ComputerIcon as SteamIcon } from 'lucide-react'

import { getGameWithReviews } from '@/app/actions'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import GameSummary from '@/components/game-summary/game-summary'

interface GameCardProps {
  query: string
}

export async function GameCard({ query }: GameCardProps) {
  const game = await getGameWithReviews(query)

  const getReviewColor = (description?: string) => {
    if (!description) return 'text-muted-foreground'
    if (description.includes('Overwhelmingly Positive') || description.includes('Very Positive'))
      return 'text-green-500'
    if (description.includes('Positive')) return 'text-green-400'
    if (description.includes('Mostly Positive')) return 'text-green-300'
    if (description.includes('Mixed')) return 'text-yellow-500'
    if (description.includes('Negative')) return 'text-red-500'
    if (description.includes('Very Negative')) return 'text-red-600'
    return 'text-muted-foreground'
  }

  return (
    <Card className="w-full bg-card border border-border shadow-neon hover:shadow-neon-lg transition-all duration-300">
      <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-md hover:scale-105 transition-transform">
            <AvatarImage
              src={`https://steamcdn-a.akamaihd.net/steam/apps/${game?.id}/header.jpg`}
              className="object-cover w-full h-full"
              alt={game?.name ?? 'Game'}
            />
            <AvatarFallback className="rounded-md bg-muted">
              <SteamIcon className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-foreground [&]:m-0 hover:text-primary transition-colors">
              {game?.name}
            </h2>
            <h3 className="text-primary [&]:m-0 font-semibold">Community Review Summary</h3>
          </div>
        </div>

        <div className="text-muted-foreground text-sm">
          <div className="flex gap-6 mb-2">
            <a
              href={`https://store.steampowered.com/app/${game?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary hover:scale-105 transition-all"
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
              className="text-sm text-muted-foreground hover:text-primary hover:scale-105 transition-all"
            >
              View Reviews
            </a>
          </div>
          <div className={`w-full text-end font-medium ${getReviewColor(game?.reviewDescription)}`}>
            {game?.reviewDescription}
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full py-4 flex flex-col items-center justify-center space-y-4">
        <GameSummary query={query} game={game} />
      </CardContent>
    </Card>
  )
}
