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
        background: 'rgba(13,17,23,0.97)',
        borderTop: '1px solid var(--color-border-gold)',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {quickActions.map((action) => {
        const isActive = location.pathname === action.path;
        return (
          <button
            key={action.key}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all"
            style={{
              color: isActive ? action.color : 'var(--color-text-muted)',
              background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
            }}
          >
            {action.icon}
            <span className="text-xs">{action.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomActionBar;
