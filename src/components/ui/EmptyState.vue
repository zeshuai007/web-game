<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-16 h-16 mb-4 rounded-full flex items-center justify-center" :style="{ background: 'rgba(212,168,67,0.1)' }">
      <component :is="icon" :size="32" style="color: var(--color-gold); opacity: 0.6" />
    </div>
    <h3 v-if="title" class="text-lg font-medium mb-2" style="color: var(--color-text-primary)">
      {{ title }}
    </h3>
    <p v-if="description" class="text-sm mb-6 max-w-sm" style="color: var(--color-text-muted)">
      {{ description }}
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { Package } from 'lucide-vue-next'

interface Props {
  title?: string
  description?: string
  icon?: any
}

withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  icon: markRaw(Package),
})
</script>
