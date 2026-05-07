<template>
  <span
    class="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full"
    :class="[getVariantClass(), sizeClasses[props.size]]"
    :style="customStyle"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: string
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  glow: false,
})

const variantClasses: Record<string, string> = {
  default: 'bg-[var(--color-border)] text-[var(--color-text-secondary)]',
  gold: 'bg-[var(--color-gold)] text-[var(--color-ink)]',
  jade: 'bg-[var(--color-jade)] text-[var(--color-ink)]',
  danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  legendary: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
}

const sizeClasses = {
  sm: 'px-1.5 py-0 text-[10px]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
}

const getVariantClass = () => {
  return variantClasses[props.variant] || variantClasses.default
}

const customStyle = props.glow ? {
  boxShadow: '0 0 12px var(--color-gold)',
} : {}
</script>
