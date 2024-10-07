import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { cn } from '@/lib/utils'

export function RecentReviewsCard({
  className,
  recentReviews,
  steamStoreUrl
}: {
  className?: string
  recentReviews: { user: string; content: string; sentiment: string }[]
  steamStoreUrl: string
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {recentReviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{review.user}</span>
              <span
                className={`text-sm ${
                  review.sentiment === 'Positive'
                    ? 'text-green-500'
                    : review.sentiment === 'Negative'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {review.sentiment}
              </span>
            </div>
            <p className="text-sm">{review.content}</p>
          </div>
        ))}
        <div className="mt-4 text-center">
          <a
            href={`${steamStoreUrl}#app_reviews_hash`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center justify-center"
          >
            View all reviews on Steam <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
