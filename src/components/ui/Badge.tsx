import React from 'react';

type BadgeVariant = 'default' | 'gold' | 'jade' | 'danger' | 'purple';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  count?: number;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: { background: 'var(--color-border)', color: 'var(--color-text-secondary)' },
  gold: { background: 'rgba(212,168,67,0.2)', color: 'var(--color-gold)', border: '1px solid rgba(212,168,67,0.4)' },
  jade: { background: 'rgba(126,203,161,0.15)', color: 'var(--color-jade)', border: '1px solid rgba(126,203,161,0.3)' },
  danger: { background: 'rgba(192,57,43,0.2)', color: '#f87171', border: '1px solid rgba(192,57,43,0.4)' },
  purple: { background: 'rgba(142,68,173,0.2)', color: '#c084fc', border: '1px solid rgba(142,68,173,0.4)' },
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  count,
  className = '',
  pulse = false,
}) => {
  if (dot) {
    return (
      <span className={`relative inline-block ${className}`}>
        {children}
        <span
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${pulse ? 'animate-pulse-gold' : ''}`}
          style={{ 
            background: 'var(--color-vermillion)',
            boxShadow: pulse ? '0 0 8px rgba(192, 57, 43, 0.6)' : 'none',
          }}
        />
      </span>
    );
  }

  if (count !== undefined) {
    return (
      <span className={`relative inline-block ${className}`}>
        {children}
        {count > 0 && (
          <span
            className={`absolute -top-2 -right-2 flex items-center justify-center rounded-full px-1 min-w-[18px] h-[18px] text-white text-[10px] font-medium transition-transform hover:scale-110 ${pulse ? 'animate-pulse-gold' : ''}`}
            style={{ 
              background: 'var(--color-vermillion)',
              boxShadow: pulse ? '0 0 10px rgba(192, 57, 43, 0.7)' : '0 2px 4px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className} transition-all duration-200 hover:scale-105 ${pulse ? 'animate-pulse-gold' : ''}`}
      style={{
        ...variantStyles[variant],
        boxShadow: pulse ? '0 0 8px rgba(212, 168, 67, 0.4)' : 'none',
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
