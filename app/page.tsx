import { SteamSummarize } from '@/components/steam-summarize'
import Script from 'next/script'

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Steam Summarize',
    applicationCategory: 'GameReviewTool',
    description:
      'AI-powered tool that analyzes and summarizes Steam game reviews to help players make informed gaming decisions.',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI-powered review analysis',
      'Instant review summaries',
      'Steam game integration',
      'Player sentiment analysis',
      'Real-time review processing',
    ],
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SteamSummarize />
    </>
  )
}
