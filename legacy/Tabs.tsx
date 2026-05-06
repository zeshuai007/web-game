import React from 'react';

interface TabItem {
  key: string;
  label: React.ReactNode;
  badge?: number;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
  compact?: boolean;
}

const Tabs: React.FC<TabsProps> = ({ items, activeKey, onChange, className = '', compact = false }) => {
  return (
    <div
      className={`flex gap-1 ${compact ? 'p-1' : 'p-1.5'} rounded-lg ${className}`}
      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }}
    >
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`relative flex items-center gap-1.5 ${compact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'} rounded-md transition-all duration-200 whitespace-nowrap font-medium`}
          style={
            activeKey === item.key
              ? {
                  background: 'linear-gradient(135deg, #2a1f0a, #3d2e0e)',
                  color: 'var(--color-gold)',
                  boxShadow: '0 0 8px rgba(212,168,67,0.2)',
                  border: '1px solid var(--color-border-gold)',
                }
              : {
                  background: 'transparent',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid transparent',
                }
          }
        >
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span
              className="inline-flex items-center justify-center text-xs rounded-full px-1.5 min-w-[18px] h-[18px]"
              style={{ background: 'var(--color-vermillion)', color: '#fff', fontSize: '10px' }}
            >
              {item.badge > 99 ? '99+' : item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
