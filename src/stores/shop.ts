import { defineStore } from 'pinia'
import { mockShopItems } from '@/mock'
import type { ShopItem, ShopCategory } from '@/types'

export const useShopStore = defineStore('shop', {
  state: () => ({
    items: [...mockShopItems],
    activeCategory: 'hot' as ShopCategory | 'all',
    loading: false,
  }),

  getters: {
    filteredItems(): ShopItem[] {
      if (this.activeCategory === 'all') return this.items
      return this.items.filter((i) => i.category === this.activeCategory)
    },
  },

  actions: {
    async fetchItems() {
      this.loading = true
      await new Promise((r) => setTimeout(r, 300))
      this.items = [...mockShopItems]
      this.loading = false
    },
    setActiveCategory(cat: ShopCategory | 'all') {
      this.activeCategory = cat
    },
  },
})
