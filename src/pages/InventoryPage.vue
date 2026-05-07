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
            <Package :size="20" />
            背包
          </h2>
          <div class="flex items-center gap-4">
            <span class="text-sm" style="color: var(--color-text-muted)">容量: {{ currentSlots }}/{{ maxSlots }}</span>
            <Button variant="outline" size="sm">
              <Plus :size="16" />
              扩展容量
            </Button>
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
            <Badge v-if="cat.count > 0" variant="gold" size="sm">{{ cat.count }}</Badge>
          </button>
        </div>

        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          <div
            v-for="(slot, index) in filteredItems"
            :key="index"
            class="aspect-square rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
            :class="slot ? 'p-2' : 'border-2 border-dashed border-[var(--color-border)] bg-[rgba(0,0,0,0.2)]'"
            @click="selectItem(slot)"
          >
            <div v-if="slot" class="h-full flex flex-col items-center justify-center">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center mb-1"
                :style="{ background: slot.bg }"
              >
                <component :is="slot.icon" :size="24" :style="{ color: slot.color }" />
              </div>
              <span class="text-xs text-center" :style="{ color: slot.rarityColor }">{{ slot.name }}</span>
              <div v-if="slot.quantity > 1" class="absolute top-1 right-1 text-xs font-bold" style="color: var(--color-gold)">{{ slot.quantity }}</div>
            </div>
            <div v-else class="h-full flex items-center justify-center">
              <Plus :size="20" style="color: 'var(--color-text-muted)'" />
            </div>
          </div>
        </div>

        <div v-if="selectedItem" class="mt-6 p-4 rounded-xl" style="background: rgba(0,0,0,0.3); border: '1px solid ' + selectedItem.rarityColor">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 rounded-lg flex items-center justify-center"
              :style="{ background: selectedItem.bg }"
            >
              <component :is="selectedItem.icon" :size="32" :style="{ color: selectedItem.color }" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-bold text-lg" :style="{ color: selectedItem.rarityColor }">{{ selectedItem.name }}</h3>
                <Badge :variant="selectedItem.rarity">{{ selectedItem.rarity }}</Badge>
              </div>
              <p class="text-sm mb-2" style="color: var(--color-text-muted)">{{ selectedItem.desc }}</p>
              <div class="flex items-center gap-4 text-sm">
                <span style="color: var(--color-text-secondary)">数量: {{ selectedItem.quantity }}</span>
                <span style="color: var(--color-text-secondary)">分类: {{ selectedItem.category }}</span>
              </div>
            </div>
            <div class="flex gap-2">
              <Button variant="outline" size="sm">使用</Button>
              <Button variant="danger" size="sm">丢弃</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card title="快捷物品">
        <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
          <div
            v-for="item in quickItems"
            :key="item.id"
            class="p-3 rounded-lg text-center cursor-pointer transition-all duration-200 hover:bg-[rgba(212,168,67,0.05)]"
            :style="{ background: item.bg }"
          >
            <component :is="item.icon" :size="24" :style="{ color: item.color }" />
            <div class="text-xs mt-1" style="color: var(--color-text-primary)">{{ item.name }}</div>
            <div class="text-xs" style="color: var(--color-text-muted)">{{ item.quantity }}</div>
          </div>
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
import { Package, Plus, Sword, Shield, Gem, FlaskConical, Scroll, Coins, Heart, Star, Zap } from 'lucide-vue-next'

const currentSlots = 45
const maxSlots = 60

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: '全部', icon: markRaw(Package), count: 28 },
  { id: 'weapon', name: '武器', icon: markRaw(Sword), count: 5 },
  { id: 'armor', name: '防具', icon: markRaw(Shield), count: 6 },
  { id: 'accessory', name: '饰品', icon: markRaw(Gem), count: 4 },
  { id: 'consumable', name: '消耗品', icon: markRaw(FlaskConical), count: 8 },
  { id: 'material', name: '材料', icon: markRaw(Scroll), count: 5 },
]

