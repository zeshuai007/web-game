<template>
  <div class="animate-pulse space-y-3">
    <div
      v-for="i in count"
      :key="i"
      class="rounded-lg"
      :class="variant === 'card' ? 'p-4' : ''"
      :style="{
        background: variant === 'card'
          ? 'linear-gradient(145deg, rgba(22,27,34,0.8) 0%, rgba(13,17,23,0.9) 100%)'
          : 'rgba(212,168,67,0.1)',
        border: variant === 'card' ? '1px solid var(--color-border)' : 'none',
        height: variant === 'text' ? `${height}px` : `${size}px`,
        width: variant === 'text' ? `${width}px` : '100%',
      }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number
  variant?: 'default' | 'card' | 'text'
  size?: number
  height?: number
  width?: number
}

withDefaults(defineProps<Props>(), {
  count: 3,
  variant: 'default',
  size: 48,
  height: 16,
  width: 120,
})
</script>
