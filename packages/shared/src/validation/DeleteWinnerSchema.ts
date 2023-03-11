import { z } from 'zod'

export const DeleteWinnerSchema = z.object({
  category: z.string(),
})