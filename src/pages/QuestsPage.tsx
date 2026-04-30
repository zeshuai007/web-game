import React from 'react';
import QuestList from '../components/game/QuestList';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const QuestsPage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/quests.png" className="-z-10" opacity={0.2} />
      <h1 className="text-xl font-bold text-glow-gold">任务令</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        承接宗门使命，完成则获丰厚机缘。日常任务每日刷新，宗门任务需消耗贡献度。
      </p>
      <QuestList />
    </div>
  );
};

export default QuestsPage;
