import { z } from 'zod'

export const SignupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(5),
  passwordConfirmation: z.string().min(5),
})