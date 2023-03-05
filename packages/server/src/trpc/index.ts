import { initTRPC } from '@trpc/server'
import { Context, createContext } from './context'

export { createContext }

export type AppRouter = typeof appRouter

const t = initTRPC.context<Context>().create()

const publicProcedure = t.procedure
const router = t.router

export const appRouter = router({
  greet: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query(({ input }) => ({ greeting: `hello, ${input}!` })),
})
