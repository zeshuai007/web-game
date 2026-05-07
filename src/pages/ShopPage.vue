<template>
  <GameLayout
    username="天道仙人"
    :level="88"
    sect="天道宗"
    :spirit-stones="12888"
    :stamina="88"
    :activity="75"
    :notification-count="3"
  >
    <div class="space-y-6">
      <Card :glow="true">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-glow-gold flex items-center gap-2">
            <ShoppingBag :size="20" />
            商店
          </h2>
          <div class="flex items-center gap-2 px-4 py-2 rounded-lg" style="background: rgba(212,168,67,0.1)">
            <Coins :size="18" style="color: var(--color-gold)" />
            <span class="font-bold" style="color: var(--color-gold)">{{ spiritStones }}</span>
          </div>
        </div>

        <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200"
            :class="activeCategory === cat.id ? 'bg-[rgba(212,168,67,0.2) border border-[var(--color-border-gold)]' : 'bg-[rgba(0,0,0,0.2) hover:bg-[rgba(212,168,67,0.05)]'"
            @click="activeCategory = cat.id"
          >
            <component :is="cat.icon" :size="16" class="inline mr-2" :style="{ color: activeCategory === cat.id ? 'var(--color-gold)' : 'var(--color-text-secondary)' }" />
            <span :style="{ color: activeCategory === cat.id ? 'var(--color-gold)' : 'var(--color-text-secondary)' }">{{ cat.name }}</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="p-4 rounded-xl"
            :style="{ background: 'rgba(0,0,0,0.2)', border: '1px solid ' + item.border }"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                :style="{ background: item.bg }"
              >
                <component :is="item.icon" :size="32" :style="{ color: item.color }" />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-bold" :style="{ color: item.rarityColor }">{{ item.name }}</h3>
                  <Badge :variant="item.rarity">{{ item.rarity }}</Badge>
                </div>
                <p class="text-sm mb-3" style="color: var(--color-text-muted)">{{ item.desc }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-1">
                    <Coins :size="14" style="color: var(--color-gold)" />
                    <span class="font-bold" style="color: var(--color-gold)">{{ item.price }}</span>
                  </div>
                  <Button
                    :variant="canAfford(item.price) ? 'gold' : 'outline'"
                    size="sm"
                    :disabled="!canAfford(item.price)"
                    @click="buyItem(item)"
                  >
                    {{ canAfford(item.price) ? '购买' : '灵石不足' }}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="限时特惠">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="deal in limitedDeals"
            :key="deal.id"
            class="relative p-4 rounded-xl overflow-hidden"
            :style="{ background: deal.bg, border: '1px solid ' + deal.border }"
          >
            <div
              class="absolute top-0 right-0 px-2 py-1 text-xs font-bold rounded-bl-lg"
              style="background: linear-gradient(145deg, #f87171, #dc2626); color: white"
            >
              -{{ deal.discount }}%
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center"
                :style="{ background: deal.iconBg }"
              >
                <component :is="deal.icon" :size="24" :style="{ color: deal.color }" />
              </div>
              <div class="flex-1">
                <h4 class="font-medium" :style="{ color: deal.color }">{{ deal.name }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm line-through" style="color: '#6b7280'">{{ deal.originalPrice }}</span>
                  <span class="text-sm font-bold" style="color: '#ef4444'">{{ deal.price }}</span>
                </div>
              </div>
              <Button variant="danger" size="sm">抢购</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card title="VIP特权">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl" style="background: linear-gradient(145deg, rgba(212,168,67,0.1) 0%, rgba(245,158,11,0.05) 100%); border: 1px solid rgba(212,168,67,0.3)">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center" style="background: linear-gradient(145deg, var(--color-gold), #b8860b)">
              <Crown :size="32" style="color: 'var(--color-ink)'" />
            </div>
            <div>
              <h3 class="font-bold text-lg text-glow-gold">VIP尊享特权</h3>
              <p class="text-sm" style="color: var(--color-text-muted)">每日领取丰厚奖励</p>
            </div>
          </div>
          <Button variant="gold">开通VIP</Button>
        </div>
      </Card>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { ShoppingBag, Coins, Sword, Shield, Gem, FlaskConical, Scroll, Star, Crown } from 'lucide-vue-next'

const spiritStones = 12888
const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '全部', icon: markRaw(ShoppingBag) },
  { id: 'weapon', name: '武器', icon: markRaw(Sword) },
  { id: 'armor', name: '防具', icon: markRaw(Shield) },
  { id: 'accessory', name: '饰品', icon: markRaw(Gem) },
  { id: 'consumable', name: '消耗品', icon: markRaw(FlaskConical) },
  { id: 'material', name: '材料', icon: markRaw(Scroll) },
]

