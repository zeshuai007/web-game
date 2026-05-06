import React from 'react';
import CultivationPanel from '../components/game/CultivationPanel';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const CultivationPage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/cultivation.png" className="-z-10" opacity={0.3} glowColor="rgba(245, 158, 11, 0.12)" />
      <h1 className="text-xl font-bold text-glow-gold">修炼道场</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        道法自然，修炼无止。选择修炼方式，提升境界修为。
      </p>
      <CultivationPanel />
    </div>
  );
};

export default CultivationPage;
