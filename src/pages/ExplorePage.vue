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
            <Compass :size="20" />
            探索
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-sm" style="color: var(--color-text-muted)">今日剩余次数：</span>
            <Badge variant="jade">{{ remainingTimes }}/{{ totalTimes }}</Badge>
          </div>
        </div>

        <div class="relative rounded-xl overflow-hidden" style="height: 400px; background: linear-gradient(180deg, rgba(212,168,67,0.1) 0%, rgba(13,17,23,0.9) 100%)">
          <img
            src="/images/explore-map-bg.png"
            alt="map"
            class="w-full h-full object-cover opacity-40"
          />

          <div class="absolute inset-0 flex items-center justify-center">
            <div class="relative">
              <div
                class="w-40 h-40 rounded-full flex items-center justify-center"
                style="background: radial-gradient(circle, rgba(212,168,67,0.3) 0%, transparent 70%)"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold text-glow-gold">天道宗</div>
                  <div class="text-xs mt-1" style="color: var(--color-text-muted)">当前位置</div>
                </div>
              </div>

              <div
                v-for="(spot, index) in exploreSpots"
                :key="spot.id"
                class="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                :style="getSpotPosition(index)"
                @click="selectSpot(spot)"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center"
                  :style="{ background: spot.bg, border: '2px solid ' + spot.border }"
                >
                  <component :is="spot.icon" :size="20" :style="{ color: spot.color }" />
                </div>
                <div
                  class="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-xs whitespace-nowrap"
                  :style="{ background: 'rgba(13,17,23,0.9)', border: '1px solid ' + spot.border, color: spot.color }"
                >
                  {{ spot.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="探索目标" :glow="selectedSpot">
        <div v-if="selectedSpot" class="space-y-4">
          <div class="flex items-center gap-4">
            <div
              class="w-16 h-16 rounded-xl flex items-center justify-center"
              :style="{ background: selectedSpot.bg }"
            >
              <component :is="selectedSpot.icon" :size="32" :style="{ color: selectedSpot.color }" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold" :style="{ color: selectedSpot.color }">{{ selectedSpot.name }}</h3>
              <p class="text-sm mt-1" style="color: var(--color-text-muted)">{{ selectedSpot.desc }}</p>
              <div class="flex items-center gap-4 mt-2">
                <Badge :variant="selectedSpot.rarity">{{ selectedSpot.difficulty }}</Badge>
                <span class="text-xs" style="color: var(--color-text-secondary)">消耗: {{ selectedSpot.stamina }} 体力</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="p-3 rounded-lg text-center" style="background: rgba(0,0,0,0.2)">
              <div class="text-sm font-medium" style="color: var(--color-gold)">经验 +{{ selectedSpot.rewards.exp }}</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background: rgba(0,0,0,0.2)">
              <div class="text-sm font-medium" style="color: var(--color-jade)">灵石 +{{ selectedSpot.rewards.stones }}</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background: rgba(0,0,0,0.2)">
              <div class="text-sm font-medium" style="color: '#a78bfa'">声望 +{{ selectedSpot.rewards.reputation }}</div>
            </div>
            <div class="p-3 rounded-lg text-center" style="background: rgba(0,0,0,0.2)">
              <div class="text-sm font-medium" style="color: '#fbbf24'">道具 {{ selectedSpot.rewards.items }}%</div>
            </div>
          </div>

          <Button variant="gold" class="w-full" :disabled="stamina < selectedSpot.stamina || isExploring">
            <Play :size="18" />
            {{ isExploring ? '探索中...' : '开始探索' }}
          </Button>
        </div>

        <div v-else class="text-center py-8">
          <Compass :size="48" style="color: var(--color-text-muted); margin: 0 auto 4px" />
          <p style="color: var(--color-text-muted)">选择地图上的探索点开始探索</p>
        </div>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="探索记录">
          <div class="space-y-2">
            <div
              v-for="record in exploreHistory"
              :key="record.id"
              class="flex items-center gap-3 p-3 rounded-lg"
              :style="{ background: record.success ? 'rgba(126,203,161,0.1)' : 'rgba(248,113,113,0.1)' }"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :style="{ background: record.success ? 'rgba(126,203,161,0.2)' : 'rgba(248,113,113,0.2)' }"
              >
                <component :is="record.success ? CheckCircle : X" :size="16" :style="{ color: record.success ? '#22c55e' : '#ef4444' }" />
              </div>
              <div class="flex-1">
                <div class="text-sm" style="color: var(--color-text-primary)">{{ record.spot }}</div>
                <div class="text-xs" style="color: var(--color-text-muted)">{{ record.time }}</div>
              </div>
              <div class="text-sm font-medium" :style="{ color: record.success ? '#22c55e' : '#ef4444' }">
                {{ record.success ? '成功' : '失败' }}
              </div>
            </div>
          </div>
        </Card>

        <Card title="探索成就">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="achievement in exploreAchievements"
              :key="achievement.id"
              class="p-3 rounded-lg text-center"
              :class="achievement.unlocked ? '' : 'opacity-50'"
              :style="{ background: achievement.unlocked ? achievement.bg : 'rgba(0,0,0,0.2)' }"
            >
              <component :is="achievement.icon" :size="24" :style="{ color: achievement.unlocked ? achievement.color : '#6b7280' }" />
              <div class="text-xs mt-2" style="color: var(--color-text-primary)">{{ achievement.name }}</div>
              <div class="text-xs mt-1" style="color: var(--color-text-muted)">{{ achievement.progress }}/{{ achievement.target }}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { Compass, Mountain, TreePine, Flame, Skull, Play, CheckCircle, X, Trophy, Star, MapPin, Target } from 'lucide-vue-next'

const remainingTimes = 5
const totalTimes = 10
const stamina = 88
const isExploring = ref(false)

const selectedSpot = ref<any>(null)

const exploreSpots = [
  { id: 1, name: '青云山脉', desc: '风景秀丽的山脉，适合新手修炼', icon: markRaw(Mountain), color: '#22c55e', bg: 'rgba(34,197,94,0.2)', border: '#22c55e', difficulty: '简单', rarity: 'jade', stamina: 10, rewards: { exp: 100, stones: 50, reputation: 10, items: 10 } },
  { id: 2, name: '迷雾森林', desc: '神秘的森林，隐藏着许多秘密', icon: markRaw(TreePine), color: '#a78bfa', bg: 'rgba(167,139,250,0.2)', border: '#a78bfa', difficulty: '普通', rarity: 'epic', stamina: 20, rewards: { exp: 200, stones: 100, reputation: 20, items: 20 } },
  { id: 3, name: '火焰洞窟', desc: '充满火焰的危险洞窟', icon: markRaw(Flame), color: '#f87171', bg: 'rgba(248,113,113,0.2)', border: '#f87171', difficulty: '困难', rarity: 'danger', stamina: 30, rewards: { exp: 500, stones: 250, reputation: 50, items: 40 } },
  { id: 4, name: '妖兽巢穴', desc: '强大妖兽的栖息地', icon: markRaw(Skull), color: '#f59e0b', bg: 'rgba(245,158,11,0.2)', border: '#f59e0b', difficulty: '地狱', rarity: 'legendary', stamina: 50, rewards: { exp: 1000, stones: 500, reputation: 100, items: 60 } },
]

const getSpotPosition = (index: number) => {
  const positions = [
    { top: '20%', left: '30%' },
    { top: '35%', left: '65%' },
    { top: '55%', left: '35%' },
    { top: '45%', left: '70%' },
  ]
  return positions[index]
}

const selectSpot = (spot: any) => {
  selectedSpot.value = spot
}

const exploreHistory = [
  { id: 1, spot: '青云山脉', success: true, time: '5分钟前' },
  { id: 2, spot: '迷雾森林', success: true, time: '15分钟前' },
  { id: 3, spot: '火焰洞窟', success: false, time: '30分钟前' },
]

const exploreAchievements = [
  { id: 1, name: '初入江湖', icon: markRaw(MapPin), progress: 10, target: 10, unlocked: true, color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.1)' },
  { id: 2, name: '探索达人', icon: markRaw(Trophy), progress: 52, target: 100, unlocked: false, color: '#f59e0b', bg: '' },
  { id: 3, name: '秘境探索', icon: markRaw(Star), progress: 8, target: 20, unlocked: false, color: '#a78bfa', bg: '' },
  { id: 4, name: '百发百中', icon: markRaw(Target), progress: 15, target: 50, unlocked: false, color: '#22c55e', bg: '' },
]
</script>
