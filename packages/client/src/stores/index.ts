import { useAuthStore } from './auth'

declare global {
  interface Window {
    useAuthStore: typeof useAuthStore
  }
}

window.useAuthStore = useAuthStore