const items = [
  { id: 1, name: '诛仙古剑', icon: markRaw(Sword), color: '#f59e0b', bg: 'rgba(245,158,11,0.2)', rarity: 'legendary', rarityColor: '#f59e0b', quantity: 1, category: 'weapon', desc: '上古神器，威力无穷' },
  { id: 2, name: '玄武甲', icon: markRaw(Shield), color: '#a78bfa', bg: 'rgba(167,139,250,0.2)', rarity: 'epic', rarityColor: '#a78bfa', quantity: 1, category: 'armor', desc: '玄武鳞片制成的护甲' },
  { id: 3, name: '聚灵丹', icon: markRaw(FlaskConical), color: '#22c55e', bg: 'rgba(34,197,94,0.2)', rarity: 'jade', rarityColor: '#22c55e', quantity: 12, category: 'consumable', desc: '快速恢复灵力' },
  { id: 4, name: '突破丹', icon: markRaw(FlaskConical), color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.2)', rarity: 'gold', rarityColor: 'var(--color-gold)', quantity: 3, category: 'consumable', desc: '增加突破成功率' },
  { id: 5, name: '玲珑玉佩', icon: markRaw(Gem), color: '#a78bfa', bg: 'rgba(167,139,250,0.2)', rarity: 'epic', rarityColor: '#a78bfa', quantity: 1, category: 'accessory', desc: '蕴含强大灵力' },
  { id: 6, name: '寒铁', icon: markRaw(Star), color: '#6b7280', bg: 'rgba(107,114,128,0.2)', rarity: 'jade', rarityColor: '#6b7280', quantity: 25, category: 'material', desc: '珍贵的锻造材料' },
  { id: 7, name: '烈焰剑', icon: markRaw(Sword), color: '#f87171', bg: 'rgba(248,113,113,0.2)', rarity: 'epic', rarityColor: '#f87171', quantity: 1, category: 'weapon', desc: '燃烧着永恒烈焰的宝剑' },
  { id: 8, name: '生命丹', icon: markRaw(Heart), color: '#ef4444', bg: 'rgba(239,68,68,0.2)', rarity: 'jade', rarityColor: '#ef4444', quantity: 8, category: 'consumable', desc: '恢复大量生命值' },
  { id: 9, name: '灵石', icon: markRaw(Coins), color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.2)', rarity: 'gold', rarityColor: 'var(--color-gold)', quantity: 100, category: 'material', desc: '蕴含纯净灵力的宝石' },
  { id: 10, name: '疾风靴', icon: markRaw(Zap), color: '#fbbf24', bg: 'rgba(251,191,36,0.2)', rarity: 'gold', rarityColor: '#fbbf24', quantity: 1, category: 'armor', desc: '大幅提升移动速度' },
]

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') {
    return [...items, ...Array(40 - items.length).fill(null)]
  }
  const filtered = items.filter(item => item.category === activeCategory.value)
  return [...filtered, ...Array(40 - filtered.length).fill(null)]
})

const selectedItem = ref<any>(null)

const selectItem = (item: any) => {
  selectedItem.value = item
}

const quickItems = [
  { id: 1, name: '聚灵丹', icon: markRaw(FlaskConical), color: '#22c55e', bg: 'rgba(34,197,94,0.1)', quantity: 12 },
  { id: 2, name: '生命丹', icon: markRaw(Heart), color: '#ef4444', bg: 'rgba(239,68,68,0.1)', quantity: 8 },
  { id: 3, name: '突破丹', icon: markRaw(FlaskConical), color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.1)', quantity: 3 },
  { id: 4, name: '传送符', icon: markRaw(Zap), color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', quantity: 5 },
  { id: 5, name: '回城符', icon: markRaw(Star), color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', quantity: 10 },
  { id: 6, name: '探查符', icon: markRaw(Star), color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', quantity: 8 },
]
</script>
