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
            <Sparkles :size="20" />
            修炼
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-sm" style="color: var(--color-text-muted)">当前境界：</span>
            <Badge variant="gold">{{ currentStage }}</Badge>
          </div>
        </div>

        <div class="relative">
          <div class="flex items-center justify-center mb-4">
            <div class="relative">
              <div
                class="w-48 h-48 rounded-full flex items-center justify-center"
                :style="{ background: 'radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%)' }"
              >
                <div
                  class="w-32 h-32 rounded-full flex items-center justify-center"
                  :style="{ background: 'radial-gradient(circle, rgba(212,168,67,0.3) 0%, rgba(13,17,23,0.9) 70%)', border: '2px solid var(--color-border-gold)', boxShadow: '0 0 30px rgba(212,168,67,0.3)' }"
                >
                  <div class="text-center">
                    <div class="text-3xl font-bold text-glow-gold">{{ cultivationProgress }}</div>
                    <div class="text-xs mt-1" style="color: var(--color-text-muted)">灵力值</div>
                  </div>
                </div>
              </div>

              <div
                class="absolute inset-0 rounded-full"
                style="border: 2px dashed var(--color-border-gold); opacity: 0.5; animation: rotateSlow 20s linear infinite"
              />
              <div
                class="absolute inset-4 rounded-full"
                style="border: 1px solid var(--color-border-gold); opacity: 0.3; animation: rotateSlow 15s linear infinite reverse"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="flex items-center justify-between text-sm mb-2">
              <span style="color: var(--color-text-secondary)">灵力进度</span>
              <span style="color: var(--color-gold)">{{ spiritPower }} / {{ maxSpiritPower }}</span>
            </div>
            <div class="h-3 rounded-full overflow-hidden" style="background: rgba(0,0,0,0.3); border: 1px solid var(--color-border)">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :style="{ width: `${(spiritPower / maxSpiritPower) * 100}%`, background: 'linear-gradient(90deg, var(--color-jade), var(--color-gold))' }"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
              <div class="text-lg font-bold" style="color: var(--color-jade)">{{ cultivationSpeed }}</div>
              <div class="text-xs" style="color: var(--color-text-muted)">修炼速度</div>
            </div>
            <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
              <div class="text-lg font-bold" style="color: var(--color-gold)">{{ bonusRate }}%</div>
              <div class="text-xs" style="color: var(--color-text-muted)">加成倍率</div>
            </div>
            <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
              <div class="text-lg font-bold" style="color: '#a78bfa'">{{ breakthroughChance }}%</div>
              <div class="text-xs" style="color: var(--color-text-muted)">突破概率</div>
            </div>
            <div class="text-center p-3 rounded-lg" style="background: rgba(0,0,0,0.2)">
              <div class="text-lg font-bold" style="color: '#fbbf24'">{{ currentStageExp }}</div>
              <div class="text-xs" style="color: var(--color-text-muted)">当前境界经验</div>
            </div>
          </div>
        </div>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="修炼方式">
          <div class="space-y-3">
            <button
              v-for="method in cultivationMethods"
              :key="method.id"
              class="w-full p-4 rounded-lg flex items-center gap-4 transition-all duration-200"
              :class="selectedMethod === method.id ? 'bg-[rgba(212,168,67,0.15)] border border-[var(--color-border-gold)]' : 'bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(212,168,67,0.05)]'"
              @click="selectMethod(method.id)"
            >
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center"
                :style="{ background: method.bg }"
              >
                <component :is="method.icon" :size="24" :style="{ color: method.color }" />
              </div>
              <div class="flex-1 text-left">
                <h4 class="font-medium" style="color: var(--color-text-primary)">{{ method.name }}</h4>
                <p class="text-xs mt-1" style="color: var(--color-text-muted)">{{ method.desc }}</p>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium" :style="{ color: method.color }">+{{ method.bonus }}%</div>
                <div class="text-xs" style="color: var(--color-text-muted)">{{ method.cost }}</div>
              </div>
            </button>
          </div>
        </Card>

        <Card title="功法">
          <div class="space-y-3">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="p-4 rounded-lg"
              :style="{ background: skill.bg, border: '1px solid ' + skill.border }"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :style="{ background: skill.iconBg }"
                  >
                    <component :is="skill.icon" :size="20" :style="{ color: skill.color }" />
                  </div>
                  <div>
                    <h4 class="font-medium text-sm" style="color: var(--color-text-primary)">{{ skill.name }}</h4>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs" style="color: var(--color-text-muted)">Lv.{{ skill.level }}</span>
                      <Badge :variant="skill.rarity">{{ skill.rarity }}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="gold" size="sm">升级</Button>
              </div>
              <p class="text-xs mt-2" style="color: var(--color-text-secondary)">{{ skill.desc }}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="突破">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 rounded-xl" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border)">
            <div class="text-2xl font-bold text-glow-gold mb-2">{{ nextStage }}</div>
            <p class="text-sm" style="color: var(--color-text-muted)">下一个境界</p>
            <div class="mt-4 flex items-center justify-center gap-2">
              <component :is="Unlock" :size="20" style="color: var(--color-jade)" />
              <span class="text-sm" style="color: var(--color-jade)">需要 {{ nextStageCost }} 灵力</span>
            </div>
            <Button
              variant="gold"
              class="w-full mt-4"
              :disabled="spiritPower < nextStageCost"
            >
              突破
            </Button>
          </div>

          <div class="text-center p-6 rounded-xl" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border)">
            <div class="text-2xl font-bold" style="color: '#a78bfa'" mb-2>丹药</div>
            <p class="text-sm" style="color: var(--color-text-muted)">辅助突破</p>
            <div class="mt-4 space-y-2">
              <div class="flex items-center justify-between px-4 py-2 rounded-lg" style="background: rgba(167,139,250,0.1)">
                <span class="text-sm" style="color: var(--color-text-primary)">聚灵丹</span>
                <span class="text-sm font-medium" style="color: '#a78bfa'">+10%</span>
              </div>
              <div class="flex items-center justify-between px-4 py-2 rounded-lg" style="background: rgba(212,168,67,0.1)">
                <span class="text-sm" style="color: var(--color-text-primary)">突破丹</span>
                <span class="text-sm font-medium" style="color: var(--color-gold)">+25%</span>
              </div>
            </div>
          </div>

          <div class="text-center p-6 rounded-xl" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border)">
            <div class="text-2xl font-bold" style="color: '#f59e0b'" mb-2>机缘</div>
            <p class="text-sm" style="color: var(--color-text-muted)">特殊事件</p>
            <div class="mt-4 flex items-center justify-center gap-2">
              <component :is="Sparkles" :size="24" style="color: '#f59e0b'" />
              <span class="text-sm" style="color: '#f59e0b'">有机缘出现！</span>
            </div>
            <Button variant="outline" class="w-full mt-4">探索机缘</Button>
          </div>
        </div>
      </Card>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { Sparkles, Flame, Moon, Sun, Zap, Unlock } from 'lucide-vue-next'

