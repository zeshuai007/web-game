<template>
  <div class="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
    <PageAtmosphere
      src="/images/pages/login.png"
      class="-z-10"
      :opacity="0.38"
      :parallax="false"
      mix-blend-mode="soft-light"
      glow-color="rgba(212, 168, 67, 0.15)"
    />
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute bottom-0 left-0 right-0 h-2/3"
        style="background: radial-gradient(ellipse at 50% 100%, rgba(126,203,161,0.25) 0%, rgba(212,168,67,0.1) 40%, transparent 70%)"
      />

      <div
        class="absolute rounded-full"
        style="width: 500px; height: 160px; top: 18%; left: 5%; background: radial-gradient(ellipse, rgba(126,203,161,0.18) 0%, transparent 70%); filter: blur(24px); animation: driftLeft 60s ease-in-out infinite"
      />
      <div
        class="absolute rounded-full"
        style="width: 420px; height: 120px; top: 30%; right: 8%; background: radial-gradient(ellipse, rgba(212,168,67,0.14) 0%, transparent 70%); filter: blur(20px); animation: driftRight 70s ease-in-out infinite"
      />
      <div
        class="absolute rounded-full"
        style="width: 340px; height: 100px; top: 50%; left: 20%; background: radial-gradient(ellipse, rgba(126,203,161,0.1) 0%, transparent 70%); filter: blur(30px); animation: driftLeft 80s ease-in-out 10s infinite"
      />

      <svg
        class="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style="opacity: 0.13"
      >
        <polygon
          points="0,320 180,140 320,220 480,100 640,180 800,80 960,160 1120,60 1280,140 1440,90 1440,320"
          fill="#7ecba1"
        />
        <polygon
          points="0,320 100,220 240,280 380,180 520,250 660,160 800,230 940,140 1080,210 1220,130 1360,200 1440,160 1440,320"
          fill="#4a7c5e"
        />
      </svg>

      <div v-for="s in stars" :key="s.id" class="absolute w-0.5 h-0.5 rounded-full" :style="{ left: s.left, top: s.top, background: s.color, opacity: s.opacity, animation: `float ${s.duration}s ease-in-out ${s.delay}s infinite` }" />

      <img
        src="/images/character-art.png"
        alt="character"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[560px] max-w-[90vw]"
        style="opacity: 0.7; filter: drop-shadow(0 25px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(212,168,67,0.15))"
      />

      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px]"
        style="background: radial-gradient(ellipse at 50% 100%, rgba(212,168,67,0.15) 0%, rgba(126,203,161,0.1) 40%, transparent 70%); filter: blur(30px)"
      />

      <img
        src="/images/talisman-strip.png"
        alt="talisman"
        class="absolute -top-20 left-1/2 -translate-x-1/2 w-[1000px] max-w-[150vw]"
        style="opacity: 0.85; mix-blend-mode: screen; filter: drop-shadow(0 0 30px rgba(212,168,67,0.4))"
      />
    </div>

    <div class="relative z-10 w-full max-w-md px-4">
      <div
        class="game-card p-8"
        style="background: linear-gradient(145deg, rgba(22,27,34,0.92) 0%, rgba(13,17,23,0.96) 100%); border: 1px solid var(--color-border-gold); box-shadow: 0 0 40px rgba(212,168,67,0.1)"
      >
        <div class="divider-gold mb-6" />

        <div class="text-center mb-8">
          <div class="relative w-20 h-20 mx-auto mb-3">
            <div class="absolute inset-0 rounded-full" style="background: radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%); animation: pulse-gold 2s ease-in-out infinite" />
            <div class="absolute inset-2 rounded-full overflow-hidden border-2 border-[var(--color-border-gold)]" style="box-shadow: 0 0 20px rgba(212,168,67,0.3)">
              <img
                src="/images/sect-crest.png"
                alt="crest"
                class="w-full h-full"
                style="filter: drop-shadow(0 0 20px rgba(212,168,67,0.4)) saturate(1.2)"
                draggable="false"
              />
            </div>
          </div>

          <h1 class="text-2xl font-bold tracking-widest text-glow-gold mb-1">
            天道仙途
          </h1>
          <p class="text-sm" style="color: var(--color-text-muted)">
            踏入修仙之路，问鼎长生之道
          </p>

          <div class="relative w-24 h-24 mx-auto mt-4 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full" style="border: 1px solid var(--color-gold); opacity: 0.3; animation: rotateSlow 24s linear infinite; box-shadow: 0 0 10px rgba(212,168,67,0.2)" />
            <div class="absolute w-16 h-16 rounded-full" style="border: 1px dashed var(--color-gold); opacity: 0.25; animation: rotateSlow 16s linear infinite reverse" />
            <div class="w-8 h-8 rounded-full" style="background: radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%); box-shadow: 0 0 25px rgba(212,168,67,0.2)" />
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <div
              class="flex items-center gap-3 px-4 py-3 rounded-lg"
              style="background: rgba(0,0,0,0.3); border: 1px solid var(--color-border)"
            >
              <User :size="16" style="color: var(--color-text-muted); flex-shrink: 0" />
              <input
                type="text"
                class="flex-1 bg-transparent outline-none text-sm"
                style="color: var(--color-text-primary)"
                placeholder="道号（用户名）"
                v-model="username"
                autocomplete="username"
              />
            </div>
          </div>

          <div>
            <div
              class="flex items-center gap-3 px-4 py-3 rounded-lg"
              style="background: rgba(0,0,0,0.3); border: 1px solid var(--color-border)"
            >
              <Lock :size="16" style="color: var(--color-text-muted); flex-shrink: 0" />
              <input
                :type="showPwd ? 'text' : 'password'"
                class="flex-1 bg-transparent outline-none text-sm"
                style="color: var(--color-text-primary)"
                placeholder="仙缘密语（密码）"
                v-model="password"
                autocomplete="current-password"
              />
              <button type="button" @click="showPwd = !showPwd" class="shrink-0">
                <EyeOff v-if="showPwd" :size="14" style="color: var(--color-text-muted)" />
                <Eye v-else :size="14" style="color: var(--color-text-muted)" />
              </button>
            </div>
          </div>

          <div
            v-if="error"
            class="px-4 py-2 rounded-lg text-sm"
            style="background: rgba(192,57,43,0.15); color: #f87171; border: 1px solid rgba(192,57,43,0.3)"
          >
            {{ error }}
          </div>

          <Button type="submit" variant="gold" class="w-full" :loading="loading">
            踏入仙途
          </Button>
        </form>

        <div class="divider-gold my-4" />

        <Button variant="outline" class="w-full" :loading="loading" @click="handleGuest">
          以散修身份游历
        </Button>

        <div class="mt-4 text-center">
          <span class="text-xs" style="color: var(--color-text-muted)">
            尚未拜入宗门？
            <button class="hover:opacity-80" style="color: var(--color-jade)">前往注册</button>
          </span>
        </div>

        <div class="divider-gold mt-6" />
        <p class="text-center text-xs mt-2" style="color: var(--color-text-muted)">
          道法自然 · 仙途无尽
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, User, Lock } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'
import PageAtmosphere from '@/components/ui/PageAtmosphere.vue'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPwd = ref(false)

const error = computed(() => authStore.error)
const loading = computed(() => authStore.loading)

const stars = computed(() =>
  Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 53 + 7) % 65}%`,
    color: i % 3 === 0 ? '#d4a843' : '#ffffff',
    opacity: ((i * 7 + 3) % 6) * 0.08 + 0.15,
    duration: 2 + ((i * 11) % 3),
    delay: (i * 0.29) % 3,
  }))
)

const handleLogin = async () => {
  authStore.clearError()
  await authStore.login(username.value, password.value)
  if (authStore.isLoggedIn) {
    router.push('/lobby')
  }
}

const handleGuest = async () => {
  authStore.clearError()
  await authStore.guestLogin()
  router.push('/lobby')
}
</script>
