<template>
  <div
    class="relative flex flex-col h-screen overflow-hidden"
    :style="{ background: 'var(--color-ink)' }"
  >
    <GameHeader
      :spirit-stones="spiritStones"
      :stamina="stamina"
      :level="level"
      :notification-count="notificationCount"
      @toggle-menu="sideMenuOpen = !sideMenuOpen"
    />

    <div class="flex flex-1 overflow-hidden relative">
      <Transition name="slide">
        <div
          v-if="sideMenuOpen"
          class="fixed lg:static inset-y-0 left-0 z-40 w-72 lg:w-64 shrink-0"
        >
          <SideMenu
            :username="username"
            :level="level"
            :sect="sect"
            :activity="activity"
          />
        </div>
      </Transition>

      <div
        v-if="sideMenuOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        @click="sideMenuOpen = false"
      />

      <main class="flex-1 overflow-y-auto relative" style="padding-bottom: 80px">
        <div class="max-w-6xl mx-auto px-4 py-4">
          <slot></slot>
        </div>
      </main>
    </div>

    <BottomActionBar :actions="bottomActions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GameHeader from '@/components/game/GameHeader.vue'
import SideMenu from '@/components/game/SideMenu.vue'
import BottomActionBar from '@/components/game/BottomActionBar.vue'

interface Props {
  username?: string
  level?: number
  sect?: string
  spiritStones?: number
  stamina?: number
  activity?: number
  notificationCount?: number
}

withDefaults(defineProps<Props>(), {
  username: '散修弟子',
  level: 1,
  sect: '无宗门',
  spiritStones: 0,
  stamina: 100,
  activity: 0,
  notificationCount: 0,
})

const sideMenuOpen = ref(false)

const bottomActions = ref([
  { id: 'home', label: '首页', icon: 'Home', color: 'var(--color-jade)' },
  { id: 'explore', label: '探索', icon: 'Compass', color: '#a78bfa' },
  { id: 'battle', label: '战斗', icon: 'Sword', color: '#f87171' },
  { id: 'social', label: '社交', icon: 'Users', color: '#60a5fa' },
  { id: 'notice', label: '公告', icon: 'Bell', color: 'var(--color-gold)' },
])
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
