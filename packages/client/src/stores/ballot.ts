import { create } from 'zustand'
import { client } from '../trpc/client'

type Ballot = Record<string, string>

export interface BallotStore {
  ballot: Ballot
  loading: boolean
  getBallot: () => void
  setPick: (category: string, nominee: string) => void
}

export const useBallotStore = create<BallotStore>((set, get) => ({
  ballot: {},
  loading: false,
  async getBallot() {
    set({ loading: true })
    const ballot = await client.ballot.query()
    set({
      loading: false,
      ballot,
    })
  },
  async setPick(category: string, nominee: string) {
    const ballot = get().ballot
    set({ ballot: {
      ...ballot,
      [category]: nominee },
    })
    await client.setPick.mutate({
      category,
      nominee,
    })
  },
}))

useBallotStore.getState().getBallot()
