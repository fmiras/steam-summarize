'use client'

import { useState } from 'react'
import { Search, Loader2, AlertCircle, ComputerIcon as SteamIcon, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

export function SteamReviewAi() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return
    setQuery(searchQuery)
    setIsLoading(true)
    setResult(null)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setResult({
      title: searchQuery,
      summary: `This is an AI-generated summary for ${searchQuery}. The game has received mixed reviews from players. Many praise its innovative gameplay mechanics and stunning visuals, while others have reported performance issues and bugs. Overall, it seems to be a polarizing title that appeals to fans of the genre but may not be for everyone.`
    })
    setIsLoading(false)
  }

  const exampleQueries = [
    "Elden Ring",
    "Stardew Valley",
    "Cyberpunk 2077",
    "Hades"
  ]

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <SteamIcon className="mr-2" />
          Steam Review AI
        </h1>
        <p className="text-muted-foreground">Get AI-generated summaries of Steam game reviews</p>
      </header>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Beta Version</AlertTitle>
        <AlertDescription>
          This tool is in beta and supports English reviews only. It uses Generative AI (GPT + Steam API).
        </AlertDescription>
      </Alert>

      <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter game title or Steam App ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            Search
          </Button>
        </div>
      </form>

      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((eq) => (
            <Button key={eq} variant="outline" size="sm" onClick={() => handleSearch(eq)}>
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

        {result && !isLoading && (
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
                  <AvatarImage src={`https://steamcdn-a.akamaihd.net/steam/apps/${query}/header.jpg`} alt={result.title} />
                  <AvatarFallback><SteamIcon className="h-8 w-8" /></AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{result.title}</CardTitle>
                  <CardDescription>AI-Generated Review Summary</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-7">{result.summary}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  This summary is generated by AI and may not reflect all opinions accurately.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {!isLoading && !result && (
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
                <h2 className="text-2xl font-semibold mb-2">Welcome to Steam Review AI</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  Enter a game title or Steam App ID above to get an AI-generated summary of player reviews.
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