const currentStage = '渡劫期'
const cultivationProgress = '8888'
const spiritPower = 8888
const maxSpiritPower = 10000
const cultivationSpeed = 128
const bonusRate = 150
const breakthroughChance = 75
const currentStageExp = 88888
const nextStage = '大乘期'
const nextStageCost = 15000

const selectedMethod = ref('meditation')

const cultivationMethods = [
  { id: 'meditation', name: '打坐冥想', desc: '基础修炼方式，稳定提升灵力', icon: markRaw(Moon), color: '#a78bfa', bg: 'rgba(167,139,250,0.2)', bonus: 100, cost: '低消耗' },
  { id: 'cultivation', name: '闭关修炼', desc: '深度修炼，加速灵力增长', icon: markRaw(Flame), color: '#f87171', bg: 'rgba(248,113,113,0.2)', bonus: 150, cost: '中消耗' },
  { id: 'absorb', name: '吸收灵气', desc: '快速吸收天地灵气', icon: markRaw(Sun), color: '#fbbf24', bg: 'rgba(251,191,36,0.2)', bonus: 200, cost: '高消耗' },
]

const selectMethod = (id: string) => {
  selectedMethod.value = id
}

const skills = [
  { id: 1, name: '九转玄功', level: 10, rarity: 'legendary', icon: markRaw(Zap), color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', iconBg: 'rgba(245,158,11,0.2)', desc: '大幅提升灵力恢复速度' },
  { id: 2, name: '混沌心经', level: 8, rarity: 'epic', icon: markRaw(Sparkles), color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', iconBg: 'rgba(167,139,250,0.2)', desc: '增加修炼效率' },
]
</script>
