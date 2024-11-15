'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Search, Loader2, AlertCircle, ComputerIcon as SteamIcon } from 'lucide-react'
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
import { Alert, AlertDescription } from '@/components/ui/alert'
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
      console.error(err)
      setError(`There was an error getting the game summary. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQueries = [
    { name: 'Cyberpunk 2077', id: '1091500' },
    { name: 'Deus Ex: Mankind Divided', id: '337000' },
    { name: 'Ghostrunner', id: '1139900' },
    { name: 'Shadowrun Returns', id: '234650' },
  ]

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-screen flex flex-col justify-center">
      <div className="space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-secondary">
            <SteamIcon className="w-5 h-5 mr-2 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Powered by Steam + AI</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-primary">
            Discover What Players Really Think
          </h1>
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
                  <span className="font-medium">Search</span>
                </div>
              )}
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((game) => (
                <Button
                  key={game.id}
                  variant="ghost"
                  size="sm"
                  className="text-sm bg-secondary/20 hover:bg-primary/10 
                    text-primary hover:text-primary
                    border border-primary/20 hover:border-primary/50
                    hover:shadow-[0_0_10px_rgba(0,255,150,0.2)]
                    transition-all duration-300"
                  onClick={(e) => {
                    const event = {
                      target: { value: game.name },
                    } as React.ChangeEvent<HTMLInputElement>
                    handleInputChange(event)
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
              <Alert variant="destructive" className="bg-destructive/10 border border-destructive">
                <AlertCircle className="h-5 w-5 text-destructive" />
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
              <Card className="bg-card border border-border shadow-neon">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
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
                    <CardTitle className="text-2xl text-foreground">{input}</CardTitle>
                    <CardDescription className="text-primary">
                      Community Review Summary
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="prose prose-invert">
                  <p className="leading-7">{completion}</p>
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
            >
              <Card className="bg-card border border-dashed border-border shadow-neon">
                <CardContent className="py-14 space-y-6 text-center">
                  <div className="bg-muted mx-auto w-20 h-20 rounded-full flex items-center justify-center">
                    <SteamIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground">Start Your Search</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
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
