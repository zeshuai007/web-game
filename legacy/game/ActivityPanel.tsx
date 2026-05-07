import React from 'react';
import { Sparkles, Clock, Flame } from 'lucide-react';
import { mockActivities } from '../../mock/index';
import type { Activity } from '../../types/index';
import Button from '../ui/Button';

function getStatusStyle(status: Activity['status']): React.CSSProperties {
  if (status === 'active') return { color: '#4ade80' };
  if (status === 'upcoming') return { color: 'var(--color-gold)' };
  return { color: 'var(--color-text-muted)' };
}

const ActivityPanel: React.FC = () => {
  return (
    <div className="game-card">
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
        <span className="text-sm font-semibold text-glow-gold">时令活动</span>
      </div>
      <div className="p-3 space-y-2">
        {mockActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--color-border)' }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
              style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)' }}
            >
              {act.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {act.name}
                </span>
                {act.isNew && (
                  <span className="text-xs px-1 rounded" style={{ background: '#16a34a', color: '#bbf7d0' }}>新</span>
                )}
                {act.isHot && <Flame size={10} style={{ color: '#f87171', flexShrink: 0 }} />}
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>
                奖励：{act.rewardHint}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Clock size={10} style={{ color: 'var(--color-text-muted)' }} />
                <span className="text-xs" style={getStatusStyle(act.status)}>
                  {act.status === 'active' ? '进行中' : act.status === 'upcoming' ? '即将开始' : '已结束'}
                </span>
              </div>
            </div>
            {act.status === 'active' && (
              <Button variant="gold" size="sm" className="shrink-0">
                前往
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPanel;
