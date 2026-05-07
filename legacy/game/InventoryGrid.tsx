import React, { useState } from 'react';
import { useInventoryStore } from '../../store/inventoryStore';
import { ITEM_CATEGORY_NAMES, RARITY_COLORS, RARITY_NAMES } from '../../constants/index';
import type { InventoryItem, ItemCategory } from '../../types/index';
import Tabs from '../ui/Tabs';
import SearchBar from '../ui/SearchBar';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import { Lock, Unlock } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useMotionPrefs } from '../../hooks/useMotionPrefs';

const categories: Array<{ key: ItemCategory | 'all'; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'pill', label: '丹药' },
  { key: 'equipment', label: '装备' },
  { key: 'material', label: '材料' },
  { key: 'talisman', label: '符箓' },
  { key: 'consumable', label: '消耗' },
  { key: 'quest', label: '任务' },
  { key: 'misc', label: '杂项' },
];

const InventoryGrid: React.FC = () => {
  const items = useInventoryStore((s) => s.getFilteredItems());
  const activeCategory = useInventoryStore((s) => s.activeCategory);
  const setActiveCategory = useInventoryStore((s) => s.setActiveCategory);
  const setSearchKeyword = useInventoryStore((s) => s.setSearchKeyword);
  const toggleLock = useInventoryStore((s) => s.toggleLock);
  const removeItem = useInventoryStore((s) => s.removeItem);
  const toast = useToast();
  const { enableMotion } = useMotionPrefs();

  const [selected, setSelected] = useState<InventoryItem | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const allItems = useInventoryStore((s) => s.items);

  const handleUse = () => {
    if (!selected) return;
    removeItem(selected.id, 1);
    toast.success(`使用了 ${selected.name}${selected.effect ? `，${selected.effect}` : ''}`);
    setShowDetail(false);
  };

  const handleSell = () => {
    if (!selected) return;
    removeItem(selected.id, 1);
    toast.success(`出售 ${selected.name}，获得灵石 ${selected.sellPrice}`);
    setShowDetail(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 背包容量 */}
      <div
        className="flex items-center justify-between px-4 py-2 rounded-lg text-xs"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }}
      >
        <span style={{ color: 'var(--color-text-secondary)' }}>
          背包容量：<span style={{ color: 'var(--color-gold)' }}>{allItems.length}/120</span>
        </span>
        <span style={{ color: 'var(--color-text-muted)' }}>整理背包</span>
      </div>

      {/* 分类 + 搜索 */}
      <div className="space-y-2">
        <Tabs
          items={categories}
          activeKey={activeCategory}
          onChange={(k) => setActiveCategory(k as ItemCategory | 'all')}
          compact
          className="overflow-x-auto no-scrollbar"
        />
        <SearchBar
          placeholder="搜寻法宝..."
          onChange={setSearchKeyword}
        />
      </div>

      {/* 物品网格 */}
      {items.length === 0 ? (
        <EmptyState title="此处空无一物" description="前往探索或完成任务获取法宝" />
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => { setSelected(item); setShowDetail(true); }}
              onLockToggle={() => toggleLock(item.id)}
              enableMotion={enableMotion}
            />
          ))}
        </div>
      )}

      {/* 物品详情 */}
      <Modal
        open={showDetail && !!selected}
        onClose={() => setShowDetail(false)}
        title={selected?.name}
        width={360}
        footer={
          <div className="flex gap-2 flex-wrap">
            {selected?.usable && (
              <Button variant="jade" size="sm" onClick={handleUse}>使用</Button>
            )}
            {selected?.sellable && (
              <Button variant="outline" size="sm" onClick={handleSell}>
                出售 {selected.sellPrice}灵石
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => { if (selected) toggleLock(selected.id); }}>
              {selected?.isLocked ? <Unlock size={12} className="mr-1" /> : <Lock size={12} className="mr-1" />}
              {selected?.isLocked ? '解锁' : '锁定'}
            </Button>
          </div>
        }
      >
        {selected && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: `2px solid ${RARITY_COLORS[selected.rarity]}66`,
                }}
              >
                {selected.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium" style={{ color: RARITY_COLORS[selected.rarity] }}>
                    {selected.name}
                  </span>
                  <Badge variant="gold">{RARITY_NAMES[selected.rarity]}</Badge>
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {ITEM_CATEGORY_NAMES[selected.category]} · 数量：{selected.quantity}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {selected.description}
            </p>
            {selected.effect && (
              <div
                className="px-3 py-2 rounded text-xs"
                style={{ background: 'rgba(126,203,161,0.1)', color: 'var(--color-jade)', border: '1px solid rgba(126,203,161,0.2)' }}
              >
                效果：{selected.effect}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

/** 单个物品格子 */
const ItemCard: React.FC<{
  item: InventoryItem;
  onClick: () => void;
  onLockToggle: () => void;
  enableMotion: boolean;
}> = ({ item, onClick, enableMotion }) => {
  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-lg flex flex-col items-center justify-center gap-1 p-1 transition-transform ${enableMotion ? 'hover:scale-105' : ''}`}
      style={{
        background: 'rgba(0,0,0,0.3)',
        border: `1px solid ${RARITY_COLORS[item.rarity]}55`,
      }}
    >
      {enableMotion && item.rarity !== 'common' && (
        <div
          className="absolute -inset-6 opacity-25"
          style={{
            background:
              'linear-gradient(110deg, transparent 0%, rgba(212,168,67,0.18) 40%, rgba(126,203,161,0.16) 60%, transparent 100%)',
            transform: 'translateX(-30%)',
            animation: 'shimmer 4.5s ease-in-out infinite',
          }}
        />
      )}
      {item.isLocked && (
        <Lock
          size={8}
          className="absolute top-1 left-1"
          style={{ color: 'var(--color-gold)', opacity: 0.7 }}
        />
      )}
      <span className="text-2xl">{item.icon}</span>
      {item.quantity > 1 && (
        <span
          className="absolute bottom-1 right-1 text-xs font-bold"
          style={{ color: 'var(--color-text-primary)', fontSize: '9px' }}
        >
          {item.quantity > 999 ? '999+' : item.quantity}
        </span>
      )}
    </button>
  );
};

export { ItemCard };
export default InventoryGrid;
