/**
 * 排行榜相关 API
 */
import { mockRankingEntries } from '../mock/index';
import type { RankingEntry } from '../types/index';

const rankingApi = {
  /** 获取排行榜 */
  getRanking: async (): Promise<RankingEntry[]> => {
    // TODO: http.get<RankingEntry[]>('/ranking', { type, page })
    await new Promise((r) => setTimeout(r, 300));
    return mockRankingEntries;
  },

  /** 获取我的排名 */
  getMyRank: async (): Promise<RankingEntry | null> => {
    await new Promise((r) => setTimeout(r, 200));
    return mockRankingEntries.find((e) => e.userId === 'user-001') ?? null;
  },
};

export default rankingApi;
