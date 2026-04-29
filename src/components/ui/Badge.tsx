import React from 'react';

type BadgeVariant = 'default' | 'gold' | 'jade' | 'danger' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  count?: number;
  className?: string;
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
}) => {
  if (dot) {
    return (
      <span className={`relative inline-block ${className}`}>
        {children}
        <span
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ background: 'var(--color-vermillion)' }}
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
            className="absolute -top-2 -right-2 flex items-center justify-center rounded-full px-1 min-w-[18px] h-[18px] text-white"
            style={{ background: 'var(--color-vermillion)', fontSize: '10px' }}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
};

export default Badge;
