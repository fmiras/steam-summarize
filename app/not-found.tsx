import { Search, ComputerIcon as SteamIcon } from 'lucide-react'

import { AboutSection } from '@/components/about-section'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { search } from './actions'
import ErrorGameCard from '@/components/game-card/error-game-card'

const exampleQueries = [
  { name: 'Cyberpunk 2077' },
  { name: 'God of War' },
  { name: 'Elden Ring' },
  { name: 'The Last of Us' },
  { name: 'Red Dead Redemption 2' },
]

export default async function NotFound() {
  return (
    <>
      <div className="container space-y-8 max-w-4xl min-h-screen flex flex-col pt-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-secondary">
            <SteamIcon className="w-5 h-5 mr-2 text-primary animate-pulse" />
            <h2 className="text-sm font-medium text-primary [&]:m-0">Powered by Steam + AI</h2>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            Discover What Players Really Think
          </h1>
          <div className="flex justify-center">
            <h2 className="text-muted-foreground text-lg max-w-xl [&]:m-0">
              Get instant, AI-generated insights from thousands of Steam reviews. Find out if a game
              is worth your time.
            </h2>
          </div>
        </header>

        <section aria-label="Search" className="max-w-2xl mx-auto flex flex-col gap-8">
          <h2 className="sr-only">Search for a game</h2>
          <div className="space-y-4">
            <form action={search}>
              <div className="relative">
                <Input
                  type="text"
                  name="query"
                  placeholder="Search any game on Steam..."
                  className="w-full text-lg py-6 pr-24 bg-card/50 border-border/50 rounded-lg
                    focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300
                    text-foreground placeholder-muted-foreground backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 
                    bg-primary/20 hover:bg-primary/30 text-primary hover:text-primary 
                    border border-primary/50 hover:border-primary
                    hover:shadow-[0_0_15px_rgba(0,255,150,0.3)]
                    transition-all duration-300 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center px-3">
                    <Search className="h-4 w-4 mr-2" />
                    <span className="font-medium hidden sm:inline">Search</span>
                  </div>
                </Button>
              </div>
            </form>
            <div className="flex flex-wrap gap-2 w-full justify-center">
              {exampleQueries.map((game) => (
                <form key={game.name} action={search} className="contents">
                  <input type="hidden" name="query" value={game.name} />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="text-sm bg-secondary/20 hover:bg-primary/10 
                      text-primary hover:text-primary
                      border border-primary/20 hover:border-primary/50
                      hover:shadow-[0_0_10px_rgba(0,255,150,0.2)]
                      transition-all duration-300"
                  >
                    {game.name}
                  </Button>
                </form>
              ))}
            </div>
          </div>
          <ErrorGameCard />
        </section>
      </div>

      <AboutSection />
      <Footer />
    </>
  )
}
