import { SteamSummarize } from '@/components/steam-summarize'
import { AboutSection } from '@/components/about-section'
import Footer from '@/components/footer'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q: string
  }>
}) {
  const query = (await searchParams).q || ''

  return (
    <>
      <SteamSummarize query={query} />
      <AboutSection />
      <Footer />
    </>
  )
}
