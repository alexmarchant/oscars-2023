import { create } from 'zustand'
import { client } from '../trpc/client'

export interface MetaStore {
  locked: boolean
  getLocked(): Promise<boolean>
}

export const useMetaStore = create<MetaStore>((set, get) => ({
  locked: false,
  loading: false,
  async getLocked() {
    const locked = await client.locked.query()
    set({ locked })
    return locked
  },
}))
