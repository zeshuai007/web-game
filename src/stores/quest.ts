import { defineStore } from 'pinia'
import { mockQuests } from '@/mock'
import type { Quest, QuestType } from '@/types'

export const useQuestStore = defineStore('quest', {
  state: () => ({
    quests: [...mockQuests],
    activeTab: 'all' as QuestType | 'all',
    loading: false,
  }),

  getters: {
    filteredQuests(): Quest[] {
      if (this.activeTab === 'all') return this.quests
      return this.quests.filter((q) => q.type === this.activeTab)
    },
  },

  actions: {
    async fetchQuests() {
      this.loading = true
      this.quests = [...mockQuests]
      this.loading = false
    },
    async acceptQuest(questId: string) {
      const idx = this.quests.findIndex((q) => q.id === questId)
      if (idx !== -1) {
        this.quests[idx].status = 'active'
      }
    },
    async claimQuest(questId: string) {
      const idx = this.quests.findIndex((q) => q.id === questId)
      if (idx !== -1) {
        this.quests[idx].status = 'completed'
      }
    },
    setActiveTab(tab: QuestType | 'all') {
      this.activeTab = tab
    },
  },
})
