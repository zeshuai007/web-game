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
            <Scroll :size="20" />
            任务
          </h2>
          <div class="flex items-center gap-4">
            <Badge variant="gold">{{ activeCount }} 进行中</Badge>
            <Badge variant="jade">{{ completedCount }} 已完成</Badge>
          </div>
        </div>

        <Tabs :tabs="tabs" default-value="active">
          <template #active>
            <div class="space-y-4">
              <div
                v-for="quest in activeQuests"
                :key="quest.id"
                class="p-4 rounded-xl"
                :style="{ background: 'rgba(0,0,0,0.2)', border: '1px solid ' + quest.border }"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    :style="{ background: quest.bg }"
                  >
                    <component :is="quest.icon" :size="24" :style="{ color: quest.color }" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-bold" :style="{ color: quest.color }">{{ quest.title }}</h3>
                      <Badge :variant="quest.rarity">{{ quest.type }}</Badge>
                    </div>
                    <p class="text-sm mb-3" style="color: var(--color-text-muted)">{{ quest.desc }}</p>
                    
                    <div class="space-y-2 mb-4">
                      <div v-for="(objective, idx) in quest.objectives" :key="idx" class="flex items-center gap-2">
                        <component :is="objective.completed ? CheckCircle : Circle" :size="14" :style="{ color: objective.completed ? '#22c55e' : '#6b7280' }" />
                        <span class="text-sm" :style="{ color: objective.completed ? '#22c55e' : 'var(--color-text-secondary)' }">
                          {{ objective.text }} ({{ objective.current }}/{{ objective.total }})
                        </span>
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1">
                          <Zap :size="14" style="color: var(--color-gold)" />
                          <span class="text-sm" style="color: var(--color-text-secondary)">奖励: {{ quest.reward.stones }} 灵石</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <Star :size="14" style="color: '#fbbf24'" />
                          <span class="text-sm" style="color: var(--color-text-secondary)">+{{ quest.reward.exp }} 经验</span>
                        </div>
                      </div>
                      <Button
                        :variant="quest.canClaim ? 'gold' : 'outline'"
                        size="sm"
                        @click="handleQuest(quest)"
                      >
                        {{ quest.canClaim ? '领取奖励' : '继续任务' }}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #available>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="quest in availableQuests"
                :key="quest.id"
                class="p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[rgba(212,168,67,0.05)]"
                :style="{ background: 'rgba(0,0,0,0.2)', border: '1px solid ' + quest.border }"
                @click="acceptQuest(quest)"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    :style="{ background: quest.bg }"
                  >
                    <component :is="quest.icon" :size="20" :style="{ color: quest.color }" />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-medium text-sm" :style="{ color: quest.color }">{{ quest.title }}</h3>
                      <Badge :variant="quest.rarity" size="sm">{{ quest.type }}</Badge>
                    </div>
                    <p class="text-xs mb-2" style="color: var(--color-text-muted)">{{ quest.desc }}</p>
                    <div class="flex items-center gap-3 text-xs">
                      <span style="color: var(--color-text-secondary)">需求: Lv.{{ quest.minLevel }}</span>
                      <span style="color: var(--color-text-secondary)">|</span>
                      <span style="color: var(--color-gold)">奖励: {{ quest.reward.stones }} 灵石</span>
                    </div>
                  </div>
                  <ChevronRight :size="18" style="color: var(--color-text-muted)" />
                </div>
              </div>
            </div>
          </template>

          <template #completed>
            <div class="space-y-3">
              <div
                v-for="quest in completedQuests"
                :key="quest.id"
                class="flex items-center gap-4 p-3 rounded-lg opacity-60"
                :style="{ background: 'rgba(0,0,0,0.2)' }"
              >
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  style="background: rgba(34,197,94,0.2)"
                >
                  <CheckCircle :size="20" style="color: '#22c55e'" />
                </div>
                <div class="flex-1">
                  <div class="font-medium text-sm" style="color: var(--color-text-primary)">{{ quest.title }}</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">已完成 · {{ quest.time }}</div>
                </div>
                <div class="text-sm" style="color: '#22c55e'">已领取</div>
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
import Button from '@/components/ui/Button.vue'
import Tabs from '@/components/ui/Tabs.vue'
import { Scroll, Sword, ScrollText, Star, Zap, CheckCircle, Circle, ChevronRight, Gift, Target, BookOpen } from 'lucide-vue-next'

