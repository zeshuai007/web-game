import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const iconMap = {
  success: <CheckCircle size={16} className="text-green-400 shrink-0" />,
  error: <XCircle size={16} className="text-red-400 shrink-0" />,
  warning: <AlertTriangle size={16} className="text-yellow-400 shrink-0" />,
  info: <Info size={16} style={{ color: 'var(--color-jade)' }} className="shrink-0" />,
};

const accentColors: Record<string, string> = {
  success: '#4ade80',
  error: '#f87171',
  warning: '#f59e0b',
  info: '#7ecba1',
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
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[240px] max-w-[360px] overflow-hidden"
            style={{
              background: 'rgba(20,28,40,0.97)',
              border: '1px solid var(--color-border-gold)',
              backdropFilter: 'blur(8px)',
              borderLeft: `3px solid ${accentColors[toast.type]}`,
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

export default Toast;
