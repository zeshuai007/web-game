import { defineStore } from 'pinia'
import { mockInventoryItems } from '@/mock'
import type { InventoryItem, ItemCategory } from '@/types'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [...mockInventoryItems],
    activeCategory: 'all' as ItemCategory | 'all',
    searchKeyword: '',
    loading: false,
  }),

  getters: {
    filteredItems(): InventoryItem[] {
      let filtered = this.items
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter((i) => i.category === this.activeCategory)
      }
      if (this.searchKeyword.trim()) {
        filtered = filtered.filter((i) =>
          i.name.includes(this.searchKeyword) || i.description.includes(this.searchKeyword)
        )
      }
      return filtered
    },
  },

  actions: {
    async fetchItems() {
      this.loading = true
      await new Promise((r) => setTimeout(r, 300))
      this.items = [...mockInventoryItems]
      this.loading = false
    },
    setActiveCategory(cat: ItemCategory | 'all') {
      this.activeCategory = cat
    },
    setSearchKeyword(kw: string) {
      this.searchKeyword = kw
    },
    toggleLock(itemId: string) {
      const idx = this.items.findIndex((i) => i.id === itemId)
      if (idx !== -1) {
        this.items[idx].isLocked = !this.items[idx].isLocked
      }
    },
    removeItem(itemId: string, quantity: number = 1) {
      const idx = this.items.findIndex((i) => i.id === itemId)
      if (idx !== -1) {
        this.items[idx].quantity -= quantity
        if (this.items[idx].quantity <= 0) {
          this.items.splice(idx, 1)
        }
      }
    },
  },
})
