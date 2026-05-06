import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockSettings } from '@/mock'
import type { SystemSettings } from '@/types'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: { ...mockSettings } as SystemSettings,
  }),

  actions: {
    updateSettings(patch: Partial<SystemSettings>) {
      this.settings = { ...this.settings, ...patch }
    },
    resetSettings() {
      this.settings = { ...mockSettings }
    },
  },

  persist: true,
})
