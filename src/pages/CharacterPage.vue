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
      <Card class="relative overflow-hidden" :glow="true">
        <div
          class="absolute inset-0"
          style="background: radial-gradient(ellipse at 30% 50%, rgba(212,168,67,0.15) 0%, transparent 60%)"
        />
        <div class="relative">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="flex-shrink-0">
              <div class="relative">
                <div class="w-32 h-32 rounded-xl overflow-hidden border-2 mx-auto" style="borderColor: var(--color-border-gold); boxShadow: 0 0 40px rgba(212,168,67,0.3)">
                  <img
                    src="/images/character-art.png"
                    alt="avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  class="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold"
                  style="background: linear-gradient(145deg, var(--color-gold), #b8860b); color: var(--color-ink); boxShadow: 0 0 10px rgba(212,168,67,0.5)"
                >
                  Lv.{{ player.level }}
                </div>
              </div>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-2xl font-bold text-glow-gold">{{ player.name }}</h1>
                <Badge variant="gold">{{ player.sect }}</Badge>
              </div>
              <p class="text-sm mb-4" style="color: var(--color-text-muted)">
                {{ player.title }} · {{ player.cultivationStage }}
              </p>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
                  <div class="text-lg font-bold" style="color: var(--color-gold)">{{ player.spiritStones }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">灵石</div>
                </div>
                <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
                  <div class="text-lg font-bold" style="color: var(--color-jade)">{{ player.reputation }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">声望</div>
                </div>
                <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
                  <div class="text-lg font-bold" style="color: #a78bfa">{{ player.merit }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">功德</div>
                </div>
                <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
                  <div class="text-lg font-bold" style="color: #fbbf24">{{ player.combatPower }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">战力</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs :tabs="tabs" default-value="attributes">
        <template #attributes>
          <Card title="属性">
            <div class="space-y-4">
              <div v-for="attr in attributes" :key="attr.name" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <component :is="attr.icon" :size="16" :style="{ color: attr.color }" />
                  <span style="color: var(--color-text-primary)">{{ attr.name }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-32 h-2 rounded-full overflow-hidden" style="background: rgba(0,0,0,0.3)">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :style="{ width: `${attr.value}%`, background: attr.color }"
                    />
                  </div>
                  <span class="text-sm font-medium" :style="{ color: attr.color }">{{ attr.value }}</span>
                </div>
              </div>
            </div>
          </Card>
        </template>

        <template #skills>
          <Card title="技能">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="skill in skills"
                :key="skill.id"
                class="p-4 rounded-lg"
                :style="{ background: skill.bg, border: '1px solid ' + skill.border }"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :style="{ background: skill.iconBg }"
                  >
                    <component :is="skill.icon" :size="20" :style="{ color: skill.color }" />
                  </div>
                  <div>
                    <h4 class="font-medium text-sm" style="color: var(--color-text-primary)">{{ skill.name }}</h4>
                    <p class="text-xs" style="color: var(--color-text-muted)">Lv.{{ skill.level }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </template>

        <template #equipment>
          <Card title="装备">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="slot in equipmentSlots"
                :key="slot.type"
                class="p-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2"
                :style="{ borderColor: slot.item ? slot.item.rarityColor : 'var(--color-border)', background: slot.item ? slot.item.bg : 'rgba(0,0,0,0.2)' }"
              >
                <component :is="slot.icon" :size="24" :style="{ color: slot.item ? slot.item.rarityColor : 'var(--color-text-muted)' }" />
                <span class="text-xs" :style="{ color: slot.item ? slot.item.rarityColor : 'var(--color-text-muted)' }">
                  {{ slot.item ? slot.item.name : slot.label }}
                </span>
                <Badge v-if="slot.item" :variant="slot.item.rarity">{{ slot.item.rarity }}</Badge>
              </div>
            </div>
          </Card>
        </template>

        <template #achievements>
          <Card title="成就">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="achievement in achievements"
                :key="achievement.id"
                class="p-4 rounded-lg text-center"
                :class="achievement.unlocked ? '' : 'opacity-50'"
                :style="{ background: achievement.unlocked ? achievement.bg : 'rgba(0,0,0,0.2)' }"
              >
                <div
                  class="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  :style="{ background: achievement.unlocked ? achievement.iconBg : 'rgba(255,255,255,0.1)' }"
                >
                  <component :is="achievement.icon" :size="24" :style="{ color: achievement.unlocked ? achievement.color : '#6b7280' }" />
                </div>
                <h4 class="text-sm font-medium" style="color: var(--color-text-primary)">{{ achievement.name }}</h4>
                <p class="text-xs mt-1" style="color: var(--color-text-muted)">{{ achievement.desc }}</p>
              </div>
            </div>
          </Card>
        </template>
      </Tabs>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Tabs from '@/components/ui/Tabs.vue'
import {
  Sword, Shield, Zap, Heart, Brain,
  Flame, Sparkles, ShieldCheck, Star, Crown,
  Trophy, Target, Award, Medal,
  Wand2, Gem, BookOpen, Shirt, HardHat, Footprints, Hand,
} from 'lucide-vue-next'

const tabs = [
  { label: '属性', value: 'attributes' },
  { label: '技能', value: 'skills' },
  { label: '装备', value: 'equipment' },
  { label: '成就', value: 'achievements' },
]

const player = {
  name: '天道仙人',
  level: 88,
  sect: '天道宗',
  title: '太上长老',
  cultivationStage: '渡劫期',
  spiritStones: 12888,
  reputation: 99999,
  merit: 12500,
  combatPower: 188888,
}

const attributes = [
  { name: '攻击', value: 85, icon: markRaw(Sword), color: '#f87171' },
  { name: '防御', value: 72, icon: markRaw(Shield), color: '#60a5fa' },
  { name: '速度', value: 90, icon: markRaw(Zap), color: '#fbbf24' },
  { name: '生命', value: 78, icon: markRaw(Heart), color: '#22c55e' },
  { name: '悟性', value: 95, icon: markRaw(Brain), color: '#a78bfa' },
]

const skills = [
  { id: 1, name: '天雷击', level: 10, icon: markRaw(Zap), color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', iconBg: 'rgba(251,191,36,0.2)' },
  { id: 2, name: '烈焰斩', level: 8, icon: markRaw(Flame), color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.3)', iconBg: 'rgba(248,113,113,0.2)' },
  { id: 3, name: '归元术', level: 12, icon: markRaw(Sparkles), color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.1)', border: 'rgba(212,168,67,0.3)', iconBg: 'rgba(212,168,67,0.2)' },
  { id: 4, name: '金刚不坏', level: 6, icon: markRaw(ShieldCheck), color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.3)', iconBg: 'rgba(96,165,250,0.2)' },
  { id: 5, name: '星辰诀', level: 9, icon: markRaw(Star), color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', iconBg: 'rgba(167,139,250,0.2)' },
  { id: 6, name: '至尊领域', level: 5, icon: markRaw(Crown), color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', iconBg: 'rgba(245,158,11,0.2)' },
]

const equipmentSlots = [
  { type: 'weapon', label: '武器', icon: markRaw(Sword), item: { name: '诛仙古剑', rarity: 'legendary', rarityColor: '#f59e0b', bg: 'rgba(245,158,11,0.1)' } },
  { type: 'helmet', label: '头盔', icon: markRaw(HardHat), item: null },
  { type: 'armor', label: '护甲', icon: markRaw(Shirt), item: { name: '玄武甲', rarity: 'epic', rarityColor: '#a78bfa', bg: 'rgba(167,139,250,0.1)' } },
  { type: 'boots', label: '靴子', icon: markRaw(Footprints), item: null },
  { type: 'accessory', label: '饰品', icon: markRaw(Gem), item: { name: '玲珑玉佩', rarity: 'epic', rarityColor: '#a78bfa', bg: 'rgba(167,139,250,0.1)' } },
  { type: 'gloves', label: '护手', icon: markRaw(Hand), item: null },
  { type: 'amulet', label: '护符', icon: markRaw(Wand2), item: { name: '清心符', rarity: 'gold', rarityColor: 'var(--color-gold)', bg: 'rgba(212,168,67,0.1)' } },
  { type: 'book', label: '典籍', icon: markRaw(BookOpen), item: null },
]

const achievements = [
  { id: 1, name: '初入仙途', desc: '完成新手引导', icon: markRaw(Star), unlocked: true, color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.1)', iconBg: 'rgba(212,168,67,0.2)' },
  { id: 2, name: '斩妖除魔', desc: '击败100只妖兽', icon: markRaw(Trophy), unlocked: true, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', iconBg: 'rgba(245,158,11,0.2)' },
  { id: 3, name: '寻宝大师', desc: '发现10个秘境', icon: markRaw(Target), unlocked: true, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', iconBg: 'rgba(167,139,250,0.2)' },
  { id: 4, name: '天下第一', desc: '登顶排行榜', icon: markRaw(Award), unlocked: false, color: '#f87171', bg: '', iconBg: '' },
  { id: 5, name: '得道飞升', desc: '突破飞升期', icon: markRaw(Medal), unlocked: false, color: '#22c55e', bg: '', iconBg: '' },
]
</script>
