import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = '搜寻...',
  className = '',
}) => {
  const [internal, setInternal] = useState('');
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const handleChange = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${className}`}
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid var(--color-border)',
      }}
    >
      <Search size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
      <input
        className="flex-1 bg-transparent outline-none text-sm"
        style={{ color: 'var(--color-text-primary)', minWidth: 0 }}
        placeholder={placeholder}
        value={current}
        onChange={(e) => handleChange(e.target.value)}
      />
      {current && (
        <button onClick={() => handleChange('')} className="hover:opacity-70 transition-opacity">
          <X size={12} style={{ color: 'var(--color-text-muted)' }} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
