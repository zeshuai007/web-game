import React from 'react';
import ShopGrid from '../components/game/ShopGrid';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const ShopPage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/shop.png" className="-z-10" opacity={0.2} />
      <h1 className="text-xl font-bold text-glow-gold">灵宝坊市</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        前往坊市，以灵石换取修炼资源，以元宝购置神兵法器。
      </p>
      <ShopGrid />
    </div>
  );
};

export default ShopPage;
