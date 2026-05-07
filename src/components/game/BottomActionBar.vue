<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
    style="background: linear-gradient(180deg, transparent 0%, rgba(13,17,23,0.95) 20%); paddingBottom: env(safe-area-inset-bottom)"
  >
    <div
      class="flex items-center gap-2 px-4 py-3 mx-4 rounded-full shadow-lg"
      :style="{
        background: 'rgba(22,27,34,0.95)',
        border: '1px solid var(--color-border-gold)',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(212,168,67,0.1)',
        backdropFilter: 'blur(12px)'
      }"
    >
      <button
        v-for="(action, index) in actions"
        :key="action.id"
        class="flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 min-w-[56px]"
        :class="[
          activeAction === action.id
            ? 'scale-110'
            : 'hover:scale-105'
        ]"
        :style="{
          background: activeAction === action.id
            ? `linear-gradient(145deg, rgba(212,168,67,0.2) 0%, rgba(212,168,67,0.1) 100%)`
            : 'transparent',
          boxShadow: activeAction === action.id ? '0 0 12px rgba(212,168,67,0.3)' : 'none'
        }"
        @click="handleAction(action)"
        @mouseenter="activeAction = action.id"
        @mouseleave="activeAction = null"
      >
        <component
          :is="action.icon"
          :size="action.size || 20"
          :style="{
            color: activeAction === action.id
              ? 'var(--color-gold)'
              : action.color || 'var(--color-text-secondary)',
            filter: activeAction === action.id
              ? `drop-shadow(0 0 6px ${action.color || 'var(--color-gold)'})`
              : 'none',
            transition: 'all 0.2s ease'
          }"
        />
        <span
          v-if="action.label"
          class="text-[10px] mt-1 font-medium"
          :style="{
            color: activeAction === action.id
              ? 'var(--color-gold)'
              : 'var(--color-text-secondary)'
          }"
        >
          {{ action.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { Home, Compass, Sword, Users, Bell } from 'lucide-vue-next'

interface Action {
  id: string
  label?: string
  icon: any
  color?: string
  size?: number
  action?: () => void
}

defineProps<{
  actions?: Action[]
}>()

const activeAction = ref<string | null>(null)

const defaultActions: Action[] = [
  { id: 'home', label: '首页', icon: markRaw(Home), color: 'var(--color-jade)' },
  { id: 'explore', label: '探索', icon: markRaw(Compass), color: '#a78bfa' },
  { id: 'battle', label: '战斗', icon: markRaw(Sword), color: '#f87171' },
  { id: 'social', label: '社交', icon: markRaw(Users), color: '#60a5fa' },
  { id: 'notice', label: '公告', icon: markRaw(Bell), color: 'var(--color-gold)' },
]

const actions = ref<Action[]>(defaultActions)

const handleAction = (action: Action) => {
  if (action.action) {
    action.action()
  }
}
</script>
