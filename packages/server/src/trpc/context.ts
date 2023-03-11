import type { Request } from 'express'
import { CreateExpressContextOptions} from '@trpc/server/adapters/express'
import { client } from '../database/client'
import { verifyAndDecodeToken, UserSession } from '../auth'

export interface Context {
  db: typeof client
  currentUser?: UserSession
}

export function createContext({ req, res }: CreateExpressContextOptions): Context {
  return {
    db: client,
    currentUser: getCurrentUser(req),
  }
}

function getCurrentUser(req: Request): UserSession | undefined {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    // console.log('No auth header')
    return
  }

  const token = authorizationHeader.split(' ')[1]
  if (!token) {
    // console.log('No token')
    return
  }

  try {
    const payload = verifyAndDecodeToken(token)
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      admin: payload.admin,
      paid: payload.paid,
    }
  } catch (e) {
    console.error(e)
    return
  }
}

