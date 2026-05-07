<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="handleClose"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="handleClose" />

        <div
          class="relative w-full max-h-[90vh] overflow-hidden rounded-lg"
          :class="[sizeClasses[size]]"
          :style="{ background: 'linear-gradient(145deg, rgba(22,27,34,0.98) 0%, rgba(13,17,23,0.99) 100%)', border: '1px solid var(--color-border-gold)', boxShadow: '0 0 60px rgba(212,168,67,0.2)' }"
        >
          <div v-if="$slots.header || title" class="px-6 py-4" style="border-bottom: 1px solid var(--color-border)">
            <slot name="header">
              <h3 class="text-lg font-semibold text-glow-gold">{{ title }}</h3>
            </slot>
            <button
              v-if="closable"
              class="absolute top-4 right-4 p-1 rounded hover:bg-white/10 transition-colors"
              @click="handleClose"
            >
              <X :size="20" style="color: var(--color-text-muted)" />
            </button>
          </div>

          <div class="px-6 py-4 overflow-y-auto" :style="{ maxHeight: 'calc(90vh - 140px)' }">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="px-6 py-4 flex justify-end gap-3" style="border-top: 1px solid var(--color-border)">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closable: true,
  closeOnEscape: true,
})

const emit = defineEmits(['update:modelValue', 'close'])

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const handleClose = () => {
  if (props.closable) {
    emit('update:modelValue', false)
    emit('close')
  }
}

watch(() => props.modelValue, (val) => {
  if (val && props.closeOnEscape) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95);
}
</style>
