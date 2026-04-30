import React, { useState } from 'react';
import { Lock, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../../store/playerStore';
import { mockMapLocations, mockRandomEvents } from '../../mock/index';
import { LOCATION_TYPE_NAMES } from '../../constants/index';
import type { MapLocation, RandomEvent } from '../../types/index';
import { useMotionPrefs } from '../../hooks/useMotionPrefs';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';

const locationTypeIcons: Record<string, string> = {
  spiritVein: '💠',
  secret: '🌀',
  cave: '🏔️',
  ruin: '🏛️',
  monsterDen: '👾',
  sect: '⛩️',
  town: '🏙️',
  boss: '🐉',
};

const locationStatusColors: Record<string, string> = {
  locked: '#6b7280',
  available: 'var(--color-jade)',
  explored: '#f59e0b',
  completed: '#4ade80',
};

const ExploreMap: React.FC = () => {
  const character = usePlayerStore((s) => s.character);
  const updateStamina = usePlayerStore((s) => s.updateStamina);
  const toast = useToast();
  const { enableMotion } = useMotionPrefs();
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const [event, setEvent] = useState<RandomEvent | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  if (!character) return null;

  const handleExplore = (loc: MapLocation) => {
    if (loc.status === 'locked') {
      toast.warning(`需要达到 ${loc.requiredRealm} 才能进入此地`);
      return;
    }
    if (character.stamina < loc.requiredStamina) {
      toast.error(`体力不足！此处需要 ${loc.requiredStamina} 点体力`);
      return;
    }
    // 随机触发事件
    if (Math.random() > 0.5 && mockRandomEvents.length > 0) {
      const evt = mockRandomEvents[Math.floor(Math.random() * mockRandomEvents.length)];
      setEvent(evt);
    } else {
      updateStamina(-loc.requiredStamina);
      toast.success(`已消耗 ${loc.requiredStamina} 点体力，正在探索 ${loc.name}...`);
      setShowDetail(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 体力显示 */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }}
      >
        <Zap size={14} style={{ color: 'var(--color-jade)' }} />
        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          体力：<span style={{ color: 'var(--color-jade)' }}>{character.stamina}/{character.maxStamina}</span>
        </span>
      </div>

      {/* 地图区域 */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{
          height: 420,
          background: '#050c18',
          border: '1px solid var(--color-border-gold)',
        }}
      >
        {/* 地图背景图 */}
        <img
          src="/images/explore-map-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none select-none"
          draggable={false}
        />
        {/* 色调叠加，增强节点可读性 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(126,203,161,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(212,168,67,0.12) 0%, transparent 40%)',
          }}
        />

        {/* 灵脉连接线（SVG） */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }}>
          <defs>
            <linearGradient id="veinGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7ecba1" stopOpacity="0" />
              <stop offset="50%" stopColor="#7ecba1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7ecba1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="veinGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a843" stopOpacity="0" />
              <stop offset="50%" stopColor="#d4a843" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d4a843" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 太清宗 → 后山灵脉 */}
          <line x1="50%" y1="50%" x2="65%" y2="40%" stroke="url(#veinGrad1)" strokeWidth="1" strokeDasharray="6 4" style={{ animation: 'dashFlow 3s linear infinite' }} />
          {/* 太清宗 → 青云城 */}
          <line x1="50%" y1="50%" x2="30%" y2="60%" stroke="url(#veinGrad1)" strokeWidth="1" strokeDasharray="6 4" style={{ animation: 'dashFlow 4s linear infinite' }} />
          {/* 太清宗 → 幽暗森林 */}
          <line x1="50%" y1="50%" x2="75%" y2="65%" stroke="url(#veinGrad2)" strokeWidth="1" strokeDasharray="6 4" style={{ animation: 'dashFlow 3.5s linear infinite reverse' }} />
          {/* 太清宗 → 魔虎巢穴 */}
          <line x1="50%" y1="50%" x2="55%" y2="80%" stroke="url(#veinGrad2)" strokeWidth="1" strokeDasharray="6 4" style={{ animation: 'dashFlow 5s linear infinite' }} />
        </svg>

        {/* 地图标题 */}
        <div className="absolute top-3 left-3">
          <span className="text-sm font-bold text-glow-gold px-3 py-1 rounded" style={{ background: 'rgba(0,0,0,0.5)' }}>
            ⛅ 灵云大陆
          </span>
        </div>

        {/* 地图节点 */}
        {mockMapLocations.map((loc) => (
          <MapNode
            key={loc.id}
            location={loc}
            onClick={() => { setSelected(loc); setShowDetail(true); }}
            enableMotion={enableMotion}
          />
        ))}
      </div>

      {/* 地图图例 */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(LOCATION_TYPE_NAMES).map(([type, name]) => (
          <div key={type} className="flex items-center gap-1">
            <span className="text-sm">{locationTypeIcons[type]}</span>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{name}</span>
          </div>
        ))}
      </div>

      {/* 地点详情弹窗 */}
      <Modal
        open={showDetail && !!selected}
        onClose={() => setShowDetail(false)}
        title={selected ? `${locationTypeIcons[selected.type]} ${selected.name}` : ''}
        width={380}
        footer={
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowDetail(false)}>
              离开
            </Button>
            <Button
              variant={selected?.status === 'locked' ? 'outline' : 'jade'}
              size="sm"
              onClick={() => selected && handleExplore(selected)}
            >
              {selected?.status === 'locked' ? (
                <><Lock size={12} className="mr-1" /> 已封印</>
              ) : (
                '踏入秘境'
              )}
            </Button>
          </div>
        }
      >
        {selected && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${locationStatusColors[selected.status]}22`, color: locationStatusColors[selected.status], border: `1px solid ${locationStatusColors[selected.status]}44` }}>
                {selected.status === 'locked' ? '封印' : selected.status === 'available' ? '可探索' : selected.status === 'explored' ? '已探索' : '已完成'}
              </span>
              {selected.isElite && <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>精英</span>}
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{selected.description}</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                所需境界：<span style={{ color: 'var(--color-jade)' }}>{selected.requiredRealm || '无限制'}</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                消耗体力：<span style={{ color: 'var(--color-gold)' }}>{selected.requiredStamina}</span>
              </div>
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              可能收获：<span style={{ color: 'var(--color-gold)' }}>{selected.rewardHint}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* 随机事件弹窗 */}
      <RandomEventPanel
        event={event}
        onClose={() => setEvent(null)}
      />
    </div>
  );
};

/** 地图节点 */
const MapNode: React.FC<{ location: MapLocation; onClick: () => void; enableMotion: boolean }> = ({
  location,
  onClick,
  enableMotion,
}) => {
  const color = locationStatusColors[location.status];
  const isBoss = location.type === 'boss';
  const isAvailable = location.status === 'available';

  return (
    <motion.button
      onClick={onClick}
      className="absolute flex flex-col items-center gap-1 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
      title={location.name}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-sm relative"
        style={{
          background: location.status === 'locked' ? 'rgba(50,50,60,0.8)' : 'rgba(0,0,0,0.6)',
          border: `2px solid ${color}`,
          boxShadow: location.status !== 'locked' ? `0 0 8px ${color}66` : 'none',
          animation: isBoss ? 'float 3s ease-in-out infinite' : isAvailable ? 'pulse-jade 2s ease-in-out infinite' : undefined,
        }}
      >
        {location.status === 'locked' && (
          <Lock size={12} style={{ color: '#6b7280', position: 'absolute', top: -4, right: -4 }} />
        )}
        {locationTypeIcons[location.type] || '●'}
        {location.isElite && (
          <Star size={10} style={{ color: '#f59e0b', position: 'absolute', top: -4, left: -4 }} />
        )}
      </div>
      <span
        className="text-xs font-medium px-1 rounded"
        style={{
          color,
          background: 'rgba(0,0,0,0.7)',
          whiteSpace: 'nowrap',
          fontSize: '10px',
        }}
      >
        {location.name}
      </span>
    </motion.button>
  );
};

/** 随机事件面板 */
const RandomEventPanel: React.FC<{ event: RandomEvent | null; onClose: () => void }> = ({
  event,
  onClose,
}) => {
  const toast = useToast();

  const handleOption = (opt: RandomEvent['options'][0]) => {
    toast.success(opt.outcome);
    onClose();
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Modal
      open={!!event}
      onClose={onClose}
      title={event ? `${event.icon} ${event.title}` : ''}
      width={400}
    >
      {event && (
        <div className="space-y-4">
          {/* Icon bounce */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="text-4xl text-center"
          >
            {event.icon}
          </motion.div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {event.description}
          </p>
          <motion.div
            className="space-y-2"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {event.options.map((opt) => (
              <motion.div key={opt.id} variants={itemVariants}>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleOption(opt)}
                >
                  {opt.text}
                  {opt.cost && (
                    <span className="ml-auto text-xs opacity-70">
                      消耗 {opt.cost.amount} {opt.cost.type}
                    </span>
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </Modal>
  );
};

export { MapNode, RandomEventPanel };
export default ExploreMap;
