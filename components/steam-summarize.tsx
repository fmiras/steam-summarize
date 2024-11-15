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

  const exampleQueries = ['Elden Ring', 'Stardew Valley', 'Cyberpunk 2077', 'Hades']

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <SteamIcon className="mr-2" />
          Steam Summarize
        </h1>
        <p className="text-muted-foreground">Get AI-generated summaries of Steam game reviews</p>
      </header>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Beta Version</AlertTitle>
        <AlertDescription>
          This tool is in beta and supports English reviews only. It uses Generative AI (GPT + Steam
          API).
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter game title or Steam App ID"
            value={input}
            onChange={handleInputChange}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>
      </form>

      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((eq) => (
            <Button
              key={eq}
              variant="outline"
              size="sm"
              onClick={(e) => {
                handleInputChange({ target: { value: eq } } as any)
                handleSearch(e)
              }}
            >
              {eq}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-4">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="text-lg font-medium">Generating summary...</p>
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
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={`https://steamcdn-a.akamaihd.net/steam/apps/${input}/header.jpg`}
                    // image looks better when it's cropped
                    className="object-cover"
                    alt={input}
                  />
                  <AvatarFallback>
                    <SteamIcon className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{input}</CardTitle>
                  <CardDescription>AI-Generated Review Summary</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-7">{completion}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  This summary is generated by AI and may not reflect all opinions accurately.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {!isLoading && !completion && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full">
              <CardContent className="pt-6 text-center">
                <SteamIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">Welcome to Steam Summarize</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  Enter a game title or Steam App ID above to get an AI-generated summary of player
                  reviews.
                </p>
                <Button variant="outline" onClick={() => document.querySelector('input').focus()}>
                  Start Searching <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
