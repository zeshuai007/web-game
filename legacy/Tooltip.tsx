import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
}) => {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => { timer.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { clearTimeout(timer.current); setVisible(false); };

  useEffect(() => () => clearTimeout(timer.current), []);

  const placementStyles: Record<string, React.CSSProperties> = {
    top: { bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)' },
    left: { right: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
    right: { left: 'calc(100% + 6px)', top: '50%', transform: 'translateY(-50%)' },
  };

  return (
    <span className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 pointer-events-none max-w-xs"
            style={{
              ...placementStyles[placement],
              background: 'rgba(15,20,30,0.95)',
              border: '1px solid var(--color-border-gold)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              color: 'var(--color-text-primary)',
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;
