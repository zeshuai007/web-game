import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const iconMap = {
  success: <CheckCircle size={16} className="text-green-400" />,
  error: <XCircle size={16} className="text-red-400" />,
  warning: <AlertTriangle size={16} className="text-yellow-400" />,
  info: <Info size={16} style={{ color: 'var(--color-jade)' }} />,
};

const Toast: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[240px] max-w-[360px]"
            style={{
              background: 'rgba(20,28,40,0.97)',
              border: '1px solid var(--color-border-gold)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {iconMap[toast.type]}
            <span className="flex-1 text-sm" style={{ color: 'var(--color-text-primary)' }}>
              {toast.message}
            </span>
            <button
              className="p-0.5 hover:bg-white/10 rounded transition-colors"
              onClick={() => removeToast(toast.id)}
            >
              <X size={12} style={{ color: 'var(--color-text-muted)' }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/** Hook 方便调用 */
export function useToast() {
  const showToast = useUIStore((s) => s.showToast);
  return {
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    warning: (msg: string) => showToast(msg, 'warning'),
    info: (msg: string) => showToast(msg, 'info'),
  };
}

export default Toast;
