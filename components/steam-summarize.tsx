'use client'

import { useState, Suspense } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { Search, Loader2, AlertCircle, ComputerIcon as SteamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { reviewSchema } from '@/app/api/summarize/schema'

function SteamSummarize() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [input, setInput] = useState(initialQuery)
  const { object, isLoading, submit } = useObject({
    api: '/api/summarize',
    schema: reviewSchema,
  })

  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!input?.trim()) {
      setError('Please enter a valid game title or Steam App ID')
      return
    }

    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(input.trim())}`
    router.push(newUrl)

    try {
      await submit({ prompt: input.trim() })
    } catch (err) {
      console.error(err)
      setError(`There was an error getting the game summary. Please try again.`)
    }
  }

  const exampleQueries = [
    { name: 'Cyberpunk 2077' },
    { name: 'God of War' },
    { name: 'Elden Ring' },
    { name: 'The Last of Us' },
    { name: 'Red Dead Redemption 2' },
  ]

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
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center px-3">
                    <Search className="h-4 w-4 mr-2" />
                    <span className="font-medium hidden sm:inline">Search</span>
                  </div>
                )}
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
                    onClick={() => {
                      handleInputChange({
                        target: { value: game.name },
                      } as React.ChangeEvent<HTMLInputElement>)
                      const syntheticEvent = {
                        preventDefault: () => {},
                      } as React.FormEvent
                      handleSearch(syntheticEvent)
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
            {error && (
              <motion.section
                aria-label="Error"
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="sr-only">Error Message</h2>
                <Alert
                  variant="destructive"
                  className="bg-destructive/10 border border-destructive"
                >
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.section>
            )}

            {isLoading && (
              <motion.section
                aria-label="Loading"
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="sr-only">Loading Status</h2>
                <Card className="bg-card border border-border shadow-neon">
                  <CardContent className="py-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-muted-foreground">Analyzing player reviews...</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {object && !isLoading && (
              <motion.section
                aria-label="Game Summary"
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-card border border-border shadow-neon hover:border-primary transition-all duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-md">
                      <AvatarImage
                        src={`https://steamcdn-a.akamaihd.net/steam/apps/${input}/header.jpg`}
                        className="object-cover"
                        alt={input}
                      />
                      <AvatarFallback className="rounded-md bg-muted">
                        <SteamIcon className="h-8 w-8 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl text-foreground [&]:m-0">{input}</h2>
                      <h3 className="text-primary [&]:m-0">Community Review Summary</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-7 mb-4">{object.summary?.overall}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary">Pros:</h4>
                        <ul className="list-disc pl-5">
                          {object.summary?.pros?.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Cons:</h4>
                        <ul className="list-disc pl-5">
                          {object.summary?.cons?.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Recommendation:</h4>
                        <p>{object.summary?.recommendation}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground text-end w-full">
                      Summary generated using AI. Results may vary.
                    </p>
                  </CardFooter>
                </Card>
              </motion.section>
            )}

            {!isLoading && !object && !error && (
              <motion.section
                aria-label="Welcome"
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-card border border-dashed border-border shadow-neon">
                  <CardContent className="py-14 flex flex-col items-center text-center">
                    <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <SteamIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      Start Your Search
                    </h2>
                    <h3 className="text-muted-foreground max-w-md">
                      Type a game name above or try one of our suggestions to see what the Steam
                      community thinks.
                    </h3>
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function SteamSummarizeWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SteamSummarize />
    </Suspense>
  )
}

export { SteamSummarizeWrapper as SteamSummarize }
