import { Progress } from '@radix-ui/react-progress'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { cn } from '@/lib/utils'

export function CategorizedFeedbackCard({
  className,
  categorizedFeedback
}: {
  className?: string
  categorizedFeedback: { category: string; positive: number; negative: number }[]
}) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <CardTitle>Categorized Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categorizedFeedback.map((category, index) => (
            <div key={index} className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{category.category}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-500 flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {category.positive}%
                </span>
                <span className="text-red-500 flex items-center">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  {category.negative}%
                </span>
              </div>
              <Progress value={category.positive} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
