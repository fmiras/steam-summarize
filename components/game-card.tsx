import { Progress } from '@radix-ui/react-progress'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { cn } from '@/lib/utils'

export function GameCard({
  className,
  title,
  totalReviews,
  positivePercentage,
  publisher,
  developer,
  publisherUrl,
  developerUrl,
  steamStoreUrl,
  imageUrl
}: {
  className?: string
  title: string
  totalReviews: number
  positivePercentage: number
  publisher: string
  developer: string
  publisherUrl: string
  developerUrl: string
  steamStoreUrl: string
  imageUrl: string
}) {
  return (
    <Card className={cn(className, 'flex flex-col')}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <Progress value={positivePercentage} className="w-full mb-2" />
          {totalReviews.toLocaleString()} total reviews | {positivePercentage}% Positive
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={imageUrl} alt={title} width={200} height={200} className="w-full h-auto mb-4" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Publisher:</span>
            <a
              href={publisherUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center"
            >
              {publisher} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          <div className="flex justify-between">
            <span>Developer:</span>
            <a
              href={developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center"
            >
              {developer} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          <div className="flex justify-between">
            <span>Steam Store:</span>
            <a
              href={steamStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center"
            >
              View <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
