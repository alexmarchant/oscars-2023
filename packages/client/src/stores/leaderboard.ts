import { create } from 'zustand'
import { client } from '../trpc/client'

type Leaderboard = Record<string, number>

export interface LeaderboardStore {
  leaderboard: Leaderboard
  loading: boolean
  getLeaderboard: () => Promise<Leaderboard | undefined>
}

export const useLeaderboardStore = create<LeaderboardStore>((set, get) => ({
  leaderboard: {},
  loading: false,
  async getLeaderboard() {
    set({ loading: true })
    const leaderboard = await client.leaderboard.query()
    set({ loading: false, leaderboard })
    return leaderboard
  },
}))
