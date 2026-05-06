import { defineStore } from 'pinia'

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useUIStore = defineStore('ui', {
  state: () => ({
    sideMenuOpen: false,
    activeNav: 'lobby',
    toasts: [] as ToastItem[],
    modalStack: [] as string[],
  }),

  actions: {
    setSideMenuOpen(open: boolean) {
      this.sideMenuOpen = open
    },
    setActiveNav(nav: string) {
      this.activeNav = nav
    },
    showToast(message: string, type: ToastItem['type'] = 'info', duration: number = 3000) {
      const id = Math.random().toString(36).substring(2)
      this.toasts.push({ id, message, type, duration })
      setTimeout(() => this.removeToast(id), duration)
    },
    removeToast(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
    openModal(id: string) {
      if (!this.modalStack.includes(id)) {
        this.modalStack.push(id)
      }
    },
    closeModal(id: string) {
      this.modalStack = this.modalStack.filter((m) => m !== id)
    },
    isModalOpen(id: string) {
      return this.modalStack.includes(id)
    },
  },
})
