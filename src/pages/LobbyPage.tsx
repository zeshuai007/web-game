import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useQuestStore } from '../store/questStore';
import { calcProgress, formatNumber } from '../utils/index';
import AnnouncementPanel from '../components/game/AnnouncementPanel';
import ActivityPanel from '../components/game/ActivityPanel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { Flame, Map, Scroll, Gift, Trophy, Sword } from 'lucide-react';

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const character = usePlayerStore((s) => s.character);
  const quests = useQuestStore((s) => s.quests);

  if (!character) return null;

  const claimableCount = quests.filter((q) => q.status === 'claimable').length;
  const expPct = calcProgress(character.experience, character.nextLevelExp);

  const quickEnters = [
    { label: '开始修炼', icon: <Flame size={20} />, path: '/cultivation', color: '#f59e0b', desc: '打坐·闭关·突破' },
    { label: '踏入秘境', icon: <Map size={20} />, path: '/explore', color: '#4ade80', desc: '探索·奇遇·宝藏' },
    { label: '接取任务', icon: <Scroll size={20} />, path: '/quests', color: '#60a5fa', desc: '日常·宗门·悬赏', badge: claimableCount },
    { label: '前往坊市', icon: <Gift size={20} />, path: '/shop', color: '#a78bfa', desc: '购买·兑换·礼包' },
    { label: '查看排行', icon: <Trophy size={20} />, path: '/ranking', color: '#f87171', desc: '战力·境界·宗门' },
    { label: '切磋对战', icon: <Sword size={20} />, path: '/explore', color: '#34d399', desc: '(即将开放)' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 欢迎语 + 境界信息 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="game-card p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(22,27,34,0.95) 0%, rgba(28,35,51,0.9) 100%)',
          border: '1px solid var(--color-border-gold)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1a2540, #2d3f60)',
              border: `2px solid ${character.realm.color}`,
              boxShadow: `0 0 16px ${character.realm.color}44`,
            }}
          >
            {character.avatar || '⚔'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-glow-gold">{character.name}</h2>
              <Badge variant="jade">{character.sect}</Badge>
              <Badge variant="gold">{character.title}</Badge>
            </div>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium" style={{ color: character.realm.color }}>
                {character.realm.name}·{character.realm.subLevel}层
              </span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                战力 <span style={{ color: 'var(--color-gold)' }}>{formatNumber(character.battlePower)}</span>
              </span>
            </div>
            {/* 修为进度 */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs shrink-0" style={{ color: '#f59e0b' }}>修为</span>
              <ProgressBar value={character.experience} max={character.nextLevelExp} variant="exp" height={6} className="flex-1" />
              <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>{expPct}%</span>
            </div>
          </div>
          {/* 货币 */}
          <div className="hidden sm:flex flex-col gap-1.5 text-right shrink-0">
            <div className="flex items-center gap-1 justify-end">
              <span>💎</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
                {formatNumber(character.spiritStones)}
              </span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <span>🔮</span>
              <span className="text-sm font-semibold" style={{ color: '#a78bfa' }}>
                {character.yuanbao}
              </span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <span>⚡</span>
              <span className="text-xs" style={{ color: 'var(--color-jade)' }}>
                {character.stamina}/{character.maxStamina}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 主内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：快速入口 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 快速入口 */}
          <Card title="快速入口">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickEnters.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                  style={{
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}33`,
                  }}
                >
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'var(--color-vermillion)' }}>
                      {item.badge}
                    </span>
                  ) : null}
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {item.label}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* 今日签到 */}
          <Card title="每日签到" extra={<span style={{ color: 'var(--color-jade)' }}>连签 7 天</span>}>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg"
                  style={{
                    background: i < 2 ? 'rgba(212,168,67,0.1)' : 'rgba(0,0,0,0.2)',
                    border: i < 2 ? '1px solid rgba(212,168,67,0.3)' : '1px solid var(--color-border)',
                  }}
                >
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>第{i + 1}天</span>
                  <span className="text-base">{i < 2 ? '✅' : i === 2 ? '💎' : '🎁'}</span>
                </div>
              ))}
            </div>
            <Button variant="gold" size="sm" className="mt-3 w-full">
              领取今日机缘
            </Button>
          </Card>
        </div>

        {/* 右侧：公告 + 活动 */}
        <div className="space-y-4">
          <AnnouncementPanel />
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
