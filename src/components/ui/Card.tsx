import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  className = '',
  bodyClassName = '',
  noPadding = false,
  glow = false,
}) => {
  return (
    <div
      className={`game-card ${glow ? 'animate-pulse-gold' : ''} ${className}`}
      style={{ border: '1px solid var(--color-border)' }}
    >
      {(title || extra) && (
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {title && (
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-gold)' }}>
              {title}
            </span>
          )}
          {extra && <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{extra}</div>}
        </div>
      )}
      <div className={noPadding ? '' : `p-4 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
