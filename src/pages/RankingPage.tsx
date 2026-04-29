import React from 'react';
import RankingBoard from '../components/game/RankingBoard';

const RankingPage: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-glow-gold">天道榜</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        英雄以战力论高下，圣者以境界证大道。且看谁主沉浮！
      </p>
      <RankingBoard />
    </div>
  );
};

export default RankingPage;
