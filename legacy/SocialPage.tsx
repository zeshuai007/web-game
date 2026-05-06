import React from 'react';
import SocialPanel from '../components/game/SocialPanel';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const SocialPage: React.FC = () => {
  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/social.png" className="-z-10" opacity={0.28} glowColor="rgba(52, 211, 153, 0.1)" />
      <h1 className="text-xl font-bold text-glow-gold">道友交流</h1>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        结交道友，切磋交流，或同入宗门，共谋大道。
      </p>
      <SocialPanel />
    </div>
  );
};

export default SocialPage;
