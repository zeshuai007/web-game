/**
 * 角色 Store
 */
import { create } from 'zustand';
import playerApi from '../api/playerApi';
import { mockCharacter } from '../mock/index';
import type { Character, CultivationState, CultivationMode } from '../types/index';

interface PlayerState {
  character: Character | null;
  cultivation: CultivationState;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCharacter: (userId: string) => Promise<void>;
  updateSpiritStones: (delta: number) => void;
  updateStamina: (delta: number) => void;
  startCultivation: (mode: CultivationMode, duration: number) => void;
  stopCultivation: () => void;
  tickCultivation: () => void;
  clearError: () => void;
}

export const usePlayerStore = create<PlayerState>()((set, get) => ({
  character: mockCharacter, // 默认加载 mock 数据，方便开发预览
  cultivation: {
    isActive: false,
    mode: null,
    startedAt: null,
    duration: 0,
    elapsed: 0,
    successRate: 0,
    gainPerHour: 0,
    status: 'idle',
  },
  loading: false,
  error: null,

  fetchCharacter: async (userId) => {
    set({ loading: true });
    try {
      const character = await playerApi.getCharacter(userId);
      set({ character, loading: false });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },

  updateSpiritStones: (delta) => {
    const { character } = get();
    if (!character) return;
    set({ character: { ...character, spiritStones: Math.max(0, character.spiritStones + delta) } });
  },

  updateStamina: (delta) => {
    const { character } = get();
    if (!character) return;
    set({
      character: {
        ...character,
        stamina: Math.min(character.maxStamina, Math.max(0, character.stamina + delta)),
      },
    });
  },

  startCultivation: (mode, duration) => {
    const gainMap: Record<string, number> = {
      meditation: 200,
      seclusion: 400,
      absorption: 300,
      breakthrough: 0,
      tribulation: 0,
    };
    const successMap: Record<string, number> = {
      meditation: 100,
      seclusion: 100,
      absorption: 100,
      breakthrough: 65,
      tribulation: 45,
    };
    set({
      cultivation: {
        isActive: true,
        mode,
        startedAt: new Date().toISOString(),
        duration,
        elapsed: 0,
        successRate: successMap[mode] ?? 100,
        gainPerHour: gainMap[mode] ?? 200,
        status: 'active',
      },
    });
  },

  stopCultivation: () => {
    set({
      cultivation: {
        isActive: false,
        mode: null,
        startedAt: null,
        duration: 0,
        elapsed: 0,
        successRate: 0,
        gainPerHour: 0,
        status: 'idle',
      },
    });
  },

  tickCultivation: () => {
    const { cultivation } = get();
    if (!cultivation.isActive) return;
    const newElapsed = cultivation.elapsed + 1;
    if (newElapsed >= cultivation.duration) {
      set({
        cultivation: { ...cultivation, elapsed: cultivation.duration, status: 'completed' },
      });
    } else {
      set({ cultivation: { ...cultivation, elapsed: newElapsed } });
    }
  },

  clearError: () => set({ error: null }),
}));
