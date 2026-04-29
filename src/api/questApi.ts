/**
 * 任务相关 API
 */
import { mockQuests } from '../mock/index';
import type { Quest } from '../types/index';

const questApi = {
  /** 获取任务列表 */
  getQuests: async (): Promise<Quest[]> => {
    // TODO: http.get<Quest[]>('/quests')
    await new Promise((r) => setTimeout(r, 300));
    return mockQuests;
  },

  /** 接取任务 */
  acceptQuest: async (questId: string): Promise<Quest> => {
    // TODO: http.post<Quest>(`/quests/${questId}/accept`)
    await new Promise((r) => setTimeout(r, 300));
    const quest = mockQuests.find((q) => q.id === questId);
    if (!quest) throw new Error('任务不存在');
    return { ...quest, status: 'active', acceptedAt: new Date().toISOString() };
  },

  /** 领取奖励 */
  claimQuest: async (questId: string): Promise<{ reward: string }> => {
    // TODO: http.post<{ reward: string }>(`/quests/${questId}/claim`)
    await new Promise((r) => setTimeout(r, 300));
    const quest = mockQuests.find((q) => q.id === questId);
    if (!quest) throw new Error('任务不存在');
    return { reward: '奖励已发放' };
  },

  /** 放弃任务 */
  abandonQuest: async (questId: string): Promise<void> => {
    // TODO: http.post(`/quests/${questId}/abandon`)
    await new Promise((r) => setTimeout(r, 200));
    console.log('Abandon quest:', questId);
  },
};

export default questApi;
