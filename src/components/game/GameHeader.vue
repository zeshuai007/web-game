<template>
  <header
    class="relative z-40 px-4 py-3 flex items-center justify-between"
    :style="{ background: 'linear-gradient(180deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.8) 100%)', borderBottom: '1px solid var(--color-border)' }"
  >
    <div class="flex items-center gap-4">
      <button
        class="p-2 rounded-lg hover:bg-white/5 transition-colors lg:hidden"
        @click="$emit('toggle-menu')"
      >
        <Menu :size="24" style="color: var(--color-text-primary)" />
      </button>

      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: rgba(212,168,67,0.15); border: 1px solid var(--color-border-gold)">
          <Sparkles :size="20" style="color: var(--color-gold)" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-glow-gold tracking-wider">天道仙途</h1>
          <p class="text-xs" style="color: var(--color-text-muted)">修仙世界</p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <div class="hidden md:flex items-center gap-4">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background: rgba(212,168,67,0.1); border: 1px solid rgba(212,168,67,0.2)">
          <Zap :size="14" style="color: var(--color-gold)" />
          <span class="text-sm font-medium" style="color: var(--color-gold)">{{ spiritStones }}</span>
        </div>

        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background: rgba(126,203,161,0.1); border: 1px solid rgba(126,203,161,0.2)">
          <Activity :size="14" style="color: var(--color-jade)" />
          <span class="text-sm font-medium" style="color: var(--color-jade)">{{ stamina }}/100</span>
        </div>

        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.2)">
          <Star :size="14" style="color: #a78bfa" />
          <span class="text-sm font-medium" style="color: #a78bfa">Lv.{{ level }}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button class="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
          <Bell :size="20" style="color: var(--color-text-secondary)" />
          <span
            v-if="notificationCount > 0"
            class="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center"
            style="background: var(--color-danger); color: white"
          >
            {{ notificationCount > 9 ? '9+' : notificationCount }}
          </span>
        </button>

        <button class="p-2 rounded-lg hover:bg-white/5 transition-colors">
          <Settings :size="20" style="color: var(--color-text-secondary)" />
        </button>

        <div class="w-9 h-9 rounded-full overflow-hidden border-2" style="borderColor: var(--color-border-gold)">
          <img
            :src="avatar || '/images/avatar-placeholder.png'"
            alt="avatar"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, Bell, Settings, Sparkles, Zap, Activity, Star } from 'lucide-vue-next'

interface Props {
  spiritStones?: number
  stamina?: number
  level?: number
  notificationCount?: number
  avatar?: string
}

withDefaults(defineProps<Props>(), {
  spiritStones: 0,
  stamina: 100,
  level: 1,
  notificationCount: 0,
  avatar: '',
})

defineEmits(['toggle-menu'])
</script>
