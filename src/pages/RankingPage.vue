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
            <Trophy :size="20" />
            排行榜
          </h2>
          <Badge variant="gold">全服排名</Badge>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div
            v-for="(medal, index) in topThree"
            :key="medal.rank"
            class="relative p-4 rounded-xl text-center"
            :style="{ background: medal.bg, border: '1px solid ' + medal.border }"
          >
            <div
              class="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
              :style="{ background: medal.medalBg }"
            >
              <component :is="medal.icon" :size="20" :style="{ color: medal.medalColor }" />
            </div>
            <div class="mt-4">
              <div
                class="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 mb-2"
                :style="{ borderColor: medal.border }"
              >
                <img
                  :src="medal.avatar"
                  alt="avatar"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="font-bold text-lg" :style="{ color: medal.color }">{{ medal.name }}</div>
              <div class="text-xs mt-1" style="color: var(--color-text-muted)">{{ medal.sect }}</div>
              <div class="text-sm font-bold mt-2" :style="{ color: medal.color }">{{ medal.power }} 战力</div>
            </div>
          </div>
        </div>

        <Tabs :tabs="tabs" default-value="power">
          <template #power>
            <div class="space-y-2">
              <div
                v-for="(player, index) in powerRanking"
                :key="player.id"
                class="flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-[rgba(212,168,67,0.05)]"
                :class="player.isSelf ? 'bg-[rgba(212,168,67,0.1)] border border-[var(--color-border-gold)]' : 'bg-[rgba(0,0,0,0.2)]'"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  :style="{ background: getRankBg(player.rank), color: getRankColor(player.rank) }"
                >
                  {{ player.rank }}
                </div>
                <div
                  class="w-10 h-10 rounded-full overflow-hidden border-2"
                  :style="{ borderColor: player.isSelf ? 'var(--color-border-gold)' : 'var(--color-border)' }"
                >
                  <img
                    :src="player.avatar"
                    alt="avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-medium" :style="{ color: player.isSelf ? 'var(--color-gold)' : 'var(--color-text-primary)' }">{{ player.name }}</span>
                    <Badge v-if="player.isSelf" variant="gold">我</Badge>
                  </div>
                  <div class="text-xs" style="color: var(--color-text-muted)">{{ player.sect }} · Lv.{{ player.level }}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold" :style="{ color: '#f59e0b' }">{{ player.power }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">战力</div>
                </div>
              </div>
            </div>
          </template>

          <template #cultivation>
            <div class="space-y-2">
              <div
                v-for="(player, index) in cultivationRanking"
                :key="player.id"
                class="flex items-center gap-4 p-3 rounded-lg"
                :style="{ background: 'rgba(0,0,0,0.2)' }"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  :style="{ background: getRankBg(player.rank), color: getRankColor(player.rank) }"
                >
                  {{ player.rank }}
                </div>
                <div class="w-10 h-10 rounded-full overflow-hidden border-2" style="borderColor: 'var(--color-border)'">
                  <img
                    :src="player.avatar"
                    alt="avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <div class="font-medium" style="color: 'var(--color-text-primary)'">{{ player.name }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">{{ player.stage }}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold" style="color: 'var(--color-gold)'">{{ player.exp }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">经验</div>
                </div>
              </div>
            </div>
          </template>

          <template #wealth>
            <div class="space-y-2">
              <div
                v-for="(player, index) in wealthRanking"
                :key="player.id"
                class="flex items-center gap-4 p-3 rounded-lg"
                :style="{ background: 'rgba(0,0,0,0.2)' }"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  :style="{ background: getRankBg(player.rank), color: getRankColor(player.rank) }"
                >
                  {{ player.rank }}
                </div>
                <div class="w-10 h-10 rounded-full overflow-hidden border-2" style="borderColor: 'var(--color-border)'">
                  <img
                    :src="player.avatar"
                    alt="avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <div class="font-medium" style="color: 'var(--color-text-primary)'">{{ player.name }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">{{ player.sect }}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold" style="color: 'var(--color-gold)'">{{ player.stones }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">灵石</div>
                </div>
              </div>
            </div>
          </template>

          <template #reputation>
            <div class="space-y-2">
              <div
                v-for="(player, index) in reputationRanking"
                :key="player.id"
                class="flex items-center gap-4 p-3 rounded-lg"
                :style="{ background: 'rgba(0,0,0,0.2)' }"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  :style="{ background: getRankBg(player.rank), color: getRankColor(player.rank) }"
                >
                  {{ player.rank }}
                </div>
                <div class="w-10 h-10 rounded-full overflow-hidden border-2" style="borderColor: 'var(--color-border)'">
                  <img
                    :src="player.avatar"
                    alt="avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <div class="font-medium" style="color: 'var(--color-text-primary)'">{{ player.name }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">{{ player.sect }}</div>
                </div>
                <div class="text-right">
                  <div class="font-bold" style="color: '#a78bfa'">{{ player.reputation }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">声望</div>
                </div>
              </div>
            </div>
          </template>
        </Tabs>
      </Card>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Tabs from '@/components/ui/Tabs.vue'
import { Trophy, Medal, Award, Star, Crown } from 'lucide-vue-next'

const tabs = [
  { label: '战力', value: 'power' },
  { label: '修炼', value: 'cultivation' },
  { label: '财富', value: 'wealth' },
  { label: '声望', value: 'reputation' },
]

const topThree = [
  { rank: 1, name: '天道至尊', sect: '天道宗', power: 999999, avatar: '/images/character-art.png', icon: markRaw(Crown), bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.3)', color: '#fbbf24', medalBg: 'linear-gradient(145deg, #fbbf24, #f59e0b)', medalColor: 'white' },
  { rank: 2, name: '九幽魔君', sect: '幽冥宗', power: 888888, avatar: '/images/character-art.png', icon: markRaw(Medal), bg: 'rgba(156,163,175,0.1)', border: 'rgba(156,163,175,0.3)', color: '#9ca3af', medalBg: 'linear-gradient(145deg, #d1d5db, #9ca3af)', medalColor: 'white' },
  { rank: 3, name: '青云剑仙', sect: '青云门', power: 777777, avatar: '/images/character-art.png', icon: markRaw(Award), bg: 'rgba(209,102,53,0.1)', border: 'rgba(209,102,53,0.3)', color: '#d16635', medalBg: 'linear-gradient(145deg, #f59e0b, #d97706)', medalColor: 'white' },
]

const getRankBg = (rank: number) => {
  if (rank === 1) return 'linear-gradient(145deg, #fbbf24, #f59e0b)'
  if (rank === 2) return 'linear-gradient(145deg, #d1d5db, #9ca3af)'
  if (rank === 3) return 'linear-gradient(145deg, #f59e0b, #d97706)'
  return 'rgba(255,255,255,0.1)'
}

const getRankColor = (rank: number) => {
  if (rank === 1) return 'white'
  if (rank === 2) return 'white'
  if (rank === 3) return 'white'
  return 'var(--color-text-secondary)'
}

const powerRanking = [
  { id: 1, rank: 4, name: '蜀山剑侠', sect: '蜀山派', level: 95, power: 666666, avatar: '/images/character-art.png', isSelf: false },
  { id: 2, rank: 5, name: '天道仙人', sect: '天道宗', level: 88, power: 188888, avatar: '/images/character-art.png', isSelf: true },
  { id: 3, rank: 6, name: '昆仑道长', sect: '昆仑派', level: 85, power: 166666, avatar: '/images/character-art.png', isSelf: false },
  { id: 4, rank: 7, name: '蓬莱仙子', sect: '蓬莱仙岛', level: 82, power: 155555, avatar: '/images/character-art.png', isSelf: false },
  { id: 5, rank: 8, name: '逍遥浪子', sect: '逍遥派', level: 80, power: 144444, avatar: '/images/character-art.png', isSelf: false },
]

const cultivationRanking = [
  { id: 1, rank: 1, name: '天道至尊', stage: '大乘期', exp: 9999999, avatar: '/images/character-art.png' },
  { id: 2, rank: 2, name: '九幽魔君', stage: '渡劫期', exp: 8888888, avatar: '/images/character-art.png' },
  { id: 3, rank: 3, name: '青云剑仙', stage: '渡劫期', exp: 7777777, avatar: '/images/character-art.png' },
]

const wealthRanking = [
  { id: 1, rank: 1, name: '聚宝仙', sect: '财神阁', stones: 9999999, avatar: '/images/character-art.png' },
  { id: 2, rank: 2, name: '天道至尊', sect: '天道宗', stones: 8888888, avatar: '/images/character-art.png' },
  { id: 3, rank: 3, name: '富商巨贾', sect: '商会', stones: 7777777, avatar: '/images/character-art.png' },
]

const reputationRanking = [
  { id: 1, rank: 1, name: '天道至尊', sect: '天道宗', reputation: 999999, avatar: '/images/character-art.png' },
  { id: 2, rank: 2, name: '青云剑仙', sect: '青云门', reputation: 888888, avatar: '/images/character-art.png' },
  { id: 3, rank: 3, name: '蜀山剑侠', sect: '蜀山派', reputation: 777777, avatar: '/images/character-art.png' },
]
</script>