const items = [
  { id: 1, name: '青钢剑', icon: markRaw(Sword), color: '#6b7280', bg: 'rgba(107,114,128,0.2)', border: 'rgba(107,114,128,0.3)', rarity: 'jade', rarityColor: '#6b7280', price: 100, desc: '普通的铁剑', category: 'weapon' },
  { id: 2, name: '精钢剑', icon: markRaw(Sword), color: '#9ca3af', bg: 'rgba(156,163,175,0.2)', border: 'rgba(156,163,175,0.3)', rarity: 'gold', rarityColor: 'var(--color-gold)', price: 500, desc: '精炼的钢剑', category: 'weapon' },
  { id: 3, name: '玄铁剑', icon: markRaw(Sword), color: '#a78bfa', bg: 'rgba(167,139,250,0.2)', border: 'rgba(167,139,250,0.3)', rarity: 'epic', rarityColor: '#a78bfa', price: 2000, desc: '玄铁锻造的宝剑', category: 'weapon' },
  { id: 4, name: '皮甲', icon: markRaw(Shield), color: '#92400e', bg: 'rgba(146,64,14,0.2)', border: 'rgba(146,64,14,0.3)', rarity: 'jade', rarityColor: '#92400e', price: 150, desc: '轻便的皮甲', category: 'armor' },
  { id: 5, name: '铁甲', icon: markRaw(Shield), color: '#6b7280', bg: 'rgba(107,114,128,0.2)', border: 'rgba(107,114,128,0.3)', rarity: 'gold', rarityColor: 'var(--color-gold)', price: 800, desc: '坚固的铁甲', category: 'armor' },
  { id: 6, name: '聚灵丹', icon: markRaw(FlaskConical), color: '#22c55e', bg: 'rgba(34,197,94,0.2)', border: 'rgba(34,197,94,0.3)', rarity: 'jade', rarityColor: '#22c55e', price: 50, desc: '恢复灵力', category: 'consumable' },
  { id: 7, name: '突破丹', icon: markRaw(FlaskConical), color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.2)', border: 'rgba(212,168,67,0.3)', rarity: 'gold', rarityColor: 'var(--color-gold)', price: 500, desc: '增加突破成功率', category: 'consumable' },
  { id: 8, name: '护心镜', icon: markRaw(Gem), color: '#fbbf24', bg: 'rgba(251,191,36,0.2)', border: 'rgba(251,191,36,0.3)', rarity: 'gold', rarityColor: '#fbbf24', price: 1000, desc: '保护心神的饰品', category: 'accessory' },
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') return items
  return items.filter(item => item.category === activeCategory.value)
})

const canAfford = (price: number) => spiritStones >= price

const buyItem = (item: any) => {
  if (canAfford(item.price)) {
    console.log('购买:', item.name)
  }
}

const limitedDeals = [
  { id: 1, name: '高级突破丹', icon: markRaw(FlaskConical), color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', iconBg: 'rgba(245,158,11,0.2)', originalPrice: '800', price: '400', discount: 50 },
  { id: 2, name: '神兽精血', icon: markRaw(Star), color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', iconBg: 'rgba(167,139,250,0.2)', originalPrice: '2000', price: '1500', discount: 25 },
  { id: 3, name: '悟道茶', icon: markRaw(Scroll), color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', iconBg: 'rgba(34,197,94,0.2)', originalPrice: '500', price: '350', discount: 30 },
]
</script>
