import React, { useState } from 'react';
import { Megaphone, ChevronDown, ChevronUp } from 'lucide-react';
import { mockAnnouncements } from '../../mock/index';
import { formatRelativeTime } from '../../utils/index';
import Badge from '../ui/Badge';

const typeColors: Record<string, string> = {
  maintenance: '#f87171',
  event: '#4ade80',
  update: '#60a5fa',
  notice: 'var(--color-gold)',
};
const typeLabels: Record<string, string> = {
  maintenance: '维护',
  event: '活动',
  update: '更新',
  notice: '公告',
};

const AnnouncementPanel: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="game-card">
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <Megaphone size={14} style={{ color: 'var(--color-gold)' }} />
        <span className="text-sm font-semibold text-glow-gold">宗门公告</span>
      </div>
      <div className="divide-y" style={{ '--tw-divide-opacity': 1, borderColor: 'var(--color-border)' } as React.CSSProperties}>
        {mockAnnouncements.map((ann) => (
          <div key={ann.id} className="px-4 py-3">
            <div
              className="flex items-start gap-2 cursor-pointer"
              onClick={() => setExpanded(expanded === ann.id ? null : ann.id)}
            >
              <span
                className="text-xs px-1.5 py-0.5 rounded shrink-0 mt-0.5"
                style={{ background: `${typeColors[ann.type]}22`, color: typeColors[ann.type], border: `1px solid ${typeColors[ann.type]}44` }}
              >
                {typeLabels[ann.type]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {ann.isImportant && <Badge variant="danger">重要</Badge>}
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {ann.title}
                  </p>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {formatRelativeTime(ann.publishedAt)}
                </p>
              </div>
              <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
                {expanded === ann.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </span>
            </div>
            {expanded === ann.id && (
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {ann.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPanel;
