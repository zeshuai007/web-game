<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px] max-w-md"
          :class="[typeClasses[toast.type]]"
          :style="{
            background: 'rgba(22,27,34,0.98)',
            border: '1px solid var(--color-border)'
          }"
        >
          <component :is="getIcon(toast.type)" :size="20" :class="getIconClass(toast.type)" />
          <div class="flex-1">
            <p v-if="toast.title" class="font-medium text-sm" style="color: var(--color-text-primary)">
              {{ toast.title }}
            </p>
            <p class="text-sm" :style="{ color: toast.title ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }">
              {{ toast.message }}
            </p>
          </div>
          <button
            class="p-1 rounded hover:bg-white/10 transition-colors shrink-0"
            @click="removeToast(toast.id)"
          >
            <X :size="16" style="color: var(--color-text-muted)" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-vue-next'

interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  title?: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

const typeClasses = {
  success: 'border-l-4 border-l-green-500',
  error: 'border-l-4 border-l-red-500',
  info: 'border-l-4 border-l-blue-500',
  warning: 'border-l-4 border-l-yellow-500',
}

const getIcon = (type: string) => {
  const icons = {
    success: markRaw(CheckCircle),
    error: markRaw(AlertCircle),
    info: markRaw(Info),
    warning: markRaw(AlertTriangle),
  }
  return icons[type as keyof typeof icons] || markRaw(Info)
}

const getIconClass = (type: string) => {
  const classes: Record<string, string> = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
  }
  return classes[type] || ''
}

const addToast = (type: Toast['type'], message: string, title?: string) => {
  const id = nextId++
  toasts.value.push({ id, type, message, title })

  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

defineExpose({
  success: (message: string, title?: string) => addToast('success', message, title),
  error: (message: string, title?: string) => addToast('error', message, title),
  info: (message: string, title?: string) => addToast('info', message, title),
  warning: (message: string, title?: string) => addToast('warning', message, title),
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
