'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

let interval: NodeJS.Timeout

type Card = {
  id: number
  name: React.ReactNode
  designation: React.ReactNode
  content: React.ReactNode
  votedUp: boolean | null
}

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[]
  offset?: number
  scaleFactor?: number
}) => {
  const CARD_OFFSET = offset || 10
  const SCALE_FACTOR = scaleFactor || 0.06
  const [cards, setCards] = useState<Card[]>(items)

  useEffect(() => {
    setCards(items)
  }, [items])

  useEffect(() => {
    startFlipping()
    return () => clearInterval(interval)
  }, [])

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]
        newArray.unshift(newArray.pop()!)
        return newArray
      })
    }, 5000)
  }

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-60 w-60 md:h-60 md:w-96 rounded-xl p-4 flex flex-col justify-between
              bg-card border border-primary/20 hover:border-primary/30
              shadow-lg hover:shadow-primary/20
              transition-all duration-300
              overflow-hidden"
            style={{
              transformOrigin: 'top center',
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            {card.votedUp !== null && (
              <Badge
                variant={card.votedUp ? 'default' : 'destructive'}
                className="absolute bottom-4 right-4"
              >
                {card.votedUp ? 'Positive' : 'Negative'}
              </Badge>
            )}

            <div className="font-normal text-muted-foreground">{card.content}</div>
            <div className="space-y-1 flex flex-col gap-2">
              <span className="font-medium text-primary">{card.name}</span>
              <span className="font-normal text-muted-foreground text-sm">{card.designation}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
