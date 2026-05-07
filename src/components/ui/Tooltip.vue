<template>
  <div class="relative inline-block" @mouseenter="show = true" @mouseleave="show = false">
    <slot></slot>

    <Transition name="tooltip">
      <div
        v-if="show && content"
        class="absolute z-50 px-3 py-2 text-sm rounded-lg shadow-xl pointer-events-none whitespace-nowrap"
        :class="[positionClasses[position]]"
        :style="{
          background: 'rgba(22,27,34,0.98)',
          border: '1px solid var(--color-border-gold)',
          color: 'var(--color-text-primary)',
          boxShadow: '0 0 20px rgba(212,168,67,0.15)'
        }"
      >
        {{ content }}
        <div
          v-if="arrow"
          class="absolute w-2 h-2 rotate-45"
          :class="[arrowClasses[position]]"
          :style="{ background: 'rgba(22,27,34,0.98)', borderColor: 'var(--color-border-gold)' }"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  position: 'top',
  arrow: true,
})

const show = ref(false)

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses = {
  top: '-bottom-1 left-1/2 -translate-x-1/2 border-b border-l',
  bottom: '-top-1 left-1/2 -translate-x-1/2 border-t border-r',
  left: '-right-1 top-1/2 -translate-y-1/2 border-t border-l',
  right: '-left-1 top-1/2 -translate-y-1/2 border-b border-r',
}
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
