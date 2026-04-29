/**
 * 任务 Store
 */
import { create } from 'zustand';
import questApi from '../api/questApi';
import { mockQuests } from '../mock/index';
import type { Quest, QuestType } from '../types/index';

interface QuestState {
  quests: Quest[];
  activeTab: QuestType | 'all';
  loading: boolean;

  // Actions
  fetchQuests: () => Promise<void>;
  acceptQuest: (questId: string) => Promise<void>;
  claimQuest: (questId: string) => Promise<void>;
  setActiveTab: (tab: QuestType | 'all') => void;
  getFilteredQuests: () => Quest[];
}

export const useQuestStore = create<QuestState>()((set, get) => ({
  quests: mockQuests,
  activeTab: 'all',
  loading: false,

  fetchQuests: async () => {
    set({ loading: true });
    const quests = await questApi.getQuests();
    set({ quests, loading: false });
  },

  acceptQuest: async (questId) => {
    const updated = await questApi.acceptQuest(questId);
    set((state) => ({
      quests: state.quests.map((q) => (q.id === questId ? updated : q)),
    }));
  },

  claimQuest: async (questId) => {
    await questApi.claimQuest(questId);
    set((state) => ({
      quests: state.quests.map((q) =>
        q.id === questId ? { ...q, status: 'completed' as const } : q
      ),
    }));
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  getFilteredQuests: () => {
    const { quests, activeTab } = get();
    if (activeTab === 'all') return quests;
    return quests.filter((q) => q.type === activeTab);
  },
}));
