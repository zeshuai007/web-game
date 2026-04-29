/**
 * 商城相关 API
 */
import { mockShopItems } from '../mock/index';
import type { ShopItem } from '../types/index';

const shopApi = {
  /** 获取商城列表 */
  getItems: async (): Promise<ShopItem[]> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockShopItems;
  },

  /** 购买物品 */
  purchase: async (itemId: string, quantity: number): Promise<{ message: string }> => {
    // TODO: http.post('/shop/purchase', { itemId, quantity })
    await new Promise((r) => setTimeout(r, 500));
    const item = mockShopItems.find((i) => i.id === itemId);
    if (!item) throw new Error('商品不存在');
    return { message: `成功购买 ${item.name} ×${quantity}` };
  },
};

export default shopApi;
