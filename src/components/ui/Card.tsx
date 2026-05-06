import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  noPadding?: boolean;
  glow?: boolean;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'divine';
}

const rarityClasses: Record<string, string> = {
  common: 'rarity-border-common',
  uncommon: 'rarity-border-uncommon',
  rare: 'rarity-border-rare',
  epic: 'rarity-border-epic',
  legendary: 'rarity-border-legendary',
  divine: 'rarity-border-divine',
};

const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  className = '',
  bodyClassName = '',
  noPadding = false,
  glow = false,
  rarity,
}) => {
  return (
    <div
      className={`game-card ${glow ? 'animate-pulse-gold' : ''} ${className} ${rarity ? rarityClasses[rarity] : ''} transition-all duration-300 hover:translate-y-[-2px]`}
      style={{
        border: `1px solid var(--color-border)`,
        borderRadius: 'var(--radius-lg)',
      }}
    >
      {/* 装饰角 - 左上角 */}
      <div
        className="absolute top-0 left-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: `2px solid var(--color-border-gold)`,
          borderLeft: `2px solid var(--color-border-gold)`,
          borderTopLeftRadius: 'var(--radius-lg)',
        }}
      />
      {/* 装饰角 - 右上角 */}
      <div
        className="absolute top-0 right-0 w-4 h-4 pointer-events-none"
        style={{
          borderTop: `2px solid var(--color-border-gold)`,
          borderRight: `2px solid var(--color-border-gold)`,
          borderTopRightRadius: 'var(--radius-lg)',
        }}
      />
      {/* 装饰角 - 左下角 */}
      <div
        className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none"
        style={{
          borderBottom: `2px solid var(--color-border-gold)`,
          borderLeft: `2px solid var(--color-border-gold)`,
          borderBottomLeftRadius: 'var(--radius-lg)',
        }}
      />
      {/* 装饰角 - 右下角 */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none"
        style={{
          borderBottom: `2px solid var(--color-border-gold)`,
          borderRight: `2px solid var(--color-border-gold)`,
          borderBottomRightRadius: 'var(--radius-lg)',
        }}
      />

      {(title || extra) && (
        <div
          className="flex items-center justify-between px-4 py-3 relative"
          style={{
            borderBottom: '1px solid var(--color-border)',
            background: 'linear-gradient(180deg, rgba(212, 168, 67, 0.05) 0%, transparent 100%)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-border-gold), transparent)',
            }}
          />
          {title && (
            <span className="text-sm font-semibold text-glow-gold relative z-10">
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
