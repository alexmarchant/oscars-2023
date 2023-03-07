import { z } from 'zod'

export const SetPickSchema = z.object({
  category: z.string(),
  nominee: z.string(),
})