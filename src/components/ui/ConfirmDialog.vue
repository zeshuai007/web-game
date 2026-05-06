<template>
  <Modal :model-value="modelValue" :title="title" size="sm" @close="handleCancel">
    <div class="flex items-start gap-4">
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        :class="[
          type === 'danger' ? 'bg-red-500/20' : 'bg-yellow-500/20'
        ]"
      >
        <AlertTriangle
          :size="24"
          :class="type === 'danger' ? 'text-red-500' : 'text-yellow-500'"
        />
      </div>
      <div class="flex-1">
        <p class="text-sm" style="color: var(--color-text-primary)">
          {{ message }}
        </p>
        <p v-if="description" class="text-xs mt-2" style="color: var(--color-text-muted)">
          {{ description }}
        </p>
      </div>
    </div>

    <template #footer>
      <Button variant="ghost" @click="handleCancel">{{ cancelText }}</Button>
      <Button :variant="type === 'danger' ? 'danger' : 'gold'" @click="handleConfirm">
        {{ confirmText }}
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'
import Modal from './Modal.vue'
import Button from './Button.vue'

interface Props {
  modelValue: boolean
  title?: string
  message: string
  description?: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  title: '确认操作',
  message: '确定要执行此操作吗？',
  description: '',
  confirmText: '确定',
  cancelText: '取消',
  type: 'danger',
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>
