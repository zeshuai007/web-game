import React, { useState } from 'react';
import { ShoppingCart, Flame } from 'lucide-react';
import { useShopStore } from '../../store/shopStore';
import { usePlayerStore } from '../../store/playerStore';
import type { ShopItem, ShopCategory } from '../../types/index';
import Tabs from '../ui/Tabs';
import Button from '../ui/Button';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../ui/Toast';
import { formatNumber } from '../../utils/index';

const categories: Array<{ key: ShopCategory | 'all'; label: string }> = [
  { key: 'hot', label: '热销' },
  { key: 'cultivation', label: '修炼' },
  { key: 'appearance', label: '外观' },
  { key: 'pet', label: '灵宠' },
  { key: 'package', label: '礼包' },
  { key: 'discount', label: '特惠' },
];

const ShopGrid: React.FC = () => {
  const items = useShopStore((s) => s.getFilteredItems());
  const activeCategory = useShopStore((s) => s.activeCategory);
  const setActiveCategory = useShopStore((s) => s.setActiveCategory);
  const character = usePlayerStore((s) => s.character);
  const updateSpiritStones = usePlayerStore((s) => s.updateSpiritStones);
  const toast = useToast();

  const [confirmItem, setConfirmItem] = useState<ShopItem | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!confirmItem || !character) return;
    setPurchasing(true);

    if (confirmItem.currency === 'spiritStone') {
      const cost = confirmItem.price;
      if (character.spiritStones < cost) {
        toast.error('灵石不足，道友请先赚取更多灵石');
        setPurchasing(false);
        setConfirmItem(null);
        return;
      }
      updateSpiritStones(-cost);
    }

    await new Promise((r) => setTimeout(r, 500));
    toast.success(`已购得 ${confirmItem.name}，恭喜道友！`);
    setPurchasing(false);
    setConfirmItem(null);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 货币显示 */}
      <div
        className="flex items-center gap-4 px-4 py-2 rounded-lg"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-1">
          <span>💎</span>
          <span className="text-sm" style={{ color: 'var(--color-gold)' }}>
            {formatNumber(character?.spiritStones ?? 0)} 灵石
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>🔮</span>
          <span className="text-sm" style={{ color: '#a78bfa' }}>
            {character?.yuanbao ?? 0} 元宝
          </span>
        </div>
      </div>

      {/* 分类 */}
      <Tabs
        items={categories}
        activeKey={activeCategory}
        onChange={(k) => setActiveCategory(k as ShopCategory | 'all')}
        compact
        className="overflow-x-auto no-scrollbar"
      />

      {/* 商品列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <ShopItemCard key={item.id} item={item} onBuy={() => setConfirmItem(item)} />
        ))}
      </div>

      {/* 购买确认 */}
      <ConfirmDialog
        open={!!confirmItem}
        onCancel={() => setConfirmItem(null)}
        onConfirm={handlePurchase}
        loading={purchasing}
        title="确认购买"
        confirmText="前往坊市"
        content={
          confirmItem && (
            <div className="space-y-2">
              <p>
                确认购买{' '}
                <span style={{ color: 'var(--color-gold)' }}>【{confirmItem.name}】</span>？
              </p>
              <p style={{ color: 'var(--color-text-muted)' }}>
                花费：{confirmItem.price}{' '}
                {confirmItem.currency === 'spiritStone' ? '💎灵石' : '🔮元宝'}
              </p>
            </div>
          )
        }
      />
    </div>
  );
};

const ShopItemCard: React.FC<{ item: ShopItem; onBuy: () => void }> = ({ item, onBuy }) => {
  const hasDiscount = item.discount && item.discount < 1 && item.originalPrice;

  return (
    <div
      className="game-card p-4 flex flex-col gap-3 hover:border-[--color-border-gold] transition-colors"
    >
      {/* 图标 + 标签 */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)' }}
        >
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {item.name}
            </span>
            {item.isNew && (
              <span className="text-xs px-1 rounded" style={{ background: '#166534', color: '#bbf7d0' }}>新</span>
            )}
            {item.isHot && <Flame size={10} style={{ color: '#f87171' }} />}
          </div>
          <p className="text-xs mt-0.5 truncate-2" style={{ color: 'var(--color-text-muted)' }}>
            {item.description}
          </p>
        </div>
      </div>

      {/* 库存 / 限购 */}
      {(item.stock !== undefined || item.purchaseLimit !== undefined) && (
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {item.stock !== undefined && <span>库存：{item.stock}</span>}
          {item.purchaseLimit !== undefined && (
            <span>限购：{item.purchasedCount ?? 0}/{item.purchaseLimit}</span>
          )}
        </div>
      )}

      {/* 价格 + 购买 */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold" style={{ color: item.currency === 'spiritStone' ? 'var(--color-gold)' : '#a78bfa' }}>
              {item.price}
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {item.currency === 'spiritStone' ? '💎灵石' : '🔮元宝'}
            </span>
          </div>
          {hasDiscount && (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs line-through" style={{ color: 'var(--color-text-muted)' }}>
                {item.originalPrice}
              </span>
              <span
                className="text-xs px-1 rounded"
                style={{ background: 'rgba(192,57,43,0.2)', color: '#f87171', border: '1px solid rgba(192,57,43,0.3)' }}
              >
                {Math.round((1 - (item.discount ?? 1)) * 100)}折
              </span>
            </div>
          )}
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={onBuy}
          disabled={item.purchaseLimit !== undefined && (item.purchasedCount ?? 0) >= item.purchaseLimit}
        >
          <ShoppingCart size={12} className="mr-1" />
          {item.purchaseLimit !== undefined && (item.purchasedCount ?? 0) >= item.purchaseLimit ? '已购' : '购买'}
        </Button>
      </div>
    </div>
  );
};

export { ShopItemCard };
export default ShopGrid;
