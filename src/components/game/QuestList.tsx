import React, { useState } from 'react';
import { CheckCircle, Clock, Plus, ChevronDown, ChevronUp, Gift } from 'lucide-react';
import { useQuestStore } from '../../store/questStore';
import { useToast } from '../../hooks/useToast';
import Tabs from '../ui/Tabs';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { QUEST_TYPE_NAMES, QUEST_STATUS_NAMES, QUEST_DIFFICULTY_NAMES } from '../../constants/index';
import type { Quest } from '../../types/index';

const statusColors: Record<string, string> = {
  available: 'var(--color-text-muted)',
  active: 'var(--color-jade)',
  claimable: '#f59e0b',
  completed: '#4ade80',
};

const difficultyColors: Record<string, string> = {
  easy: '#4ade80',
  normal: '#f59e0b',
  hard: '#f87171',
  extreme: '#c084fc',
};

const QuestList: React.FC = () => {
  const quests = useQuestStore((s) => s.getFilteredQuests());
  const activeTab = useQuestStore((s) => s.activeTab);
  const setActiveTab = useQuestStore((s) => s.setActiveTab);
  const acceptQuest = useQuestStore((s) => s.acceptQuest);
  const claimQuest = useQuestStore((s) => s.claimQuest);
  const toast = useToast();

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'daily', label: QUEST_TYPE_NAMES.daily, badge: quests.filter(q => q.type === 'daily' && q.status === 'active').length },
    { key: 'sect', label: QUEST_TYPE_NAMES.sect },
    { key: 'bounty', label: QUEST_TYPE_NAMES.bounty },
    { key: 'event', label: QUEST_TYPE_NAMES.event },
  ];

  const handleAccept = async (quest: Quest) => {
    await acceptQuest(quest.id);
    toast.success(`已接取任务：${quest.name}`);
  };

  const handleClaim = async (quest: Quest) => {
    await claimQuest(quest.id);
    toast.success(`机缘已领取！`);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Tabs
        items={tabs}
        activeKey={activeTab}
        onChange={(k) => setActiveTab(k as typeof activeTab)}
        compact
      />

      {quests.length === 0 ? (
        <EmptyState title="此处无可修之事" description="换个类别或明日再来" />
      ) : (
        <div className="space-y-3">
          {quests.map((quest) => (
            <QuestItem
              key={quest.id}
              quest={quest}
              onAccept={handleAccept}
              onClaim={handleClaim}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const QuestItem: React.FC<{
  quest: Quest;
  onAccept: (q: Quest) => void;
  onClaim: (q: Quest) => void;
}> = ({ quest, onAccept, onClaim }) => {
  const [expanded, setExpanded] = useState(false);

  const completed = quest.objectives.filter((o) => o.completed).length;
  const total = quest.objectives.length;

  return (
    <div
      className="game-card p-4"
      style={
        quest.status === 'claimable'
          ? { border: '1px solid rgba(245,158,11,0.4)', boxShadow: '0 0 8px rgba(245,158,11,0.1)' }
          : {}
      }
    >
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* 类型标签 */}
        <div className="flex flex-col gap-1 shrink-0 mt-0.5">
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(212,168,67,0.1)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            {QUEST_TYPE_NAMES[quest.type]}
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ color: difficultyColors[quest.difficulty], border: `1px solid ${difficultyColors[quest.difficulty]}33` }}
          >
            {QUEST_DIFFICULTY_NAMES[quest.difficulty]}
          </span>
        </div>

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {quest.name}
            </span>
            {quest.status === 'claimable' && (
              <Badge variant="gold">可领取</Badge>
            )}
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {quest.description}
          </p>
          {/* 进度 */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-xs"
              style={{ color: statusColors[quest.status] }}
            >
              {QUEST_STATUS_NAMES[quest.status]}
            </span>
            {quest.status !== 'available' && quest.status !== 'completed' && (
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {completed}/{total} 目标
              </span>
            )}
          </div>
        </div>

        {/* 操作 */}
        <div className="shrink-0 flex flex-col gap-2 items-end">
          {quest.status === 'available' && (
            <Button variant="jade" size="sm" onClick={(e) => { e.stopPropagation(); onAccept(quest); }}>
              <Plus size={12} className="mr-1" /> 接取
            </Button>
          )}
          {quest.status === 'claimable' && (
            <Button variant="gold" size="sm" onClick={(e) => { e.stopPropagation(); onClaim(quest); }}>
              <Gift size={12} className="mr-1" /> 领取机缘
            </Button>
          )}
          {quest.status === 'completed' && (
            <CheckCircle size={16} style={{ color: '#4ade80' }} />
          )}
          {quest.status === 'active' && (
            <Clock size={16} style={{ color: 'var(--color-jade)' }} />
          )}
          <span style={{ color: 'var(--color-text-muted)' }}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
      </div>

      {/* 展开详情 */}
      {expanded && (
        <div className="mt-3 pt-3 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          {/* 目标 */}
          <div>
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>任务目标</h4>
            <div className="space-y-1.5">
              {quest.objectives.map((obj) => (
                <div key={obj.id} className="flex items-center gap-2">
                  <CheckCircle
                    size={12}
                    style={{ color: obj.completed ? '#4ade80' : 'var(--color-text-muted)', flexShrink: 0 }}
                  />
                  <span className="text-xs flex-1" style={{ color: obj.completed ? '#4ade80' : 'var(--color-text-secondary)', textDecoration: obj.completed ? 'line-through' : 'none' }}>
                    {obj.description}
                  </span>
                  {!obj.completed && (
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {obj.current}/{obj.required}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 奖励 */}
          <div>
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>任务奖励</h4>
            <div className="flex flex-wrap gap-2">
              {quest.rewards.experience && (
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
                  修为 +{quest.rewards.experience}
                </span>
              )}
              {quest.rewards.spiritStones && (
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(212,168,67,0.1)', color: 'var(--color-gold)', border: '1px solid rgba(212,168,67,0.2)' }}>
                  灵石 +{quest.rewards.spiritStones}
                </span>
              )}
              {quest.rewards.contribution && (
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(126,203,161,0.1)', color: 'var(--color-jade)', border: '1px solid rgba(126,203,161,0.2)' }}>
                  贡献 +{quest.rewards.contribution}
                </span>
              )}
              {quest.rewards.items?.map((item) => (
                <span key={item.itemId} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(60,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(60,130,246,0.2)' }}>
                  {item.name} ×{item.quantity}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestList;
