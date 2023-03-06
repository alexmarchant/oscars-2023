import { create } from 'zustand'
import { client, UserSession } from '../trpc/client'

const TokenKey = 'am-oscar-2023-jwt-token'

export type LoginInput = Parameters<typeof client.login.mutate>[0]
export type SignupInput = Parameters<typeof client.signup.mutate>[0]

interface AuthStore {
  token: null | string
  session: UserSession | null
  login(input: LoginInput): Promise<void>
  signup(input: SignupInput): Promise<void>
  setTokenAndGetSession(token: string): Promise<void>
  getSession(): Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: localStorage.getItem(TokenKey),
  session: null,
  async login (input: LoginInput) {
    const token = await client.login.mutate(input)
    await get().setTokenAndGetSession(token)
  },
  async signup (input: SignupInput) {
    const token = await client.signup.mutate(input)
    await get().setTokenAndGetSession(token)
  },
  async setTokenAndGetSession(token: string) {
    localStorage.setItem(TokenKey, token)
    set({ token })
    await get().getSession()
  },
  async getSession() {
    try {
      const session = await client.session.query()
      set({ session })
    } catch (e) {
      console.log('failed to get sesion')
    }
  },
}))
