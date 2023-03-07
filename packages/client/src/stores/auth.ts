import { create } from 'zustand'
import { client, UserSession } from '../trpc/client'
import { isTRPCClientError } from '../trpc/client'

const TokenKey = 'am-oscar-2023-jwt-token'

export type LoginInput = Parameters<typeof client.login.mutate>[0]
export type SignupInput = Parameters<typeof client.signup.mutate>[0]

interface AuthStore {
  token: null | string
  session: UserSession | null
  error: string | null
  loading: boolean
  login(input: LoginInput): Promise<void>
  logout(): void
  signup(input: SignupInput): Promise<void>
  setTokenAndGetSession(token: string): Promise<void>
  getSession(): Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: localStorage.getItem(TokenKey),
  session: null,
  error: null,
  loading: false,
  async login (input: LoginInput) {
    set({ error: null })
    try {
      const token = await client.login.mutate(input)
      await get().setTokenAndGetSession(token)
    } catch (e) {
      if (isTRPCClientError(e) && e.data?.code === 'BAD_REQUEST') {
        set({ error: 'Sorry, your password was incorrect. Please double-check your password.' })
      } else {
        console.error(e)
        set({ error: 'Sorry, something went wrong. Try again or contact us.' })
      }
    }
  },
  logout () {
    localStorage.removeItem(TokenKey)
    set({
      session: null,
      token: null,
    })
  },
  async signup (input: SignupInput) {
    set({ error: null })
    const token = await client.signup.mutate(input)
    await get().setTokenAndGetSession(token)
  },
  async setTokenAndGetSession(token: string) {
    localStorage.setItem(TokenKey, token)
    set({ token })
    await get().getSession()
  },
  async getSession() {
    const token = get().token
    if (!token) return

    set({ loading: true })
    try {
      const session = await client.session.query()
      set({ session, loading: false })
    } catch (e) {
      console.log('failed to get sesion')
    }
  },
}))

useAuthStore.getState().getSession()
