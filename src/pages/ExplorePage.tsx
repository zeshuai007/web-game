import React from 'react';
import ExploreMap from '../components/game/ExploreMap';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const ExplorePage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/explore.png" className="-z-10" opacity={0.2} />
      <h1 className="text-xl font-bold text-glow-gold">灵云大陆</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        天地广阔，踏入未知，奇遇与危险并存。消耗体力探索各地，获取灵石与宝物。
      </p>
      <ExploreMap />
    </div>
  );
};

export default ExplorePage;
