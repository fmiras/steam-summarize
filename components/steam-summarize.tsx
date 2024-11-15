'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Search, Loader2, AlertCircle, ComputerIcon as SteamIcon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motion, AnimatePresence } from 'framer-motion'

export function SteamSummarize() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit: handleCompletionSubmit,
  } = useCompletion({
    api: '/api/summarize',
  })

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!input.trim()) {
      setError('Please enter a valid game title or Steam App ID')
      return
    }

    setIsLoading(true)
    try {
      await handleCompletionSubmit(e)
    } catch (err) {
      setError(`There was an error getting the game summary. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQueries = [
    { name: 'Elden Ring', id: '1245620' },
    { name: "Baldur's Gate 3", id: '1086940' },
    { name: 'Stardew Valley', id: '413150' },
    { name: 'Hades', id: '1145360' },
  ]

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-[100vh] flex flex-col justify-center">
      <div className="space-y-6">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-muted">
            <SteamIcon className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Powered by Steam + AI</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Discover What Players Really Think</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get instant, AI-generated insights from thousands of Steam reviews. Find out if a game
            is worth your time.
          </p>
        </header>

        <form onSubmit={handleSearch}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search any game on Steam..."
              value={input}
              onChange={handleInputChange}
              className="w-full text-lg py-6 pr-24"
            />
            <Button
              type="submit"
              size="lg"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Search
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((game) => (
                <Button
                  key={game.id}
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                  onClick={(e) => {
                    handleInputChange({ target: { value: game.name } } as any)
                    handleSearch(e)
                  }}
                >
                  {game.name}
                </Button>
              ))}
            </div>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="py-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Analyzing player reviews...</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {completion && !isLoading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-lg">
                    <AvatarImage
                      src={`https://steamcdn-a.akamaihd.net/steam/apps/${input}/header.jpg`}
                      className="object-cover"
                      alt={input}
                    />
                    <AvatarFallback className="rounded-lg">
                      <SteamIcon className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{input}</CardTitle>
                    <CardDescription>Community Review Summary</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">{completion}</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Summary generated using AI. Results may vary.
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {!isLoading && !completion && !error && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <Card className="border-dashed">
                <CardContent className="py-12 space-y-4">
                  <div className="bg-muted mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                    <SteamIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Start Your Search</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Type a game name above or try one of our suggestions to see what the Steam
                      community thinks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
