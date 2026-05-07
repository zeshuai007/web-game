<template>
  <div class="absolute inset-0 pointer-events-none" :class="className">
    <div
      v-if="glow"
      class="absolute inset-0"
      :style="{ background: `radial-gradient(ellipse at 50% 50%, ${glowColor} 0%, transparent 60%)` }"
    />
    <img
      :src="src"
      alt="page atmosphere"
      class="absolute inset-0 w-full h-full object-cover select-none"
      :style="{ opacity, mixBlendMode: mixBlendMode as any, filter: 'saturate(1.1) contrast(1.05)' }"
      draggable="false"
    />
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: linear-gradient(180deg, rgba(13,17,23,0.15) 0%, transparent 30%, transparent 70%, rgba(13,17,23,0.25) 100%);"
    />
    <template v-if="glow">
      <div
        class="absolute top-0 left-0 w-64 h-64 rounded-full"
        style="background: radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%); animation: float 8s ease-in-out infinite"
      />
      <div
        class="absolute bottom-0 right-0 w-80 h-80 rounded-full"
        style="background: radial-gradient(circle, rgba(126,203,161,0.06) 0%, transparent 70%); animation: float 10s ease-in-out infinite reverse"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  className?: string
  opacity?: number
  parallax?: boolean
  parallaxIntensity?: number
  mixBlendMode?: string
  glow?: boolean
  glowColor?: string
  zoomRange?: [number, number]
}

withDefaults(defineProps<Props>(), {
  className: '',
  opacity: 0.3,
  parallax: true,
  parallaxIntensity: 20,
  mixBlendMode: 'normal',
  glow: true,
  glowColor: 'rgba(212, 168, 67, 0.2)',
  zoomRange: () => [1.02, 1.05],
})
</script>
