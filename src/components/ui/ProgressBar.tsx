import React, { useState, useEffect, useRef } from 'react';

interface ProgressBarProps {
  value: number;      // 0-100
  max?: number;
  variant?: 'hp' | 'mp' | 'exp' | 'realm' | 'custom';
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
  glow?: boolean;
}

const variantColors: Record<string, string> = {
  hp: 'linear-gradient(90deg, #dc2626, #ef4444)',
  mp: 'linear-gradient(90deg, #1d4ed8, #3b82f6)',
  exp: 'linear-gradient(90deg, #d97706, #f59e0b)',
  realm: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
  custom: '',
};

const variantGlows: Record<string, string> = {
  hp: '0 0 8px rgba(239, 68, 68, 0.5), 0 0 16px rgba(239, 68, 68, 0.3)',
  mp: '0 0 8px rgba(59, 130, 246, 0.5), 0 0 16px rgba(59, 130, 246, 0.3)',
  exp: '0 0 8px rgba(245, 158, 11, 0.5), 0 0 16px rgba(245, 158, 11, 0.3)',
  realm: '0 0 8px rgba(167, 139, 250, 0.5), 0 0 16px rgba(167, 139, 250, 0.3)',
  custom: '',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'exp',
  color,
  height = 6,
  showLabel = false,
  label,
  className = '',
  animated = true,
  glow = true,
}) => {
  const targetPct = Math.min(100, Math.max(0, (value / max) * 100));
  const isFirstRender = useRef(true);
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const timer = setTimeout(() => setDisplayPct(targetPct), 30);
      return () => clearTimeout(timer);
    }
    setDisplayPct(targetPct);
  }, [targetPct]);

  const bg = color ?? variantColors[variant] ?? variantColors.exp;
  const boxShadow = glow ? (color ? `0 0 8px ${color}, 0 0 16px ${color}` : variantGlows[variant]) : 'none';

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1">
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {label ?? `${Math.round(value)} / ${max}`}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {Math.round(targetPct)}%
          </span>
        </div>
      )}
      <div
        className="relative overflow-hidden rounded-full"
        style={{ 
          height, 
          background: 'rgba(45, 55, 72, 0.8)',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div
          className={`relative h-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{ 
            width: `${displayPct}%`, 
            background: bg, 
            borderRadius: 'inherit',
            boxShadow,
          }}
        >
          {/* 闪光效果 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              animation: 'shimmer 2s infinite',
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
