import React, { useState } from 'react';
import { Bell, Menu, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useUIStore } from '../../store/uiStore';
import { Badge } from '../ui/index';
import { calcProgress, formatNumber } from '../../utils/index';
import ProgressBar from '../ui/ProgressBar';

const GameHeader: React.FC = () => {
  const navigate = useNavigate();
  const character = usePlayerStore((s) => s.character);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const sideMenuOpen = useUIStore((s) => s.sideMenuOpen);
  const setSideMenuOpen = useUIStore((s) => s.setSideMenuOpen);
  const [showNotif, setShowNotif] = useState(false);
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);

  if (!character) return null;

  const expPct = calcProgress(character.experience, character.nextLevelExp);

  return (
    <header
      className="relative z-30 flex items-center gap-3 px-4 py-2 h-14 shrink-0"
      style={{
        background: 'linear-gradient(180deg, rgba(13,17,23,0.98) 0%, rgba(22,27,34,0.95) 100%)',
        borderBottom: '1px solid var(--color-border-gold)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      }}
    >
      {/* 汉堡菜单（移动端） */}
      <button
        className="lg:hidden p-1.5 rounded hover:bg-white/10 transition-colors"
        onClick={() => setSideMenuOpen(!sideMenuOpen)}
      >
        {sideMenuOpen ? <X size={18} style={{ color: 'var(--color-gold)' }} /> : <Menu size={18} style={{ color: 'var(--color-gold)' }} />}
      </button>

      {/* 头像 + 角色名 */}
      <button
        onClick={() => navigate('/character')}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
          style={{
            background: 'linear-gradient(135deg, #1a2540, #2d3f60)',
            border: '2px solid var(--color-border-gold)',
          }}
        >
          {character.avatar || '⚔'}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-xs font-semibold leading-tight" style={{ color: 'var(--color-text-gold)' }}>
            {character.name}
          </div>
          <div className="text-xs" style={{ color: character.realm.color }}>
            {character.realm.name}·{character.realm.subLevel}层 · {character.sect}
          </div>
        </div>
      </button>

      {/* 属性条 */}
      <div className="hidden md:flex items-center gap-4 flex-1 mx-4">
        {/* HP */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-xs shrink-0" style={{ color: '#ef4444' }}>气血</span>
          <div className="flex-1">
            <ProgressBar value={character.attributes.hp} max={character.attributes.maxHp} variant="hp" height={5} />
          </div>
          <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            {character.attributes.hp}/{character.attributes.maxHp}
          </span>
        </div>
        {/* MP */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-xs shrink-0" style={{ color: '#3b82f6' }}>灵力</span>
          <div className="flex-1">
            <ProgressBar value={character.attributes.mp} max={character.attributes.maxMp} variant="mp" height={5} />
          </div>
          <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            {character.attributes.mp}/{character.attributes.maxMp}
          </span>
        </div>
        {/* EXP */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-xs shrink-0" style={{ color: '#f59e0b' }}>修为</span>
          <div className="flex-1">
            <ProgressBar value={character.experience} max={character.nextLevelExp} variant="exp" height={5} />
          </div>
          <span className="text-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            {Math.round(expPct)}%
          </span>
        </div>
      </div>

      {/* 右侧：货币 + 体力 + 通知 */}
      <div className="ml-auto flex items-center gap-3">
        {/* 灵石 */}
        <div className="hidden sm:flex items-center gap-1">
          <span className="text-base">💎</span>
          <span className="text-xs font-medium" style={{ color: 'var(--color-gold)' }}>
            {formatNumber(character.spiritStones)}
          </span>
        </div>
        {/* 元宝 */}
        <div className="hidden sm:flex items-center gap-1">
          <span className="text-base">🔮</span>
          <span className="text-xs font-medium" style={{ color: '#a78bfa' }}>
            {character.yuanbao}
          </span>
        </div>
        {/* 体力 */}
        <div className="hidden md:flex items-center gap-1">
          <span className="text-base">⚡</span>
          <span className="text-xs" style={{ color: 'var(--color-jade)' }}>
            {character.stamina}/{character.maxStamina}
          </span>
        </div>

        {/* 通知按钮 */}
        <div className="relative">
          <Badge count={unreadCount}>
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="p-1.5 rounded hover:bg-white/10 transition-colors"
            >
              <Bell size={16} style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          </Badge>

          {/* 通知下拉 */}
          {showNotif && (
            <div
              className="absolute right-0 top-10 w-72 game-card z-50 animate-fade-in"
              style={{ maxHeight: 320, overflowY: 'auto' }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="text-sm font-semibold text-glow-gold">仙缘通报</span>
              </div>
              {notifications.slice(0, 6).map((n) => (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid var(--color-border)', opacity: n.isRead ? 0.6 : 1 }}
                >
                  <div className="flex items-start gap-2">
                    {!n.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--color-vermillion)' }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text-gold)' }}>{n.title}</p>
                      <p className="text-xs mt-0.5 truncate-2" style={{ color: 'var(--color-text-secondary)' }}>{n.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="px-4 py-6 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  暂无消息
                </div>
              )}
            </div>
          )}
        </div>

        {/* 前往角色 */}
        <button
          onClick={() => navigate('/character')}
          className="hidden lg:flex items-center gap-1 text-xs hover:opacity-80"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          战力 <span style={{ color: 'var(--color-gold)' }}>{formatNumber(character.battlePower)}</span>
          <ChevronRight size={12} />
        </button>
      </div>
    </header>
  );
};

export default GameHeader;
