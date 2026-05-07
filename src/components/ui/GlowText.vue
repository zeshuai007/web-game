<template>
  <span
    class="font-bold tracking-wide"
    :class="[variantClasses[variant]]"
    :style="{ textShadow: getTextShadow() }"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'gold' | 'jade' | 'epic' | 'danger'
}

withDefaults(defineProps<Props>(), {
  variant: 'gold',
})

const variantClasses = {
  gold: 'text-glow-gold',
  jade: 'text-[var(--color-jade)]',
  epic: 'text-purple-400',
  danger: 'text-red-400',
}

const getTextShadow = () => {
  return '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
}
</script>

<style scoped>
.text-glow-gold {
  color: var(--color-gold);
}
</style>
