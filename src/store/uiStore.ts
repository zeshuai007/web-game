/**
 * UI 状态 Store
 */
import { create } from 'zustand';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface UIState {
  sideMenuOpen: boolean;
  activeNav: string;
  toasts: ToastItem[];
  modalStack: string[];   // 打开的弹窗 id 列表

  // Actions
  setSideMenuOpen: (open: boolean) => void;
  setActiveNav: (nav: string) => void;
  showToast: (message: string, type?: ToastItem['type'], duration?: number) => void;
  removeToast: (id: string) => void;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
}

export const useUIStore = create<UIState>()((set, get) => ({
  sideMenuOpen: false,
  activeNav: 'lobby',
  toasts: [],
  modalStack: [],

  setSideMenuOpen: (open) => set({ sideMenuOpen: open }),

  setActiveNav: (nav) => set({ activeNav: nav }),

  showToast: (message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2);
    set((state) => ({ toasts: [...state.toasts, { id, message, type, duration }] }));
    setTimeout(() => get().removeToast(id), duration);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  openModal: (id) => {
    set((state) => ({
      modalStack: state.modalStack.includes(id) ? state.modalStack : [...state.modalStack, id],
    }));
  },

  closeModal: (id) => {
    set((state) => ({ modalStack: state.modalStack.filter((m) => m !== id) }));
  },

  isModalOpen: (id) => get().modalStack.includes(id),
}));
