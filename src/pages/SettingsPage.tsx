import React from 'react';
import SettingsPanel from '../components/game/SettingsPanel';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-glow-gold">仙途设置</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        调整游戏各项参数，让修仙之路更加顺畅舒适。
      </p>
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;
