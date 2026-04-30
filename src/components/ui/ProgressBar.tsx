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
}

const variantColors: Record<string, string> = {
  hp: 'linear-gradient(90deg, #dc2626, #ef4444)',
  mp: 'linear-gradient(90deg, #1d4ed8, #3b82f6)',
  exp: 'linear-gradient(90deg, #d97706, #f59e0b)',
  realm: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
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
}) => {
  const targetPct = Math.min(100, Math.max(0, (value / max) * 100));
  const isFirstRender = useRef(true);
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Delay to allow the 0 state to paint first, then animate to target
      const timer = setTimeout(() => setDisplayPct(targetPct), 30);
      return () => clearTimeout(timer);
    }
    setDisplayPct(targetPct);
  }, [targetPct]);

  const bg = color ?? variantColors[variant] ?? variantColors.exp;

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
        className="overflow-hidden rounded-full"
        style={{ height, background: 'var(--color-border)' }}
      >
        <div
          className={animated ? 'transition-all duration-700 ease-out' : ''}
          style={{ width: `${displayPct}%`, height: '100%', background: bg, borderRadius: 'inherit' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
