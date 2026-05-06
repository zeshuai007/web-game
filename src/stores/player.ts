import { defineStore } from 'pinia'
import playerApi from '@/api/playerApi'
import { mockCharacter } from '@/mock'
import type { Character, CultivationState, CultivationMode } from '@/types'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    character: mockCharacter as Character | null,
    cultivation: {
      isActive: false,
      mode: null,
      startedAt: null,
      duration: 0,
      elapsed: 0,
      successRate: 0,
      gainPerHour: 0,
      status: 'idle',
    } as CultivationState,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCharacter(userId: string) {
      this.loading = true
      try {
        const character = await playerApi.getCharacter(userId)
        this.character = character
        this.loading = false
      } catch (err) {
        this.loading = false
        this.error = (err as Error).message
      }
    },

    updateSpiritStones(delta: number) {
      if (!this.character) return
      this.character.spiritStones = Math.max(0, this.character.spiritStones + delta)
    },

    updateStamina(delta: number) {
      if (!this.character) return
      this.character.stamina = Math.min(
        this.character.maxStamina,
        Math.max(0, this.character.stamina + delta)
      )
    },

    startCultivation(mode: CultivationMode, duration: number) {
      const gainMap: Record<string, number> = {
        meditation: 200,
        seclusion: 400,
        absorption: 300,
        breakthrough: 0,
        tribulation: 0,
      }
      const successMap: Record<string, number> = {
        meditation: 100,
        seclusion: 100,
        absorption: 100,
        breakthrough: 65,
        tribulation: 45,
      }
      this.cultivation = {
        isActive: true,
        mode,
        startedAt: new Date().toISOString(),
        duration,
        elapsed: 0,
        successRate: successMap[mode] ?? 100,
        gainPerHour: gainMap[mode] ?? 200,
        status: 'active',
      }
    },

    stopCultivation() {
      this.cultivation = {
        isActive: false,
        mode: null,
        startedAt: null,
        duration: 0,
        elapsed: 0,
        successRate: 0,
        gainPerHour: 0,
        status: 'idle',
      }
    },

    tickCultivation() {
      if (!this.cultivation.isActive) return
      const newElapsed = this.cultivation.elapsed + 1
      if (newElapsed >= this.cultivation.duration) {
        this.cultivation.elapsed = this.cultivation.duration
        this.cultivation.status = 'completed'
      } else {
        this.cultivation.elapsed = newElapsed
      }
    },

    clearError() {
      this.error = null
    },
  },
})
