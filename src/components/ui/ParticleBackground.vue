<template>
  <div ref="containerRef" class="absolute inset-0 overflow-hidden pointer-events-none">
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  particleCount?: number
  color?: string
  maxSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 50,
  color: '#d4a843',
  maxSize: 3,
})

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let particles: any[] = []

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  pulseSpeed: number
  pulseOffset: number
}

const initParticles = (width: number, height: number) => {
  particles = Array.from({ length: props.particleCount }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * props.maxSize + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    pulseOffset: Math.random() * Math.PI * 2,
  }))
}

const animate = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
  ctx.clearRect(0, 0, width, height)

  particles.forEach((p) => {
    p.x += p.speedX
    p.y += p.speedY

    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7
    const currentOpacity = p.opacity * pulse

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = props.color
    ctx.globalAlpha = currentOpacity
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
    gradient.addColorStop(0, props.color)
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.globalAlpha = currentOpacity * 0.3
    ctx.fill()
  })

  ctx.globalAlpha = 1
  animationId = requestAnimationFrame((t) => animate(ctx, width, height, t))
}

onMounted(() => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    const { width, height } = container.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    initParticles(width, height)
  }

  resize()
  window.addEventListener('resize', resize)

  const time = 0
  animationId = requestAnimationFrame((t) => animate(ctx, canvas.width, canvas.height, t))
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>
