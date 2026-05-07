import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export type MotionPrefs = {
  reducedMotion: boolean
  enableMotion: boolean
  enableHighMotion: boolean
}

export function useMotionPrefs(): MotionPrefs {
  const settingsStore = useSettingsStore()

  return {
    reducedMotion: prefersReducedMotion(),
    enableMotion: settingsStore.settings.effectsLevel !== 'off' && !prefersReducedMotion(),
    enableHighMotion: settingsStore.settings.effectsLevel === 'high' && !prefersReducedMotion(),
  }
}
