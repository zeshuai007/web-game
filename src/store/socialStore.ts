/**
 * 社交 Store
 */
import { create } from 'zustand';
import { mockContacts, mockMessages } from '../mock/index';
import type { SocialContact, Message, ChannelType } from '../types/index';

interface SocialState {
  contacts: SocialContact[];
  messages: Message[];
  activeChannel: ChannelType;
  activeContactId: string | null;
  loading: boolean;

  // Actions
  fetchContacts: () => Promise<void>;
  fetchMessages: (channel: ChannelType, contactId?: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  setActiveChannel: (channel: ChannelType) => void;
  setActiveContact: (contactId: string | null) => void;
  markContactRead: (contactId: string) => void;
  getUnreadCount: () => number;
}

export const useSocialStore = create<SocialState>()((set, get) => ({
  contacts: mockContacts,
  messages: mockMessages,
  activeChannel: 'world',
  activeContactId: null,
  loading: false,

  fetchContacts: async () => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 200));
    set({ contacts: mockContacts, loading: false });
  },

  fetchMessages: async (channel) => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 200));
    const filtered = mockMessages.filter((m) => m.channelType === channel);
    set({ messages: filtered, loading: false });
  },

  sendMessage: async (content) => {
    const { activeChannel } = get();
    const msg: Message = {
      id: 'msg-' + Date.now(),
      channelType: activeChannel,
      senderId: 'user-001',
      senderName: '剑无双',
      senderAvatar: '',
      content,
      type: 'text',
      sentAt: new Date().toISOString(),
      isRead: true,
    };
    set((state) => ({ messages: [...state.messages, msg] }));
  },

  setActiveChannel: (channel) => {
    set({ activeChannel: channel });
    get().fetchMessages(channel);
  },

  setActiveContact: (contactId) => set({ activeContactId: contactId }),

  markContactRead: (contactId) => {
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === contactId ? { ...c, unreadCount: 0 } : c
      ),
    }));
  },

  getUnreadCount: () => {
    return get().contacts.reduce((sum, c) => sum + c.unreadCount, 0);
  },
}));
