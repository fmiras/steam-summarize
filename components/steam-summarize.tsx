'use client'
import { useState, Suspense, useCallback } from 'react'
import { Search, ComputerIcon as SteamIcon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import SearchResult from './search-result'

interface SteamSummarizeProps {
  query?: string
}

const exampleQueries = [
  { name: 'Cyberpunk 2077' },
  { name: 'God of War' },
  { name: 'Elden Ring' },
  { name: 'The Last of Us' },
  { name: 'Red Dead Redemption 2' },
]

// const CARDS = [
//   {
//     id: 0,
//     name: 'Manu Arora',
//     designation: 'Senior Software Engineer',
//     content: (
//       <p>
//         These cards are amazing, I want to use them in my project. Framer motion is a godsend ngl
//         tbh fam 🙏
//       </p>
//     ),
//   },
//   {
//     id: 1,
//     name: 'Elon Musk',
//     designation: 'Senior Shitposter',
//     content: (
//       <p>
//         I dont like this Twitter thing, deleting it right away because yolo. Instead, I would like
//         to call it X.com so that it can easily be confused with adult sites.
//       </p>
//     ),
//   },
//   {
//     id: 2,
//     name: 'Tyler Durden',
//     designation: 'Manager Project Mayhem',
//     content: (
//       <p>
//         The first rule of Fight Club is that you do not talk about fight club. The second rule of
//         Fight club is that you DO NOT TALK about fight club.
//       </p>
//     ),
//   },
// ]

function SteamSummarize({ query = '' }: SteamSummarizeProps) {
  const router = useRouter()
  const [input, setInput] = useState(query)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const search = useCallback(
    (newQuery: string) => {
      setInput(newQuery.trim())
      router.push(`?q=${encodeURIComponent(newQuery.trim())}`)
    },
    [router]
  )

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      search(input.trim())
    },
    [input, search]
  )

  return (
    <div className="container mx-auto p-6 max-w-4xl min-h-screen flex flex-col justify-center">
      <div className="space-y-8">
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

        <section aria-label="Search" className="max-w-2xl mx-auto">
          <h2 className="sr-only">Search for a game</h2>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search any game on Steam..."
                value={input}
                onChange={handleInputChange}
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
            <div className="mt-4 flex items-center gap-3">
              <div className="flex flex-wrap gap-2 w-full justify-center">
                {exampleQueries.map((game) => (
                  <Button
                    key={game.name}
                    variant="ghost"
                    size="sm"
                    className="text-sm bg-secondary/20 hover:bg-primary/10 
                      text-primary hover:text-primary
                      border border-primary/20 hover:border-primary/50
                      hover:shadow-[0_0_10px_rgba(0,255,150,0.2)]
                      transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      search(game.name)
                    }}
                  >
                    {game.name}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </section>

        <div className="min-h-[400px] max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <SearchResult query={query} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function SteamSummarizeWrapper(props: SteamSummarizeProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SteamSummarize {...props} />
    </Suspense>
  )
}

export { SteamSummarizeWrapper as SteamSummarize }
