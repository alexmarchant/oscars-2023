import { create } from 'zustand'

const TokenKey = 'am-oscar-2023-jwt-token'

interface AuthStore {
  token: null | string
  setToken(token: string): void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem(TokenKey),
  setToken(token: string) {
    localStorage.setItem(TokenKey, token)
    set({ token })
  },
}));

(window as any).useAuthStore = useAuthStore