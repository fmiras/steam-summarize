import { SteamSummarize } from '@/components/steam-summarize'
import { AboutSection } from '@/components/about-section'
import Script from 'next/script'
import Footer from '@/components/footer'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q: string
  }>
}) {
  const query = (await searchParams).q || ''

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Steam Summarize',
    applicationCategory: 'GameReviewTool',
    description:
      'AI-powered tool that analyzes and summarizes Steam reviews to help players make informed gaming decisions.',
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
      <SteamSummarize query={query} />
      <AboutSection />
      <Footer />
    </>
  )
}
