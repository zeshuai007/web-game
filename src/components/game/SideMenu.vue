<template>
  <div
    class="flex flex-col h-full"
    :style="{ background: 'linear-gradient(180deg, rgba(13,17,23,0.98) 0%, rgba(22,27,34,0.95) 100%)', borderRight: '1px solid var(--color-border-gold)' }"
  >
    <div class="p-4">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-lg overflow-hidden border-2" style="borderColor: var(--color-border-gold); boxShadow: 0 0 20px rgba(212,168,67,0.3)">
          <img
            :src="avatar || '/images/avatar-placeholder.png'"
            alt="avatar"
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 class="font-semibold" style="color: var(--color-text-primary)">{{ username }}</h3>
          <p class="text-xs" style="color: var(--color-text-muted)">等级 {{ level }} · {{ sect }}</p>
        </div>
      </div>

      <div class="space-y-1">
        <button
          v-for="item in menuItems"
          :key="item.path"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
          :class="[
            isActive(item.path)
              ? 'bg-[rgba(212,168,67,0.15)] border border-[rgba(212,168,67,0.3)]'
              : 'hover:bg-white/5'
          ]"
          @click="navigate(item.path)"
        >
          <component
            :is="item.icon"
            :size="20"
            :style="{ color: isActive(item.path) ? 'var(--color-gold)' : 'var(--color-text-secondary)' }"
          />
          <span
            class="font-medium"
            :style="{ color: isActive(item.path) ? 'var(--color-gold)' : 'var(--color-text-primary)' }"
          >
            {{ item.label }}
          </span>
          <span
            v-if="item.badge"
            class="ml-auto px-2 py-0.5 text-xs font-medium rounded-full"
            style="background: rgba(212,168,67,0.2); color: var(--color-gold)"
          >
            {{ item.badge }}
          </span>
        </button>
      </div>
    </div>

    <div class="mt-auto p-4" style="borderTop: 1px solid var(--color-border)">
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs" style="color: var(--color-text-muted)">
          <span>今日活跃</span>
          <span class="font-medium" style="color: var(--color-jade)">{{ activity }}/100</span>
        </div>
        <div class="h-1.5 rounded-full overflow-hidden" style="background: rgba(0,0,0,0.3)">
          <div
            class="h-full rounded-full transition-all duration-300"
            style="background: linear-gradient(90deg, var(--color-jade), var(--color-gold))"
            :style="{ width: `${activity}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Home,
  User,
  Sparkles,
  Compass,
  Scroll,
  Package,
  ShoppingBag,
  Trophy,
  Users,
  Settings,
  Activity,
} from 'lucide-vue-next'

interface Props {
  username?: string
  level?: number
  sect?: string
  activity?: number
  avatar?: string
}

withDefaults(defineProps<Props>(), {
  username: '散修弟子',
  level: 1,
  sect: '无宗门',
  activity: 0,
  avatar: '',
})

const route = useRoute()
const router = useRouter()

const menuItems = [
  { label: '首页大厅', path: '/lobby', icon: Home },
  { label: '角色', path: '/character', icon: User },
  { label: '修炼', path: '/cultivation', icon: Sparkles },
  { label: '探索', path: '/explore', icon: Compass },
  { label: '任务', path: '/quests', icon: Scroll, badge: '3' },
  { label: '背包', path: '/inventory', icon: Package },
  { label: '商店', path: '/shop', icon: ShoppingBag },
  { label: '排行榜', path: '/ranking', icon: Trophy },
  { label: '社交', path: '/social', icon: Users },
  { label: '设置', path: '/settings', icon: Settings },
]

const isActive = (path: string) => route.path === path

const navigate = (path: string) => {
  router.push(path)
}
</script>
