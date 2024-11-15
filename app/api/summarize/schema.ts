import { z } from 'zod'

export const reviewSchema = z.object({
  summary: z.object({
    overall: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    recommendation: z.string(),
  }),
})
