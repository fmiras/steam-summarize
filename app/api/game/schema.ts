import { z } from 'zod'

export const gameSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type Game = z.infer<typeof gameSchema>
