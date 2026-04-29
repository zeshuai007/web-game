import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useRankingStore } from '../../store/rankingStore';
import { RANKING_TYPE_NAMES } from '../../constants/index';
import type { RankingType } from '../../types/index';
import Tabs from '../ui/Tabs';
import { formatNumber } from '../../utils/index';

const rankTypes: Array<{ key: RankingType; label: string }> = [
  { key: 'battlePower', label: RANKING_TYPE_NAMES.battlePower },
  { key: 'realm', label: RANKING_TYPE_NAMES.realm },
  { key: 'alchemy', label: RANKING_TYPE_NAMES.alchemy },
  { key: 'sect', label: RANKING_TYPE_NAMES.sect },
  { key: 'explore', label: RANKING_TYPE_NAMES.explore },
];

const rankColors = ['#f59e0b', '#9ca3af', '#cd7f32', '#6b7280'];
const rankBgColors = ['rgba(245,158,11,0.08)', 'rgba(156,163,175,0.06)', 'rgba(205,127,50,0.06)'];

const RankingBoard: React.FC = () => {
  const entries = useRankingStore((s) => s.entries);
  const activeType = useRankingStore((s) => s.activeType);
  const fetchRanking = useRankingStore((s) => s.fetchRanking);

  return (
    <div className="space-y-4 animate-fade-in">
      <Tabs
        items={rankTypes}
        activeKey={activeType}
        onChange={(k) => fetchRanking(k as RankingType)}
        compact
        className="overflow-x-auto no-scrollbar"
      />

      {/* 前三名突出展示 */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 0, 2].map((idx) => {
          const entry = entries[idx];
          if (!entry) return null;
          return (
            <div
              key={entry.userId}
              className={`game-card p-3 text-center ${idx === 0 ? 'order-2 scale-105' : idx === 1 ? 'order-1' : 'order-3'}`}
              style={rankBgColors[idx] ? { background: rankBgColors[idx] } : {}}
            >
              <div
                className="w-10 h-10 rounded-full mx-auto flex items-center justify-center text-xl mb-2"
                style={{ background: `${rankColors[idx]}22`, border: `2px solid ${rankColors[idx]}` }}
              >
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
              </div>
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {entry.characterName}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                {entry.sect}
              </div>
              <div className="text-sm font-bold mt-1" style={{ color: rankColors[idx] }}>
                {formatNumber(entry.value)}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {entry.realm}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4名及以后 */}
      <div className="space-y-2">
        {entries.slice(3).map((entry) => (
          <div
            key={entry.userId}
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              background: entry.userId === 'user-001' ? 'rgba(212,168,67,0.08)' : 'rgba(0,0,0,0.2)',
              border: entry.userId === 'user-001' ? '1px solid rgba(212,168,67,0.3)' : '1px solid var(--color-border)',
            }}
          >
            <span
              className="w-7 text-center text-sm font-bold shrink-0"
              style={{ color: rankColors[3] }}
            >
              {entry.rank}
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
              style={{ background: 'rgba(30,40,60,0.8)', border: '1px solid var(--color-border)' }}
            >
              {entry.avatar || '⚔'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: entry.userId === 'user-001' ? 'var(--color-gold)' : 'var(--color-text-primary)' }}>
                  {entry.characterName}
                </span>
                {entry.userId === 'user-001' && <span className="text-xs" style={{ color: 'var(--color-jade)' }}>（我）</span>}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {entry.sect} · {entry.realm}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text-gold)' }}>
                {formatNumber(entry.value)}
              </div>
              <div className="flex items-center justify-end gap-0.5 mt-0.5">
                {!entry.change || entry.change === 0 ? (
                  <Minus size={10} style={{ color: 'var(--color-text-muted)' }} />
                ) : entry.change > 0 ? (
                  <>
                    <TrendingUp size={10} style={{ color: '#4ade80' }} />
                    <span className="text-xs" style={{ color: '#4ade80' }}>+{entry.change}</span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={10} style={{ color: '#f87171' }} />
                    <span className="text-xs" style={{ color: '#f87171' }}>{entry.change}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingBoard;
