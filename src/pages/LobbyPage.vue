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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="relative overflow-hidden">
          <div
            class="absolute inset-0 opacity-20"
            style="background: radial-gradient(ellipse at 50% 0%, rgba(212,168,67,0.3) 0%, transparent 60%)"
          />
          <div class="relative">
            <h2 class="text-xl font-bold text-glow-gold mb-4 flex items-center gap-2">
              <Sparkles :size="20" />
              今日修仙
            </h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm" style="color: var(--color-text-secondary)">修炼进度</span>
                <span class="text-sm font-medium" style="color: var(--color-jade)">75/100</span>
              </div>
              <ProgressBar :percentage="75" variant="jade" :animated="true" />

              <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="text-center">
                  <div class="text-2xl font-bold" style="color: var(--color-gold)">128</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">灵石</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold" style="color: var(--color-jade)">12</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">丹药</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold" style="color: #a78bfa">5</div>
                  <div class="text-xs" style="color: var(--color-text-muted)">功法</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card class="relative overflow-hidden">
          <div
            class="absolute inset-0 opacity-20"
            style="background: radial-gradient(ellipse at 50% 0%, rgba(126,203,161,0.3) 0%, transparent 60%)"
          />
          <div class="relative">
            <h2 class="text-xl font-bold text-glow-gold mb-4 flex items-center gap-2">
              <Zap :size="20" />
              快速行动
            </h2>
            <div class="grid grid-cols-2 gap-3">
              <Button variant="gold" size="sm" class="justify-start">
                <Sword :size="16" />
                开始修炼
              </Button>
              <Button variant="jade" size="sm" class="justify-start">
                <Compass :size="16" />
                探索秘境
              </Button>
              <Button variant="outline" size="sm" class="justify-start">
                <Scroll :size="16" />
                领取任务
              </Button>
              <Button variant="outline" size="sm" class="justify-start">
                <ShoppingBag :size="16" />
                前往商店
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card title="进行中的任务" :glow="true">
        <template #extra>
          <Badge variant="gold">3个进行中</Badge>
        </template>
        <div class="space-y-3">
          <div
            v-for="quest in quests"
            :key="quest.id"
            class="flex items-center gap-4 p-3 rounded-lg"
            style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border)"
          >
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center"
              :style="{ background: quest.color + '20' }"
            >
              <component :is="quest.icon" :size="24" :style="{ color: quest.color }" />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-sm" style="color: var(--color-text-primary)">{{ quest.title }}</h4>
              <p class="text-xs mt-1" style="color: var(--color-text-muted)">{{ quest.desc }}</p>
            </div>
            <Badge :variant="quest.rarity">{{ quest.reward }}</Badge>
          </div>
        </div>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="公告" :no-padding="true">
          <div class="divide-y" style="border-color: var(--color-border)">
            <div
              v-for="ann in announcements"
              :key="ann.id"
              class="p-4 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div class="flex items-start gap-3">
                <Badge :variant="ann.type" size="sm">{{ ann.tag }}</Badge>
                <div class="flex-1">
                  <h4 class="text-sm font-medium" style="color: var(--color-text-primary)">{{ ann.title }}</h4>
                  <p class="text-xs mt-1" style="color: var(--color-text-muted)">{{ ann.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="活动" :no-padding="true" class="md:col-span-2">
          <div class="grid grid-cols-2 gap-4 p-4">
            <div
              v-for="act in activities"
              :key="act.id"
              class="relative overflow-hidden rounded-lg p-4 cursor-pointer group"
              :style="{ background: act.bg }"
            >
              <div class="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 transform translate-x-6 -translate-y-6" :style="{ background: act.color }" />
              <div class="relative">
                <component :is="act.icon" :size="24" :style="{ color: act.color }" class="mb-2" />
                <h4 class="font-semibold text-sm" style="color: var(--color-text-primary)">{{ act.title }}</h4>
                <p class="text-xs mt-1" style="color: var(--color-text-secondary)">{{ act.desc }}</p>
                <Badge variant="danger" size="sm" class="mt-2">{{ act.time }}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { Sparkles, Zap, Sword, Compass, Scroll, ShoppingBag, Trophy, Star, Gift } from 'lucide-vue-next'

const quests = [
  { id: 1, title: '宗门任务·初级', desc: '击败10只妖兽', reward: '500灵石', icon: markRaw(Sword), color: '#f87171', rarity: 'epic' as const },
  { id: 2, title: '炼丹修炼', desc: '炼制一颗聚灵丹', reward: '3丹药', icon: markRaw(Sparkles), color: '#a78bfa', rarity: 'gold' as const },
  { id: 3, title: '探索秘境', desc: '发现隐藏地点', reward: '1000灵石', icon: markRaw(Compass), color: '#60a5fa', rarity: 'legendary' as const },
]

const announcements = [
  { id: 1, title: '天道宗开放新版本更新公告', tag: '系统', type: 'gold' as const, time: '2小时前' },
  { id: 2, title: '限时活动·仙缘盛典即将开启', tag: '活动', type: 'epic' as const, time: '5小时前' },
  { id: 3, title: '服务器维护通知', tag: '维护', type: 'danger' as const, time: '1天前' },
]

const activities = [
  { id: 1, title: '仙缘盛典', desc: '获取双倍奖励', time: '剩余2天', icon: markRaw(Gift), color: '#f87171', bg: 'linear-gradient(145deg, rgba(248,113,113,0.1) 0%, rgba(248,113,113,0.05) 100%)' },
  { id: 2, title: '秘境探索', desc: '发现上古遗迹', time: '剩余5天', icon: markRaw(Compass), color: '#60a5fa', bg: 'linear-gradient(145deg, rgba(96,165,250,0.1) 0%, rgba(96,165,250,0.05) 100%)' },
  { id: 3, title: '排行榜冲刺', desc: '争夺第一名', time: '剩余7天', icon: markRaw(Trophy), color: '#fbbf24', bg: 'linear-gradient(145deg, rgba(251,191,36,0.1) 0%, rgba(251,191,36,0.05) 100%)' },
  { id: 4, title: '每日签到', desc: '连续签到奖励', time: '剩余1天', icon: markRaw(Star), color: '#a78bfa', bg: 'linear-gradient(145deg, rgba(167,139,250,0.1) 0%, rgba(167,139,250,0.05) 100%)' },
]
</script>
