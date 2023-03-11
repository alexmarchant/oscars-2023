import { initTRPC, TRPCError } from '@trpc/server'
import {
  LoginSchema,
  SignupSchema,
  SetPickSchema,
  SetWinnerSchema,
  DeleteWinnerSchema,
} from '@am-oscar-2023/shared'
import type { Context } from './context'
import { createTokenForUser } from '../auth'
import * as bcrypt from 'bcrypt'
import { makeWinnerMap, userScore } from '../helpers'

export type AppRouter = typeof appRouter

const t = initTRPC.context<Context>().create()

export const appRouter = t.router({
  login: t.procedure
    .input((val: unknown) => {
      return LoginSchema.parse(val)
    })
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input
      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          email,
        },
      })
      const match = await bcrypt.compare(password, user.hashedPassword)
      if (!match) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Password is incorrect',
        })
      }
      return createTokenForUser(user)
    }),

  signup: t.procedure
    .input((val: unknown) => {
      return SignupSchema.parse(val)
    })
    .mutation(async ({ ctx, input }) => {
      const { email, username, password, passwordConfirmation } = input
      if (password !== passwordConfirmation) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Password and password confirmation do not match',
        })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await ctx.db.user.create({
        data: {
          email,
          username,
          hashedPassword,
        },
      })
      return createTokenForUser(user)
    }),
  
    session: t.procedure
      .query(({ ctx }) => {
        const { currentUser } = ctx
        if (!currentUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not logged in',
          })
        }
        return currentUser
      }),
    
    ballot: t.procedure
      .query(async ({ ctx }): Promise<Record<string, string>> => {
        const { currentUser } = ctx
        if (!currentUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not logged in',
          })
        }
        const picks = await ctx.db.pick.findMany({
          where: {
            userId: currentUser.id,
          },
        })

        return picks.reduce((acc, pick) => {
          acc[pick.category] = pick.nominee
          return acc
        }, {} as Record<string, string>)
      }),
  
    setPick: t.procedure
      .input((val: unknown) => {
        return SetPickSchema.parse(val)
      })
      .mutation(async ({ ctx, input }) => {
        const { currentUser } = ctx
        if (!currentUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not logged in',
          })
        }

        await ctx.db.pick.upsert({
          where: {
            userCategoryPick: {
              userId: currentUser.id,
              category: input.category,
            },
          },
          update: {
            nominee: input.nominee,
          },
          create: {
            userId: currentUser.id,
            category: input.category,
            nominee: input.nominee,
          },
        })
      }),

    winners: t.procedure
      .query(async ({ ctx }) => {
        const winners = await ctx.db.winner.findMany()
        return makeWinnerMap(winners)
      }),

    setWinner: t.procedure
      .input((val: unknown) => {
        return SetWinnerSchema.parse(val)
      })
      .mutation(async ({ ctx, input }) => {
        const { currentUser } = ctx
        if (!currentUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not logged in',
          })
        }
        if (!currentUser.admin) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not admin',
          })
        }

        await ctx.db.winner.upsert({
          where: {
            category: input.category,
          },
          update: {
            nominee: input.nominee,
          },
          create: {
            category: input.category,
            nominee: input.nominee,
          },
        })
      }),

    deleteWinner: t.procedure
      .input((val: unknown) => {
        return DeleteWinnerSchema.parse(val)
      })
      .mutation(async ({ ctx, input }) => {
        const { currentUser } = ctx
        if (!currentUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not logged in',
          })
        }
        if (!currentUser.admin) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not admin',
          })
        }

        await ctx.db.winner.delete({
          where: {
            category: input.category,
          },
        })
      }),

    leaderboard: t.procedure
      .query(async ({ ctx, input }) => {
        const { currentUser } = ctx
        if (!currentUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Not logged in',
          })
        }

        const [users, winners] = await Promise.all([
          ctx.db.user.findMany({ include: { picks: true } }),
          ctx.db.winner.findMany(),
        ])

        const winnerMap = makeWinnerMap(winners)

        return users.reduce((acc, user) => {
          acc[user.username] = userScore(user, winnerMap)
          return acc
        }, {} as Record<string, number>)
      }),
})
