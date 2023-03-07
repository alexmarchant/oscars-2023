import { useAuthStore } from './auth'
import { useBallotStore } from './ballot'

declare global {
  interface Window {
    useAuthStore: typeof useAuthStore
    useBallotStore: typeof useBallotStore
  }
}

window.useAuthStore = useAuthStore
window.useBallotStore = useBallotStore