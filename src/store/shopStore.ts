/**
 * 商城 Store
 */
import { create } from 'zustand';
import { mockShopItems } from '../mock/index';
import type { ShopItem, ShopCategory } from '../types/index';

interface ShopState {
  items: ShopItem[];
  activeCategory: ShopCategory | 'all';
  loading: boolean;

  // Actions
  fetchItems: () => Promise<void>;
  setActiveCategory: (cat: ShopCategory | 'all') => void;
  getFilteredItems: () => ShopItem[];
}

export const useShopStore = create<ShopState>()((set, get) => ({
  items: mockShopItems,
  activeCategory: 'hot',
  loading: false,

  fetchItems: async () => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 300));
    set({ items: mockShopItems, loading: false });
  },

  setActiveCategory: (cat) => set({ activeCategory: cat }),

  getFilteredItems: () => {
    const { items, activeCategory } = get();
    if (activeCategory === 'all') return items;
    return items.filter((i) => i.category === activeCategory);
  },
}));
