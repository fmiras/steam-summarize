'use client'
import { GameCard } from './game-card'
import { ReviewSummariesCard } from './review-summaries-card'
import { CategorizedFeedbackCard } from './categorized-feedback-card'
import { RecentReviewsCard } from './recent-reviews-card'

const mockData = {
  gameTitle: 'Cyberpunk 2077',
  totalReviews: 1234567,
  positivePercentage: 76,
  summaries: {
    positive:
      'Players praise the immersive open world, compelling storyline, and stunning visual aesthetics.',
    mixed:
      "Some users appreciate the game's ambition but note inconsistent performance across different hardware.",
    negative:
      'Critics point out frequent technical issues, unmet expectations, and lack of promised features at launch.'
  },
  keyPainPoints: [
    'Frequent crashes and bugs',
    'Poor performance on older hardware',
    'Limited character customization options',
    'Lack of promised features at launch'
  ],
  categorizedFeedback: [
    { category: 'Graphics', positive: 85, negative: 15 },
    { category: 'Gameplay', positive: 70, negative: 30 },
    { category: 'Story', positive: 90, negative: 10 },
    { category: 'Performance', positive: 40, negative: 60 },
    { category: 'Value', positive: 65, negative: 35 }
  ],
  recentReviews: [
    {
      user: 'CyberFan2077',
      content: 'Amazing story and visuals, but still encountering bugs after patches.',
      sentiment: 'Mixed'
    },
    {
      user: 'NightCityDreamer',
      content: 'The world is breathtaking, but the AI needs improvement.',
      sentiment: 'Positive'
    },
    {
      user: 'V_Disappointed',
      content: 'Not living up to the hype. Too many technical issues.',
      sentiment: 'Negative'
    }
  ],
  metadata: {
    imageUrl: '/placeholder.svg?height=300&width=200',
    publisher: 'CD Projekt',
    developer: 'CD Projekt Red',
    publisherUrl: 'https://www.cdprojekt.com/',
    developerUrl: 'https://www.cdprojektred.com/',
    steamStoreUrl: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'
  }
}

export function ReviewAnalysis() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        <GameCard
          className="col-span-1"
          title={mockData.gameTitle}
          totalReviews={mockData.totalReviews}
          positivePercentage={mockData.positivePercentage}
          imageUrl={mockData.metadata.imageUrl}
          publisher={mockData.metadata.publisher}
          developer={mockData.metadata.developer}
          publisherUrl={mockData.metadata.publisherUrl}
          developerUrl={mockData.metadata.developerUrl}
          steamStoreUrl={mockData.metadata.steamStoreUrl}
        />

        <ReviewSummariesCard
          className="col-span-2"
          summaries={mockData.summaries}
          keyPainPoints={mockData.keyPainPoints}
        />

        <CategorizedFeedbackCard
          className="col-span-2"
          categorizedFeedback={mockData.categorizedFeedback}
        />

        <RecentReviewsCard
          className="col-span-1"
          recentReviews={mockData.recentReviews}
          steamStoreUrl={mockData.metadata.steamStoreUrl}
        />
      </div>
    </div>
  )
}
