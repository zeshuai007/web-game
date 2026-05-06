import React from 'react';
import { usePlayerStore } from '../../store/playerStore';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { formatNumber } from '../../utils/index';
import { EQUIPMENT_SLOT_NAMES, RARITY_COLORS, RARITY_NAMES } from '../../constants/index';
import type { EquipmentSlot } from '../../types/index';

const equipSlots: EquipmentSlot[] = ['weapon', 'armor', 'headgear', 'footwear', 'treasure', 'pet'];

const CharacterPanel: React.FC = () => {
  const character = usePlayerStore((s) => s.character);
  if (!character) return null;

  const { attributes, realm } = character;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 角色基本信息 */}
      <div className="game-card p-4">
        <div className="flex items-center gap-4">
          {/* 旋转光晕头像 */}
          <div
            className="relative rounded-xl shrink-0 overflow-hidden"
            style={{ width: 68, height: 68, boxShadow: `0 0 16px ${realm.color}55` }}
          >
            {/* 旋转渐变边框 */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, ${realm.color} 35%, transparent 65%)`,
                animation: 'borderRotate 3s linear infinite',
              }}
            />
            {/* 头像内容 */}
            <div
              className="absolute inset-[2px] rounded-[10px] flex items-center justify-center text-3xl"
              style={{ background: 'linear-gradient(135deg, #1a2540, #2d3f60)' }}
            >
              {character.avatar || '⚔'}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-gold)' }}>
                {character.name}
              </span>
              <Badge variant="gold">{character.title}</Badge>
              <Badge variant="jade">{character.sect}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium" style={{ color: realm.color }}>
                {realm.name}·{realm.subLevel}层
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                战力：<span style={{ color: 'var(--color-gold)' }}>{formatNumber(character.battlePower)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 属性条 */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs w-10 shrink-0" style={{ color: '#ef4444' }}>气血</span>
            <ProgressBar value={attributes.hp} max={attributes.maxHp} variant="hp" height={8} className="flex-1" showLabel label={`${attributes.hp}/${attributes.maxHp}`} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs w-10 shrink-0" style={{ color: '#3b82f6' }}>灵力</span>
            <ProgressBar value={attributes.mp} max={attributes.maxMp} variant="mp" height={8} className="flex-1" showLabel label={`${attributes.mp}/${attributes.maxMp}`} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs w-10 shrink-0" style={{ color: '#f59e0b' }}>修为</span>
            <ProgressBar value={character.experience} max={character.nextLevelExp} variant="exp" height={8} className="flex-1" showLabel label={`${character.experience}/${character.nextLevelExp}`} />
          </div>
        </div>
      </div>

      {/* 基础属性 */}
      <div className="game-card p-4">
        <h3 className="text-sm font-semibold mb-3 text-glow-gold">基础属性</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '攻击', value: attributes.attack, icon: '⚔️' },
            { label: '防御', value: attributes.defense, icon: '🛡️' },
            { label: '速度', value: attributes.speed, icon: '💨' },
            { label: '悟性', value: attributes.comprehension, icon: '🧠' },
            { label: '机缘', value: attributes.luck, icon: '🍀' },
            { label: '灵力', value: attributes.spirit, icon: '✨' },
          ].map((attr) => (
            <div
              key={attr.label}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)' }}
            >
              <span className="text-sm">{attr.icon}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{attr.label}</span>
              <span className="ml-auto text-xs font-semibold" style={{ color: 'var(--color-text-gold)' }}>
                {attr.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 装备 */}
      <div className="game-card p-4">
        <h3 className="text-sm font-semibold mb-3 text-glow-gold">装备栏</h3>
        <div className="grid grid-cols-3 gap-2">
          {equipSlots.map((slot) => {
            const equip = character.equipment[slot];
            return (
              <div
                key={slot}
                className="flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                style={{
                  background: equip ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)',
                  border: equip ? `1px solid ${RARITY_COLORS[equip.rarity]}44` : '1px dashed var(--color-border)',
                  minHeight: 70,
                  justifyContent: 'center',
                }}
              >
                {equip ? (
                  <>
                    <span className="text-2xl">{equip.icon}</span>
                    <span className="text-xs text-center leading-tight truncate w-full text-center" style={{ color: RARITY_COLORS[equip.rarity] }}>
                      {equip.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {RARITY_NAMES[equip.rarity]}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl opacity-30">○</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {EQUIPMENT_SLOT_NAMES[slot]}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* realm进度 */}
      <RealmProgress />
    </div>
  );
};

/** 境界突破进度 */
const RealmProgress: React.FC = () => {
  const character = usePlayerStore((s) => s.character);
  if (!character) return null;
  const { realm, realmProgress } = character;

  return (
    <div className="game-card p-4">
      <h3 className="text-sm font-semibold mb-3 text-glow-gold">境界修炼</h3>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: `${realm.color}22`, border: `2px solid ${realm.color}`, color: realm.color }}
        >
          {realm.subLevel}/{realm.maxSubLevel}
        </div>
        <div>
          <div className="text-sm font-medium" style={{ color: realm.color }}>{realm.name}·{realm.subLevel}层</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{realm.description}</div>
        </div>
      </div>
      <ProgressBar value={realmProgress} max={100} variant="realm" height={10} showLabel label={`境界进度`} />
      {realmProgress >= 100 && (
        <div className="mt-2 text-xs" style={{ color: 'var(--color-jade)' }}>
          ✨ 修为圆满，可突破境界
        </div>
      )}
    </div>
  );
};

export { RealmProgress };
export default CharacterPanel;
