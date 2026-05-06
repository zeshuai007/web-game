import React from 'react';
import InventoryGrid from '../components/game/InventoryGrid';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const InventoryPage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/inventory.png" className="-z-10" opacity={0.28} glowColor="rgba(167, 139, 250, 0.1)" />
      <h1 className="text-xl font-bold text-glow-gold">储物袋</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        收纳法宝、丹药、材料，整理好你的修炼家当。
      </p>
      <InventoryGrid />
    </div>
  );
};

export default InventoryPage;
