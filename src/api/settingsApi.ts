/**
 * 设置相关 API
 */
import { mockSettings } from '../mock/index';
import type { SystemSettings } from '../types/index';

const settingsApi = {
  /** 获取设置 */
  getSettings: async (): Promise<SystemSettings> => {
    await new Promise((r) => setTimeout(r, 200));
    return mockSettings;
  },

  /** 保存设置 */
  saveSettings: async (settings: SystemSettings): Promise<void> => {
    // TODO: http.put('/settings', settings)
    await new Promise((r) => setTimeout(r, 300));
    localStorage.setItem('game_settings', JSON.stringify(settings));
  },

  /** 清理缓存 */
  clearCache: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 500));
    // 清理非必要的 localStorage 项
  },
};

export default settingsApi;
