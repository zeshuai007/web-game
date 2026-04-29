/**
 * 背包 Store
 */
import { create } from 'zustand';
import { mockInventoryItems } from '../mock/index';
import type { InventoryItem, ItemCategory } from '../types/index';

interface InventoryState {
  items: InventoryItem[];
  activeCategory: ItemCategory | 'all';
  searchKeyword: string;
  loading: boolean;

  // Actions
  fetchItems: () => Promise<void>;
  setActiveCategory: (cat: ItemCategory | 'all') => void;
  setSearchKeyword: (kw: string) => void;
  toggleLock: (itemId: string) => void;
  removeItem: (itemId: string, quantity?: number) => void;
  getFilteredItems: () => InventoryItem[];
}

export const useInventoryStore = create<InventoryState>()((set, get) => ({
  items: mockInventoryItems,
  activeCategory: 'all',
  searchKeyword: '',
  loading: false,

  fetchItems: async () => {
    set({ loading: true });
    await new Promise((r) => setTimeout(r, 300));
    set({ items: mockInventoryItems, loading: false });
  },

  setActiveCategory: (cat) => set({ activeCategory: cat }),

  setSearchKeyword: (kw) => set({ searchKeyword: kw }),

  toggleLock: (itemId) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.id === itemId ? { ...i, isLocked: !i.isLocked } : i
      ),
    }));
  },

  removeItem: (itemId, quantity = 1) => {
    set((state) => ({
      items: state.items
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - quantity } : i))
        .filter((i) => i.quantity > 0),
    }));
  },

  getFilteredItems: () => {
    const { items, activeCategory, searchKeyword } = get();
    let filtered = items;
    if (activeCategory !== 'all') {
      filtered = filtered.filter((i) => i.category === activeCategory);
    }
    if (searchKeyword.trim()) {
      filtered = filtered.filter((i) =>
        i.name.includes(searchKeyword) || i.description.includes(searchKeyword)
      );
    }
    return filtered;
  },
}));
