import React from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { formatNumber } from '../../utils/index';

interface CurrencyDisplayProps {
  className?: string;
  compact?: boolean;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ className = '', compact = false }) => {
  const character = usePlayerStore((s) => s.character);
  if (!character) return null;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm">💎</span>
        <span className="text-xs font-medium" style={{ color: 'var(--color-gold)' }}>
          {formatNumber(character.spiritStones)}
        </span>
        <span className="text-sm">🔮</span>
        <span className="text-xs font-medium" style={{ color: '#a78bfa' }}>
          {character.yuanbao}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 px-4 py-2 rounded-lg ${className}`} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }}>
      <div className="flex items-center gap-1.5">
        <span>💎</span>
        <div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>灵石</div>
          <div className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
            {formatNumber(character.spiritStones)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span>🔮</span>
        <div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>元宝</div>
          <div className="text-sm font-semibold" style={{ color: '#a78bfa' }}>
            {character.yuanbao}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span>⚡</span>
        <div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>体力</div>
          <div className="text-sm font-semibold" style={{ color: 'var(--color-jade)' }}>
            {character.stamina}/{character.maxStamina}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDisplay;
