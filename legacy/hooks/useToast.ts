import { useUIStore } from '../store/uiStore';

export function useToast() {
  const showToast = useUIStore((s) => s.showToast);
  return {
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    warning: (msg: string) => showToast(msg, 'warning'),
    info: (msg: string) => showToast(msg, 'info'),
  };
}