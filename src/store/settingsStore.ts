/**
 * 设置 Store
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockSettings } from '../mock/index';
import type { SystemSettings } from '../types/index';

interface SettingsState {
  settings: SystemSettings;
  // Actions
  updateSettings: (patch: Partial<SystemSettings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: mockSettings,

      updateSettings: (patch) => {
        set((state) => ({ settings: { ...state.settings, ...patch } }));
      },

      resetSettings: () => set({ settings: mockSettings }),
    }),
    {
      name: 'settings-storage',
    },
  ),
);
