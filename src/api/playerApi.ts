/**
 * 角色相关 API
 */
import { mockCharacter } from '../mock/index';
import type { Character } from '../types/index';

const playerApi = {
  /** 获取角色信息 */
  getCharacter: async (): Promise<Character> => {
    // TODO: http.get<Character>(`/player/${userId}`)
    await new Promise((r) => setTimeout(r, 300));
    return mockCharacter;
  },

  /** 更新角色信息 */
  updateCharacter: async (data: Partial<Character>): Promise<Character> => {
    // TODO: http.put<Character>('/player/character', data)
    await new Promise((r) => setTimeout(r, 300));
    return { ...mockCharacter, ...data };
  },

  /** 签到 */
  dailyCheckIn: async (): Promise<{ reward: string }> => {
    // TODO: http.post('/player/checkin')
    await new Promise((r) => setTimeout(r, 300));
    return { reward: '灵石×100，体力×20' };
  },
};

export default playerApi;
