<template>
  <div class="w-full">
    <div
      class="flex border-b"
      :style="{ borderColor: 'var(--color-border)' }"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        class="relative px-4 py-2.5 text-sm font-medium transition-all duration-200"
        :class="[
          activeTab === tab.value
            ? 'text-glow-gold'
            : 'hover:text-[var(--color-text-primary)]',
        ]"
        :style="{ color: activeTab === tab.value ? 'var(--color-gold)' : 'var(--color-text-secondary)' }"
        @click="selectTab(tab.value)"
      >
        {{ tab.label }}
        <div
          v-if="activeTab === tab.value"
          class="absolute bottom-0 left-0 right-0 h-0.5"
          :style="{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }"
        />
      </button>
    </div>

    <div class="mt-4">
      <slot :name="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

interface Tab {
  label: string
  value: string
}

interface Props {
  tabs: Tab[]
  defaultValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
})

const activeTab = ref(props.defaultValue || props.tabs[0]?.value || '')

provide('activeTab', activeTab)

const selectTab = (value: string) => {
  activeTab.value = value
}
</script>
