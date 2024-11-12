'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export function LandingForm() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit: handleCompletionSubmit,
  } = useCompletion({
    api: '/api/summarize',
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!input.trim()) {
      setError('Please enter a valid Steam game ID')
      return
    }

    setIsLoading(true)
    try {
      handleCompletionSubmit(e)
    } catch (err) {
      setError(`Failed to get game summary: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Steam AI</h1>
          <p className="text-gray-300">
            Enter a Steam Game ID to get a summary of its latest 200 reviews
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label hidden htmlFor="gameId" className="text-white">
              Steam Game ID
            </Label>
            <Input
              id="gameId"
              placeholder="Enter Steam game ID (e.g., 570 for Dota 2)"
              value={input}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
            />
            {error && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Summarizing...' : 'Get Summary'}
          </Button>
        </form>

        {completion && <div className="mt-4">{completion}</div>}
      </div>
    </div>
  )
}
