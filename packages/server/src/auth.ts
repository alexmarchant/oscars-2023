import * as jwt from 'jsonwebtoken'
import type { User } from '@prisma/client'

export type UserSession = Omit<User, 'hashedPassword'>

export function createTokenForUser(user: User) {
  const session: UserSession = {
    id: user.id,
    email: user.email,
    username: user.username,
    admin: user.admin,
    paid: user.paid,
  }
  const privateKey = getPrivateKey()
  return jwt.sign(session, privateKey)
}

export function verifyAndDecodeToken(token: string) {
  const privateKey = getPrivateKey()
  return jwt.verify(token, privateKey) as jwt.JwtPayload & UserSession
}

function getPrivateKey() {
  const key = process.env.JWT_PRIVATE_KEY
  if (!key) throw new Error('No JWT_PRIVATE_KEY found')
  return key
}