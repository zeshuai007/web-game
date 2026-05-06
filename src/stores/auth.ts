import { defineStore } from 'pinia'
import authApi from '@/api/authApi'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as User | null,
    token: null as string | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async login(username: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const result = await authApi.login({ username, password })
        localStorage.setItem('auth_token', result.token)
        this.isLoggedIn = true
        this.user = result.user
        this.token = result.token
        this.loading = false
      } catch (err) {
        this.loading = false
        this.error = (err as Error).message
      }
    },

    async guestLogin() {
      this.loading = true
      this.error = null
      try {
        const result = await authApi.guestLogin()
        localStorage.setItem('auth_token', result.token)
        this.isLoggedIn = true
        this.user = result.user
        this.token = result.token
        this.loading = false
      } catch (err) {
        this.loading = false
        this.error = (err as Error).message
      }
    },

    logout() {
      localStorage.removeItem('auth_token')
      this.isLoggedIn = false
      this.user = null
      this.token = null
    },

    clearError() {
      this.error = null
    },
  },

  persist: {
    key: 'auth-storage',
    paths: ['isLoggedIn', 'user', 'token'],
  },
})
