import { ComputerIcon as SteamIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export function EmptyGameCard() {
  return (
    <Card className="w-full bg-card border border-dashed border-border shadow-neon">
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
  )
}
