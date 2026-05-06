import { defineStore } from 'pinia'
import { mockRankingEntries } from '@/mock'
import type { RankingEntry, RankingType } from '@/types'

export const useRankingStore = defineStore('ranking', {
  state: () => ({
    entries: [...mockRankingEntries],
    activeType: 'battlePower' as RankingType,
    loading: false,
  }),

  actions: {
    async fetchRanking(type: RankingType) {
      this.loading = true
      this.activeType = type
      await new Promise((r) => setTimeout(r, 300))
      this.entries = [...mockRankingEntries]
      this.loading = false
    },
    setActiveType(type: RankingType) {
      this.activeType = type
    },
  },
})
