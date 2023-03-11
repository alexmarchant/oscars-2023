import { create } from 'zustand'
import { client } from '../trpc/client'

type Winners = Record<string, string>

export interface WinnersStore {
  winners: Winners
  loading: boolean
  getWinners: () => Promise<Winners | undefined>
  setWinner: (category: string, nominee: string) => Promise<void>
  deleteWinner: (category: string) => Promise<void>
}

export const useWinnersStore = create<WinnersStore>((set, get) => ({
  winners: {},
  loading: false,
  async getWinners() {
    set({ loading: true })
    try {
      const winners = await client.winners.query()
      set({ loading: false, winners })
      return winners
    } catch(e) {
      alert('Sorry, error loading the winning the winning :( Maybe refresh and try again')
      console.error(e)
    }
  },
  async setWinner(category: string, nominee: string) {
    const winners = get().winners
    set({ winners: {
      ...winners,
      [category]: nominee },
    })
    try {
      await client.setWinner.mutate({ category, nominee })
    } catch(e) {
      set({ winners })
      alert('Error saving winner')
      console.error(e)
    }
  },
  async deleteWinner(category: string) {
    const winners = get().winners
    const winnersClone = Object.assign({}, winners)
    delete winnersClone[category]

    set({ winners: winnersClone })
    try {
      await client.deleteWinner.mutate({ category })
    } catch(e) {
      set({ winners })
      alert('Error deleting winner')
      console.error(e)
    }
  },
}))
