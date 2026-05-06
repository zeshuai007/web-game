import { defineStore } from 'pinia'
import { mockNotifications } from '@/mock'
import type { Notification } from '@/types'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [...mockNotifications],
  }),

  getters: {
    unreadCount(): number {
      return this.notifications.filter((n) => !n.isRead).length
    },
  },

  actions: {
    async fetchNotifications() {
      await new Promise((r) => setTimeout(r, 200))
    },
    markRead(id: string) {
      const idx = this.notifications.findIndex((n) => n.id === id)
      if (idx !== -1) {
        this.notifications[idx].isRead = true
      }
    },
    markAllRead() {
      this.notifications.forEach((n) => (n.isRead = true))
    },
    addNotification(n: Notification) {
      this.notifications.unshift(n)
    },
    removeNotification(id: string) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
  },
})
