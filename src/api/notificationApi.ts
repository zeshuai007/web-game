/**
 * 通知相关 API
 */
import { mockNotifications } from '../mock/index';
import type { Notification } from '../types/index';

const notificationApi = {
  /** 获取通知列表 */
  getNotifications: async (): Promise<Notification[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return mockNotifications;
  },

  /** 标记已读 */
  markRead: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 100));
    console.log('Mark notification read:', id);
  },

  /** 全部标记已读 */
  markAllRead: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200));
  },

  /** 删除通知 */
  deleteNotification: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 100));
    console.log('Delete notification:', id);
  },
};

export default notificationApi;
