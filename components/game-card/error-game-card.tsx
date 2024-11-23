import { AlertCircle } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export default function ErrorGameCard() {
  return (
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
  )
}
