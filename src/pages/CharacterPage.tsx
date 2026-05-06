import React, { useState } from 'react';
import { usePlayerStore } from '../store/playerStore';
import CharacterPanel from '../components/game/CharacterPanel';
import SkillList from '../components/game/SkillList';
import Tabs from '../components/ui/Tabs';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const tabs = [
  { key: 'overview', label: '角色总览' },
  { key: 'skills', label: '技能心法' },
  { key: 'realm', label: '境界修炼' },
];

const CharacterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const character = usePlayerStore((s) => s.character);

  if (!character) return null;

  return (
    <div className="relative space-y-4 animate-fade-in">
      <PageAtmosphere src="/images/pages/character.png" className="-z-10" opacity={0.32} glowColor="rgba(126, 203, 161, 0.1)" />
      <h1 className="text-xl font-bold text-glow-gold">道友详情</h1>

      <Tabs items={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && <CharacterPanel />}
      {activeTab === 'skills' && (
        <div className="game-card p-4">
          <h3 className="text-sm font-semibold mb-4 text-glow-gold">技能心法</h3>
          <SkillList skills={character.skills} />
        </div>
      )}
      {activeTab === 'realm' && (
        <div className="game-card p-4 space-y-4">
          <h3 className="text-sm font-semibold text-glow-gold">境界突破条件</h3>
          <div
            className="p-4 rounded-lg"
            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)' }}
          >
            <div className="text-sm font-medium mb-2" style={{ color: character.realm.color }}>
              {character.realm.name}·{character.realm.subLevel}层 → 突破条件
            </div>
            <ul className="space-y-2">
              {character.realm.breakthroughConditions.map((cond, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span style={{ color: 'var(--color-jade)' }}>◆</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {character.realm.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterPage;
