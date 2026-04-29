import React from 'react';
import InventoryGrid from '../components/game/InventoryGrid';

const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold text-glow-gold">储物袋</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        收纳法宝、丹药、材料，整理好你的修炼家当。
      </p>
      <InventoryGrid />
    </div>
  );
};

export default InventoryPage;
