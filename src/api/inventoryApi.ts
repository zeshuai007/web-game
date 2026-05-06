/**
 * 背包相关 API
 */
import { mockInventoryItems } from '../mock/index';
import type { InventoryItem } from '../types/index';

const inventoryApi = {
  /** 获取背包列表 */
  getItems: async (): Promise<InventoryItem[]> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockInventoryItems;
  },

  /** 使用物品 */
  useItem: async (itemId: string): Promise<{ message: string }> => {
    // TODO: http.post(`/inventory/${itemId}/use`)
    await new Promise((r) => setTimeout(r, 300));
    const item = mockInventoryItems.find((i) => i.id === itemId);
    if (!item) throw new Error('物品不存在');
    return { message: `使用了 ${item.name}` };
  },

  /** 出售物品 */
  sellItem: async (itemId: string, quantity: number): Promise<{ spiritStones: number }> => {
    // TODO: http.post('/inventory/sell', { itemId, quantity })
    await new Promise((r) => setTimeout(r, 300));
    const item = mockInventoryItems.find((i) => i.id === itemId);
    if (!item) throw new Error('物品不存在');
    return { spiritStones: item.sellPrice * quantity };
  },

  /** 锁定/解锁物品 */
  toggleLock: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200));
  },

  /** 分解物品 */
  decomposeItem: async (): Promise<{ materials: unknown[] }> => {
    // TODO: http.post(`/inventory/{itemId}/decompose`)
    await new Promise((r) => setTimeout(r, 300));
    return { materials: [] };
  },
};

export default inventoryApi;
