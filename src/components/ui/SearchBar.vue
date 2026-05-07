<template>
  <div class="relative">
    <div
      class="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200"
      :style="{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--color-border)' }"
      :class="focused ? 'border-[var(--color-gold)]' : ''"
    >
      <Search :size="16" :style="{ color: focused ? 'var(--color-gold)' : 'var(--color-text-muted)', transition: 'color 0.2s' }" />
      <input
        ref="inputRef"
        v-model="model"
        class="flex-1 bg-transparent outline-none text-sm"
        :style="{ color: 'var(--color-text-primary)' }"
        :placeholder="placeholder"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        v-if="model"
        class="p-1 rounded hover:bg-white/10 transition-colors"
        @click="clear"
      >
        <X :size="14" style="color: var(--color-text-muted)" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, X } from 'lucide-vue-next'

interface Props {
  modelValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '搜索...',
})

const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)
const focused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

const clear = () => {
  model.value = ''
  emit('update:modelValue', '')
  inputRef.value?.focus()
}
</script>
