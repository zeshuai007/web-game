import { defineStore } from 'pinia'
import { mockContacts, mockMessages } from '@/mock'
import type { SocialContact, Message, ChannelType } from '@/types'

export const useSocialStore = defineStore('social', {
  state: () => ({
    contacts: [...mockContacts],
    messages: [...mockMessages],
    activeChannel: 'world' as ChannelType,
    activeContactId: null as string | null,
    loading: false,
  }),

  getters: {
    unreadCount(): number {
      return this.contacts.reduce((sum, c) => sum + c.unreadCount, 0)
    },
  },

  actions: {
    async fetchContacts() {
      this.loading = true
      await new Promise((r) => setTimeout(r, 200))
      this.contacts = [...mockContacts]
      this.loading = false
    },
    async fetchMessages(channel: ChannelType, _contactId?: string) {
      this.loading = true
      await new Promise((r) => setTimeout(r, 200))
      this.messages = mockMessages.filter((m) => m.channelType === channel)
      this.loading = false
    },
    async sendMessage(content: string) {
      const msg: Message = {
        id: 'msg-' + Date.now(),
        channelType: this.activeChannel,
        senderId: 'user-001',
        senderName: '剑无双',
        senderAvatar: '',
        content,
        type: 'text',
        sentAt: new Date().toISOString(),
        isRead: true,
      }
      this.messages.push(msg)
    },
    setActiveChannel(channel: ChannelType) {
      this.activeChannel = channel
      this.fetchMessages(channel)
    },
    setActiveContact(contactId: string | null) {
      this.activeContactId = contactId
    },
    markContactRead(contactId: string) {
      const idx = this.contacts.findIndex((c) => c.id === contactId)
      if (idx !== -1) {
        this.contacts[idx].unreadCount = 0
      }
    },
  },
})
