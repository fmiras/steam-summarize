import { z } from 'zod'

export const summarySchema = z.object({
  overall: z.string(),
  pros: z.array(z.object({ content: z.string(), weight: z.number() })),
  cons: z.array(z.object({ content: z.string(), weight: z.number() })),
  recommendation: z.string(),
})
