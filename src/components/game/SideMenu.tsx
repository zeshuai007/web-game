import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Flame, Map, Scroll, Package, ShoppingBag, Trophy, Users, Settings, Home } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useSocialStore } from '../../store/socialStore';
import { useQuestStore } from '../../store/questStore';

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame size={18} />,
  Map: <Map size={18} />,
  Scroll: <Scroll size={18} />,
  Package: <Package size={18} />,
  ShoppingBag: <ShoppingBag size={18} />,
  Trophy: <Trophy size={18} />,
  Users: <Users size={18} />,
  Settings: <Settings size={18} />,
  Home: <Home size={18} />,
};

const navItems = [
  { key: 'lobby', label: '大厅', icon: 'Home', path: '/lobby' },
  { key: 'cultivation', label: '修炼', icon: 'Flame', path: '/cultivation' },
  { key: 'explore', label: '探索', icon: 'Map', path: '/explore' },
  { key: 'quests', label: '任务', icon: 'Scroll', path: '/quests' },
  { key: 'inventory', label: '背包', icon: 'Package', path: '/inventory' },
  { key: 'shop', label: '坊市', icon: 'ShoppingBag', path: '/shop' },
  { key: 'ranking', label: '排行', icon: 'Trophy', path: '/ranking' },
  { key: 'social', label: '社交', icon: 'Users', path: '/social' },
  { key: 'settings', label: '设置', icon: 'Settings', path: '/settings' },
];

interface SideMenuProps {
  /** 移动端：强制展示 */
  forceOpen?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ forceOpen = false }) => {
  const location = useLocation();
  const setSideMenuOpen = useUIStore((s) => s.setSideMenuOpen);
  const unreadSocial = useSocialStore((s) => s.getUnreadCount());
  const claimableQuests = useQuestStore((s) =>
    s.quests.filter((q) => q.status === 'claimable').length
  );

  const badges: Record<string, number> = {
    social: unreadSocial,
    quests: claimableQuests,
  };

  const handleNavClick = () => {
    setSideMenuOpen(false);
  };

  return (
    <nav
      className={`flex flex-col h-full w-56 shrink-0 py-3 overflow-y-auto ${forceOpen ? '' : 'hidden lg:flex'}`}
      style={{
        background: 'linear-gradient(180deg, rgba(13,17,23,0.98) 0%, rgba(18,22,30,0.95) 100%)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* 宗门标志 */}
      <div
        className="px-5 pb-4 mb-2"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">⚔️</div>
          <div className="text-xs font-bold tracking-widest text-glow-gold">天道仙途</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>道法自然</div>
        </div>
      </div>

      {/* 导航项 */}
      <div className="flex-1 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const badge = badges[item.key] ?? 0;

          return (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={handleNavClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative group"
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(212,168,67,0.12), rgba(139,105,20,0.08))' : 'transparent',
                color: isActive ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                border: isActive ? '1px solid rgba(212,168,67,0.2)' : '1px solid transparent',
              }}
            >
              {/* 激活状态左侧装饰条 */}
              {isActive && (
                <div
                  className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                  style={{ background: 'var(--color-gold)' }}
                />
              )}

              <span className={isActive ? '' : 'group-hover:text-[--color-text-primary] transition-colors'}>
                {iconMap[item.icon]}
              </span>
              <span className="text-sm font-medium">{item.label}</span>

              {badge > 0 && (
                <span
                  className="ml-auto flex items-center justify-center rounded-full min-w-[18px] h-[18px] text-white"
                  style={{ background: 'var(--color-vermillion)', fontSize: '10px', padding: '0 4px' }}
                >
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* 底部版本信息 */}
      <div className="px-5 pt-3 mt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
          v1.0.0 · 仙途正道
        </div>
      </div>
    </nav>
  );
};

export default SideMenu;
