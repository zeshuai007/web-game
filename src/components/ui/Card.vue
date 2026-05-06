<template>
  <div
    class="game-card"
    :class="[
      glow ? 'animate-pulse-gold' : '',
      className,
      rarity ? rarityClasses[rarity] : '',
      'transition-all duration-300 hover:translate-y-[-2px]'
    ]"
    style="border: 1px solid var(--color-border); border-radius: var(--radius-lg);"
  >
    <!-- 装饰角 - 左上角 -->
    <div
      class="absolute top-0 left-0 w-4 h-4 pointer-events-none"
      style="border-top: 2px solid var(--color-border-gold); border-left: 2px solid var(--color-border-gold); border-top-left-radius: var(--radius-lg);"
    />
    <!-- 装饰角 - 右上角 -->
    <div
      class="absolute top-0 right-0 w-4 h-4 pointer-events-none"
      style="border-top: 2px solid var(--color-border-gold); border-right: 2px solid var(--color-border-gold); border-top-right-radius: var(--radius-lg);"
    />
    <!-- 装饰角 - 左下角 -->
    <div
      class="absolute bottom-0 left-0 w-4 h-4 pointer-events-none"
      style="border-bottom: 2px solid var(--color-border-gold); border-left: 2px solid var(--color-border-gold); border-bottom-left-radius: var(--radius-lg);"
    />
    <!-- 装饰角 - 右下角 -->
    <div
      class="absolute bottom-0 right-0 w-4 h-4 pointer-events-none"
      style="border-bottom: 2px solid var(--color-border-gold); border-right: 2px solid var(--color-border-gold); border-bottom-right-radius: var(--radius-lg);"
    />

    <div v-if="$slots.title || $slots.extra" class="flex items-center justify-between px-4 py-3 relative" style="border-bottom: 1px solid var(--color-border); background: linear-gradient(180deg, rgba(212,168,67,0.05) 0%, transparent 100%);">
      <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border-gold), transparent);"></div>
      <span v-if="$slots.title" class="text-sm font-semibold text-glow-gold relative z-10">
        <slot name="title"></slot>
      </span>
      <div v-if="$slots.extra" class="text-xs" style="color: var(--color-text-secondary);">
        <slot name="extra"></slot>
      </div>
    </div>
    <div :class="noPadding ? '' : `p-4 ${bodyClassName}`">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string
  bodyClassName?: string
  noPadding?: boolean
  glow?: boolean
  rarity?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
  bodyClassName: '',
  noPadding: false,
  glow: false,
})

const rarityClasses: Record<string, string> = {
  common: 'rarity-border-common',
  uncommon: 'rarity-border-uncommon',
  rare: 'rarity-border-rare',
  epic: 'rarity-border-epic',
  legendary: 'rarity-border-legendary',
  divine: 'rarity-border-divine',
}
</script>
