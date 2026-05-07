<template>
  <div class="relative w-full">
    <div
      class="overflow-hidden rounded-full"
      :class="[variantClasses[variant], sizeClasses[size]]"
      :style="{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }"
    >
      <div
        class="h-full rounded-full transition-all duration-300 ease-out"
        :class="[variantClasses[variant], animated ? 'animate-pulse' : '']"
        :style="{ width: `${Math.min(100, Math.max(0, percentage))}%`, background: getGradient() }"
      />
    </div>
    <div v-if="showLabel" class="flex justify-between mt-1 text-xs" style="color: var(--color-text-muted)">
      <span>{{ label || '' }}</span>
      <span>{{ percentage }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  percentage: number
  variant?: 'gold' | 'jade' | 'danger' | 'purple' | 'blue'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showLabel?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gold',
  size: 'md',
  animated: false,
  showLabel: false,
  label: '',
})

const variantClasses = {
  gold: '',
  jade: '',
  danger: '',
  purple: '',
  blue: '',
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const getGradient = () => {
  const colors = {
    gold: 'linear-gradient(90deg, rgba(212,168,67,0.8), rgba(212,168,67,1))',
    jade: 'linear-gradient(90deg, rgba(126,203,161,0.8), rgba(126,203,161,1))',
    danger: 'linear-gradient(90deg, rgba(248,113,113,0.8), rgba(248,113,113,1))',
    purple: 'linear-gradient(90deg, rgba(167,139,250,0.8), rgba(167,139,250,1))',
    blue: 'linear-gradient(90deg, rgba(96,165,250,0.8), rgba(96,165,250,1))',
  }
  return colors[props.variant]
}
</script>
