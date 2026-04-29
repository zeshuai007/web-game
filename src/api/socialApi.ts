/**
 * 社交相关 API
 */
import { mockContacts, mockMessages } from '../mock/index';
import type { SocialContact, Message } from '../types/index';

const socialApi = {
  /** 获取好友/宗门列表 */
  getContacts: async (): Promise<SocialContact[]> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockContacts;
  },

  /** 获取消息列表 */
  getMessages: async (_channelType: string, _contactId?: string): Promise<Message[]> => {
    await new Promise((r) => setTimeout(r, 200));
    return mockMessages;
  },

  /** 发送消息 */
  sendMessage: async (content: string, channelType: string): Promise<Message> => {
    await new Promise((r) => setTimeout(r, 200));
    return {
      id: 'msg-' + Date.now(),
      channelType: channelType as Message['channelType'],
      senderId: 'user-001',
      senderName: '剑无双',
      senderAvatar: '',
      content,
      type: 'text',
      sentAt: new Date().toISOString(),
      isRead: true,
    };
  },

  /** 添加好友 */
  addFriend: async (userId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 300));
    console.log('Add friend:', userId);
  },

  /** 标记消息已读 */
  markRead: async (contactId: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 100));
    console.log('Mark read:', contactId);
  },
};

export default socialApi;
