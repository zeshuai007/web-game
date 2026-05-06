import React from 'react';
import SettingsPanel from '../components/game/SettingsPanel';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const SettingsPage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/settings.png" className="-z-10" opacity={0.25} glowColor="rgba(148, 163, 184, 0.1)" />
      <h1 className="text-xl font-bold text-glow-gold">仙途设置</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        调整游戏各项参数，让修仙之路更加顺畅舒适。
      </p>
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;
