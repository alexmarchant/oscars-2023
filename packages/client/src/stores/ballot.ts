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
    try {
      const ballot = await client.ballot.query()
      set({ loading: false, ballot })
    } catch(e) {
      alert('Sorry, error loading your picks :( Maybe refresh and try again')
      console.error(e)
    }
  },
  async setPick(category: string, nominee: string) {
    const ballot = get().ballot
    set({ ballot: {
      ...ballot,
      [category]: nominee },
    })
    try {
      await client.setPick.mutate({ category, nominee })
    } catch(e) {
      set({ ballot })
      alert('Sorry, error saving your pick :( Maybe refresh and try again')
      console.error(e)
    }
  },
}))

useBallotStore.getState().getBallot()
