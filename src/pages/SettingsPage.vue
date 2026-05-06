<template>
  <GameLayout
    username="天道仙人"
    :level="88"
    sect="天道宗"
    :spirit-stones="12888"
    :stamina="88"
    :activity="75"
    :notification-count="3"
  >
    <div class="space-y-6">
      <Card :glow="true">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-glow-gold flex items-center gap-2">
            <SettingsIcon :size="20" />
            设置
          </h2>
        </div>

        <Tabs :tabs="tabs" default-value="basic">
          <template #basic>
            <Card title="账号信息">
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-lg overflow-hidden border-2" style="borderColor: 'var(--color-border-gold)'">
                    <img src="/images/character-art.png" alt="avatar" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-lg" style="color: 'var(--color-text-primary)'">天道仙人</div>
                    <div class="text-sm" style="color: 'var(--color-text-muted)'">ID: 123456789</div>
                  </div>
                  <Button variant="outline" size="sm">更换头像</Button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="text-sm mb-1 block" style="color: 'var(--color-text-secondary)'">昵称</label>
                    <input
                      v-model="settings.nickname"
                      type="text"
                      class="w-full px-4 py-2 rounded-lg outline-none"
                      style="background: 'rgba(0,0,0,0.3)'; border: '1px solid var(--color-border)'; color: 'var(--color-text-primary)'"
                    />
                  </div>
                  <div>
                    <label class="text-sm mb-1 block" style="color: 'var(--color-text-secondary)'">宗门</label>
                    <input
                      v-model="settings.sect"
                      type="text"
                      class="w-full px-4 py-2 rounded-lg outline-none"
                      style="background: 'rgba(0,0,0,0.3)'; border: '1px solid var(--color-border)'; color: 'var(--color-text-primary)'"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card title="绑定信息">
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Mail :size="16" style="color: '#60a5fa'" />
                    <span style="color: 'var(--color-text-primary)'">邮箱</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span style="color: 'var(--color-text-muted)'">未绑定</span>
                    <Button variant="outline" size="sm">绑定</Button>
                  </div>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Phone :size="16" style="color: '#22c55e'" />
                    <span style="color: 'var(--color-text-primary)'">手机</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span style="color: 'var(--color-text-muted)'">已绑定</span>
                    <Button variant="outline" size="sm">更换</Button>
                  </div>
                </div>
              </div>
            </Card>
          </template>

          <template #game>
            <Card title="游戏设置">
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-3">
                    <Volume2 :size="20" style="color: '#fbbf24'" />
                    <div>
                      <div style="color: 'var(--color-text-primary)'">背景音乐</div>
                      <div class="text-xs" style="color: 'var(--color-text-muted)'">调整游戏背景音乐音量</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <input
                      type="range"
                      v-model="settings.musicVolume"
                      min="0"
                      max="100"
                      class="w-24"
                    />
                    <span class="text-sm" style="color: 'var(--color-text-muted)'">{{ settings.musicVolume }}%</span>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-3">
                    <VolumeX :size="20" style="color: '#fbbf24'" />
                    <div>
                      <div style="color: 'var(--color-text-primary)'">音效</div>
                      <div class="text-xs" style="color: 'var(--color-text-muted)'">调整游戏音效音量</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <input
                      type="range"
                      v-model="settings.sfxVolume"
                      min="0"
                      max="100"
                      class="w-24"
                    />
                    <span class="text-sm" style="color: 'var(--color-text-muted)'">{{ settings.sfxVolume }}%</span>
                  </div>
                </div>

                <div class="flex items-center justify-between p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-3">
                    <Monitor :size="20" style="color: '#a78bfa'" />
                    <div>
                      <div style="color: 'var(--color-text-primary)'">特效品质</div>
                      <div class="text-xs" style="color: 'var(--color-text-muted)'">调整游戏特效显示品质</div>
                    </div>
                  </div>
                  <select
                    v-model="settings.effectsQuality"
                    class="px-3 py-1.5 rounded-lg outline-none"
                    style="background: 'rgba(0,0,0,0.3)'; border: '1px solid var(--color-border)'; color: 'var(--color-text-primary)'"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                    <option value="ultra">极致</option>
                  </select>
                </div>

                <div class="flex items-center justify-between p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-3">
                    <Bell :size="20" style="color: '#60a5fa'" />
                    <div>
                      <div style="color: 'var(--color-text-primary)'">游戏通知</div>
                      <div class="text-xs" style="color: 'var(--color-text-muted)'">接收游戏内通知提醒</div>
                    </div>
                  </div>
                  <button
                    class="w-12 h-6 rounded-full transition-colors"
                    :class="settings.notifications ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'"
                    @click="settings.notifications = !settings.notifications"
                  >
                    <div
                      class="w-5 h-5 rounded-full bg-white transition-transform"
                      :class="settings.notifications ? 'translate-x-6' : 'translate-x-0.5'"
                    />
                  </button>
                </div>

                <div class="flex items-center justify-between p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-3">
                    <Moon :size="20" style="color: '#a78bfa'" />
                    <div>
                      <div style="color: 'var(--color-text-primary)'">深色模式</div>
                      <div class="text-xs" style="color: 'var(--color-text-muted)'">使用深色主题界面</div>
                    </div>
                  </div>
                  <button
                    class="w-12 h-6 rounded-full transition-colors"
                    :class="settings.darkMode ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-border)]'"
                    @click="settings.darkMode = !settings.darkMode"
                  >
                    <div
                      class="w-5 h-5 rounded-full bg-white transition-transform"
                      :class="settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'"
                    />
                  </button>
                </div>
              </div>
            </Card>
          </template>

          <template #controls>
            <Card title="操作设置">
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div>
                    <div style="color: 'var(--color-text-primary)'">快捷技能栏</div>
                    <div class="text-xs" style="color: 'var(--color-text-muted)'">设置技能快捷键</div>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div>
                    <div style="color: 'var(--color-text-primary)'">自动战斗</div>
                    <div class="text-xs" style="color: 'var(--color-text-muted)'">设置自动战斗行为</div>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div>
                    <div style="color: 'var(--color-text-primary)'">拾取设置</div>
                    <div class="text-xs" style="color: 'var(--color-text-muted)'">设置自动拾取规则</div>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div>
                    <div style="color: 'var(--color-text-primary)'">镜头设置</div>
                    <div class="text-xs" style="color: 'var(--color-text-muted)'">调整视角和镜头</div>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
              </div>
            </Card>
          </template>

          <template #other>
            <Card title="其他">
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <HelpCircle :size="16" style="color: '#60a5fa'" />
                    <span style="color: 'var(--color-text-primary)'">帮助中心</span>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <FileText :size="16" style="color: '#22c55e'" />
                    <span style="color: 'var(--color-text-primary)'">用户协议</span>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Shield :size="16" style="color: '#f59e0b'" />
                    <span style="color: 'var(--color-text-primary)'">隐私政策</span>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Bug :size="16" style="color: '#f87171'" />
                    <span style="color: 'var(--color-text-primary)'">反馈问题</span>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
              </div>
            </Card>

            <Card title="关于">
              <div class="text-center py-4">
                <div class="text-lg font-bold text-glow-gold mb-2">天道仙途</div>
                <div class="text-sm" style="color: 'var(--color-text-muted)'">版本 1.0.0</div>
                <div class="text-xs mt-2" style="color: 'var(--color-text-muted)'">Copyright 2024</div>
              </div>
            </Card>

            <Card>
              <Button variant="danger" class="w-full">退出登录</Button>
            </Card>
          </template>
        </Tabs>
      </Card>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { reactive, markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Tabs from '@/components/ui/Tabs.vue'
import { Settings as SettingsIcon, Mail, Phone, Volume2, VolumeX, Monitor, Bell, Moon, ChevronRight, HelpCircle, FileText, Shield, Bug } from 'lucide-vue-next'

const tabs = [
  { label: '基础', value: 'basic' },
  { label: '游戏', value: 'game' },
  { label: '操作', value: 'controls' },
  { label: '其他', value: 'other' },
]

const settings = reactive({
  nickname: '天道仙人',
  sect: '天道宗',
  musicVolume: 80,
  sfxVolume: 70,
  effectsQuality: 'high',
  notifications: true,
  darkMode: true,
})
</script>