const tabs = [
  { label: '进行中', value: 'active' },
  { label: '可接取', value: 'available' },
  { label: '已完成', value: 'completed' },
]

const activeCount = 3
const completedCount = 12

const activeQuests = [
  {
    id: 1, title: '宗门任务·除魔', desc: '前往青云山脉清除妖兽威胁', type: '宗门任务', icon: markRaw(Sword), color: '#f87171', bg: 'rgba(248,113,113,0.2)', border: 'rgba(248,113,113,0.3)', rarity: 'danger',
    objectives: [
      { text: '击杀妖兽', current: 8, total: 10, completed: false },
      { text: '收集材料', current: 5, total: 5, completed: true },
    ],
    reward: { stones: 500, exp: 500 },
    canClaim: false,
  },
  {
    id: 2, title: '炼丹大师', desc: '炼制珍贵的聚灵丹', type: '日常任务', icon: markRaw(Gift), color: '#a78bfa', bg: 'rgba(167,139,250,0.2)', border: 'rgba(167,139,250,0.3)', rarity: 'epic',
    objectives: [
      { text: '收集药材', current: 10, total: 10, completed: true },
      { text: '炼制成丹', current: 1, total: 1, completed: true },
    ],
    reward: { stones: 300, exp: 300 },
    canClaim: true,
  },
  {
    id: 3, title: '秘境探险', desc: '探索迷雾森林中的秘境', type: '限时任务', icon: markRaw(Target), color: '#f59e0b', bg: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.3)', rarity: 'legendary',
    objectives: [
      { text: '进入秘境', current: 1, total: 1, completed: true },
      { text: '获取宝物', current: 0, total: 3, completed: false },
    ],
    reward: { stones: 1000, exp: 1000 },
    canClaim: false,
  },
]

const availableQuests = [
  { id: 4, title: '护送任务', desc: '护送商队安全到达目的地', type: '支线任务', icon: markRaw(BookOpen), color: '#60a5fa', bg: 'rgba(96,165,250,0.2)', border: 'rgba(96,165,250,0.3)', rarity: 'jade', minLevel: 50, reward: { stones: 400, exp: 400 } },
  { id: 5, title: '采集草药', desc: '前往药谷采集珍贵药材', type: '日常任务', icon: markRaw(ScrollText), color: '#22c55e', bg: 'rgba(34,197,94,0.2)', border: 'rgba(34,197,94,0.3)', rarity: 'jade', minLevel: 30, reward: { stones: 200, exp: 200 } },
  { id: 6, title: '除妖悬赏', desc: '击杀悬赏榜上的妖兽', type: '悬赏任务', icon: markRaw(Sword), color: '#f87171', bg: 'rgba(248,113,113,0.2)', border: 'rgba(248,113,113,0.3)', rarity: 'danger', minLevel: 70, reward: { stones: 800, exp: 800 } },
  { id: 7, title: '古籍修复', desc: '帮助长老修复破损的古籍', type: '宗门任务', icon: markRaw(Scroll), color: 'var(--color-gold)', bg: 'rgba(212,168,67,0.2)', border: 'rgba(212,168,67,0.3)', rarity: 'gold', minLevel: 40, reward: { stones: 350, exp: 350 } },
]

const completedQuests = [
  { id: 8, title: '新手引导', time: '3天前' },
  { id: 9, title: '初入宗门', time: '3天前' },
  { id: 10, title: '入门试炼', time: '2天前' },
  { id: 11, title: '草药采集', time: '1天前' },
]

const handleQuest = (quest: any) => {
  if (quest.canClaim) {
    console.log('领取奖励:', quest.title)
  } else {
    console.log('继续任务:', quest.title)
  }
}

const acceptQuest = (quest: any) => {
  console.log('接取任务:', quest.title)
}
</script>
