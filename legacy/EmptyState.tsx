import React from 'react';
import { Wind } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = '此处空无一物',
  description = '道可道，非常道。虚而不屈，动而愈出。',
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(212,168,67,0.08)', border: '1px dashed var(--color-border-gold)' }}
      >
        {icon ?? <Wind size={28} style={{ color: 'var(--color-text-muted)' }} />}
      </div>
      <p className="text-base font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
        {title}
      </p>
      {description && (
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
