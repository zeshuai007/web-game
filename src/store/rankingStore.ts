/**
 * 排行榜 Store
 */
import { create } from 'zustand';
import { mockRankingEntries } from '../mock/index';
import type { RankingEntry, RankingType } from '../types/index';

interface RankingState {
  entries: RankingEntry[];
  activeType: RankingType;
  loading: boolean;

  // Actions
  fetchRanking: (type: RankingType) => Promise<void>;
  setActiveType: (type: RankingType) => void;
}

export const useRankingStore = create<RankingState>()((set) => ({
  entries: mockRankingEntries,
  activeType: 'battlePower',
  loading: false,

  fetchRanking: async (type) => {
    set({ loading: true, activeType: type });
    await new Promise((r) => setTimeout(r, 300));
    set({ entries: mockRankingEntries, loading: false });
  },

  setActiveType: (type) => set({ activeType: type }),
}));
