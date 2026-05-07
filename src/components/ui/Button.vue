<template>
  <button
    ref="btnRef"
    class="btn-game"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      className,
      rippleVariants.includes(variant) ? 'relative overflow-hidden' : '',
      glow && !loading ? glowClasses[variant] : '',
      'transition-transform duration-200'
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <template v-if="loading">
      <LoaderIcon class="animate-spin" />
    </template>
    <template v-else-if="$slots.icon && isHovered && rippleVariants.includes(variant)">
      <span class="transform scale-110 transition-transform duration-200">
        <slot name="icon"></slot>
      </span>
    </template>
    <template v-else>
      <slot name="icon"></slot>
    </template>
    <slot v-if="$slots.default" class="transition-transform duration-200"></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loader2 as LoaderIcon } from 'lucide-vue-next'

type ButtonVariant = 'gold' | 'jade' | 'outline' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  glow?: boolean
  className?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gold',
  size: 'md',
  loading: false,
  glow: false,
  className: '',
  disabled: false,
})

const emit = defineEmits(['click'])

const btnRef = ref<HTMLButtonElement | null>(null)
const isHovered = ref(false)

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3 text-base',
}

const variantClasses: Record<ButtonVariant, string> = {
  gold: 'btn-gold',
  jade: 'btn-jade',
  outline: 'btn-outline',
  danger: 'btn-danger',
  ghost: 'bg-transparent text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-white/5',
}

const glowClasses: Record<ButtonVariant, string> = {
  gold: 'animate-pulse-gold',
  jade: 'animate-pulse-gold',
  outline: 'animate-pulse-gold',
  danger: '',
  ghost: '',
}

const rippleVariants: ButtonVariant[] = ['gold', 'jade', 'danger']

const handleClick = (e: MouseEvent) => {
  if (rippleVariants.includes(props.variant) && btnRef.value) {
    const btn = btnRef.value
    const rect = btn.getBoundingClientRect()
    const diameter = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - diameter / 2
    const y = e.clientY - rect.top - diameter / 2

    const ripple = document.createElement('span')
    ripple.className = 'btn-ripple'
    ripple.style.cssText = `width:${diameter}px;height:${diameter}px;left:${x}px;top:${y}px;`
    btn.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }
  emit('click', e)
}
</script>
