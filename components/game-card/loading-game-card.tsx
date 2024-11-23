import { Loader2 } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CardStack } from '@/components/ui/card-stack'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingGameCard() {
  return (
    <Card className="w-full bg-card border border-border shadow-neon">
      <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-md" />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl text-foreground [&]:m-0">
              <Skeleton className="w-48 h-4" />
            </h2>
            <h3 className="text-primary [&]:m-0">
              <Skeleton className="w-64 h-4" />
            </h3>
          </div>
        </div>

        <div className="flex gap-6">
          <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-4" />
            </div>
          </span>
          <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
            <Skeleton className="w-12 h-4" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex flex-col items-center justify-center space-y-4">
        <div className="w-full flex flex-col items-center justify-center">
          <CardStack
            items={Array.from({ length: 3 }).map((_, i) => ({
              id: i,
              name: <Skeleton className="w-24 h-4" />,
              designation: <Skeleton className="w-24 h-4" />,
              content: <Skeleton className="w-full h-4" />,
              votedUp: null,
            }))}
          />
          <div className="w-full p-6 gap-2 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Generating summary</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
