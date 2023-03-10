import { z } from 'zod'

export const SetWinnerSchema = z.object({
  category: z.string(),
  nominee: z.string(),
})