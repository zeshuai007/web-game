import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: number | string;
  footer?: React.ReactNode;
  closable?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  width = 480,
  footer,
  closable = true,
}) => {
  // 按 ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="game-card relative flex flex-col"
            style={{ width, maxWidth: '100%', maxHeight: '85vh' }}
          >
            {/* 顶部装饰线 */}
            <div className="divider-gold absolute top-0 left-0 right-0" />

            {/* 头部 */}
            {(title || closable) && (
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <span className="text-base font-semibold text-glow-gold">{title}</span>
                {closable && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded transition-colors hover:bg-white/10"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}

            {/* 内容 */}
            <div className="flex-1 overflow-y-auto p-5">{children}</div>

            {/* 底部 */}
            {footer && (
              <div
                className="flex items-center justify-end gap-3 px-5 py-4"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
