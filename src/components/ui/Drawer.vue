<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50"
        @click.self="handleClose"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="handleClose" />

        <div
          class="fixed bg-[var(--color-ink)] overflow-hidden shadow-2xl flex flex-col"
          :class="[
            positionClasses[position],
            sizeClasses[size]
          ]"
          :style="{ border: '1px solid var(--color-border-gold)' }"
        >
          <div v-if="$slots.header || title" class="px-6 py-4 shrink-0" :style="{ borderBottom: '1px solid var(--color-border)' }">
            <div class="flex items-center justify-between">
              <slot name="header">
                <h3 class="text-lg font-semibold text-glow-gold">{{ title }}</h3>
              </slot>
              <button
                v-if="closable"
                class="p-1 rounded hover:bg-white/10 transition-colors"
                @click="handleClose"
              >
                <X :size="20" style="color: var(--color-text-muted)" />
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="px-6 py-4 shrink-0" :style="{ borderTop: '1px solid var(--color-border)' }">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  position: 'right',
  size: 'md',
  closable: true,
})

const emit = defineEmits(['update:modelValue', 'close'])

const positionClasses = {
  left: 'top-0 left-0 h-full',
  right: 'top-0 right-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full',
}

const sizeClasses = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96',
  xl: 'w-[500px]',
  full: 'w-full h-full',
}

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from > div:last-child,
.drawer-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
