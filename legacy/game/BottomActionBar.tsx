import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, Map, Scroll, Package, ShoppingBag, Users } from 'lucide-react';

const quickActions = [
  { key: 'cultivation', label: '修炼', icon: <Flame size={20} />, path: '/cultivation', color: '#f59e0b' },
  { key: 'explore', label: '探索', icon: <Map size={20} />, path: '/explore', color: '#4ade80' },
  { key: 'quests', label: '任务', icon: <Scroll size={20} />, path: '/quests', color: '#60a5fa' },
  { key: 'inventory', label: '背包', icon: <Package size={20} />, path: '/inventory', color: '#a78bfa' },
  { key: 'shop', label: '坊市', icon: <ShoppingBag size={20} />, path: '/shop', color: '#f87171' },
  { key: 'social', label: '社交', icon: <Users size={20} />, path: '/social', color: '#34d399' },
];

const BottomActionBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden flex items-center justify-around px-2 py-2"
      style={{
        background: 'linear-gradient(180deg, rgba(13,17,23,0.98) 0%, rgba(18,22,30,0.97) 100%)',
        borderTop: '1px solid var(--color-border-gold)',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.5), 0 0 20px rgba(212, 168, 67, 0.05)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* 顶部金色光带 */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
          boxShadow: '0 0 8px var(--color-gold)',
        }}
      />

      {quickActions.map((action) => {
        const isActive = location.pathname === action.path;
        return (
          <button
            key={action.key}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative group"
            style={{
              color: isActive ? action.color : 'var(--color-text-muted)',
              background: isActive ? `rgba(255,255,255,0.08)` : 'transparent',
              transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            {/* 激活状态背景光效 */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `radial-gradient(circle, ${action.color}15 0%, transparent 70%)`,
                  boxShadow: `0 0 12px ${action.color}30`,
                }}
              />
            )}

            {/* 悬停光效 */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
              }}
            />

            <span 
              className={`transition-all duration-200 ${isActive ? 'scale-115' : 'group-hover:scale-110'}`}
              style={{
                filter: isActive ? `drop-shadow(0 0 6px ${action.color})` : 'none',
              }}
            >
              {action.icon}
            </span>
            <span className={`text-xs font-medium transition-all duration-200 ${isActive ? 'font-bold' : ''}`}>
              {action.label}
            </span>

            {/* 激活状态底部指示点 */}
            {isActive && (
              <div
                className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                style={{
                  background: action.color,
                  boxShadow: `0 0 6px ${action.color}`,
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomActionBar;
