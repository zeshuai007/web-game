<template>
  <span class="tabular-nums font-mono">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Props {
  value: number
  duration?: number
  format?: (val: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  duration: 1000,
  format: (val: number) => Math.round(val).toLocaleString(),
})

const displayValue = ref(props.format(props.value))
let animationFrame: number | null = null

const animateValue = (start: number, end: number, duration: number) => {
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = start + (end - start) * easeOut

    displayValue.value = props.format(current)

    if (progress < 1) {
      animationFrame = requestAnimationFrame(update)
    }
  }

  animationFrame = requestAnimationFrame(update)
}

watch(() => props.value, (newVal, oldVal) => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  animateValue(oldVal || 0, newVal, props.duration)
})

onMounted(() => {
  displayValue.value = props.format(props.value)
})
</script>
