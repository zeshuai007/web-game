import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: number | string;
  placement?: 'left' | 'right';
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  width = 320,
  placement = 'right',
}) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* 遮罩 */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={onClose}
          />
          {/* 抽屉主体 */}
          <motion.div
            initial={{ x: placement === 'right' ? width : -Number(width) }}
            animate={{ x: 0 }}
            exit={{ x: placement === 'right' ? width : -Number(width) }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative ml-auto flex flex-col h-full overflow-hidden"
            style={{
              width,
              background: 'var(--color-dark)',
              borderLeft: placement === 'right' ? '1px solid var(--color-border-gold)' : undefined,
              borderRight: placement === 'left' ? '1px solid var(--color-border-gold)' : undefined,
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <span className="font-semibold text-glow-gold">{title}</span>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
                <X size={16} style={{ color: 'var(--color-text-secondary)' }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
