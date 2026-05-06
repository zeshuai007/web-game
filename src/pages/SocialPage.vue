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
            <Users :size="20" />
            社交
          </h2>
          <Button variant="gold" size="sm">
            <UserPlus :size="16" />
            添加好友
          </Button>
        </div>

        <Tabs :tabs="tabs" default-value="friends">
          <template #friends>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="friend in friends"
                :key="friend.id"
                class="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[rgba(212,168,67,0.05)]"
                :style="{ background: 'rgba(0,0,0,0.2)' }"
              >
                <div class="relative">
                  <div class="w-12 h-12 rounded-full overflow-hidden border-2" style="borderColor: 'var(--color-border)'">
                    <img :src="friend.avatar" alt="avatar" class="w-full h-full object-cover" />
                  </div>
                  <div
                    class="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2"
                    :style="{ background: friend.online ? '#22c55e' : '#6b7280', borderColor: 'var(--color-ink)' }"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-medium" style="color: 'var(--color-text-primary)'">{{ friend.name }}</span>
                    <Badge v-if="friend.online" variant="jade" size="sm">在线</Badge>
                  </div>
                  <div class="text-xs mt-1" style="color: 'var(--color-text-muted)'">{{ friend.sect }} · Lv.{{ friend.level }}</div>
                </div>
                <div class="flex gap-2">
                  <Button variant="outline" size="sm">聊天</Button>
                  <Button variant="outline" size="sm">组队</Button>
                </div>
              </div>
            </div>
          </template>

          <template #team>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <Card title="我的队伍">
                  <div v-if="currentTeam.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      v-for="member in currentTeam"
                      :key="member.id"
                      class="p-4 rounded-xl text-center"
                      :style="{ background: member.isLeader ? 'rgba(212,168,67,0.1)' : 'rgba(0,0,0,0.2)' }"
                    >
                      <div class="relative">
                        <div class="w-16 h-16 mx-auto rounded-full overflow-hidden border-2" :style="{ borderColor: member.isLeader ? 'var(--color-border-gold)' : 'var(--color-border)' }">
                          <img :src="member.avatar" alt="avatar" class="w-full h-full object-cover" />
                        </div>
                        <div v-if="member.isLeader" class="absolute -top-1 -right-1">
                          <Crown :size="16" style="color: 'var(--color-gold)'" />
                        </div>
                      </div>
                      <div class="font-medium mt-2" :style="{ color: member.isLeader ? 'var(--color-gold)' : 'var(--color-text-primary)' }">{{ member.name }}</div>
                      <div class="text-xs mt-1" style="color: 'var(--color-text-muted)'">{{ member.sect }} · Lv.{{ member.level }}</div>
                      <div class="text-sm font-bold mt-2" style="color: '#f59e0b'">{{ member.power }} 战力</div>
                    </div>
                  </div>
                  <div v-else class="text-center py-8">
                    <Users :size="48" style="color: 'var(--color-text-muted)'; margin: 0 auto 4px" />
                    <p style="color: 'var(--color-text-muted)'">暂无队伍成员</p>
                    <Button variant="gold" class="mt-4">创建队伍</Button>
                  </div>
                </Card>
              </div>

              <div>
                <Card title="队伍活动">
                  <div class="space-y-3">
                    <div class="p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                      <div class="flex items-center gap-2 mb-2">
                        <MapPin :size="16" style="color: '#f87171'" />
                        <span class="text-sm font-medium" style="color: 'var(--color-text-primary)'">秘境探索</span>
                      </div>
                      <p class="text-xs" style="color: 'var(--color-text-muted)'">需要3名队员</p>
                      <Button variant="outline" size="sm" class="w-full mt-2">加入</Button>
                    </div>
                    <div class="p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                      <div class="flex items-center gap-2 mb-2">
                        <Swords :size="16" style="color: '#f59e0b'" />
                        <span class="text-sm font-medium" style="color: 'var(--color-text-primary)'">宗门战</span>
                      </div>
                      <p class="text-xs" style="color: 'var(--color-text-muted)'">需要5名队员</p>
                      <Button variant="outline" size="sm" class="w-full mt-2">报名</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </template>

          <template #sect>
            <Card title="天道宗">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 rounded-xl flex items-center justify-center" style="background: 'rgba(212,168,67,0.2)'">
                  <Castle :size="32" style="color: 'var(--color-gold)'" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-glow-gold">天道宗</h3>
                  <p class="text-sm" style="color: 'var(--color-text-muted)'">宗主: 天道至尊 · 成员: 128人</p>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="text-center p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="text-2xl font-bold" style="color: 'var(--color-gold)'">128</div>
                  <div class="text-xs mt-1" style="color: 'var(--color-text-muted)'">成员</div>
                </div>
                <div class="text-center p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="text-2xl font-bold" style="color: '#a78bfa'">Lv.15</div>
                  <div class="text-xs mt-1" style="color: 'var(--color-text-muted)'">宗门等级</div>
                </div>
                <div class="text-center p-4 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="text-2xl font-bold" style="color: '#f59e0b'">1st</div>
                  <div class="text-xs mt-1" style="color: 'var(--color-text-muted)'">排名</div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Scroll :size="16" style="color: 'var(--color-gold)'" />
                    <span style="color: 'var(--color-text-primary)'">宗门公告</span>
                  </div>
                  <span class="text-xs" style="color: 'var(--color-text-muted)'">刚刚</span>
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Users :size="16" style="color: '#a78bfa'" />
                    <span style="color: 'var(--color-text-primary)'">宗门成员列表</span>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
                <div class="flex items-center justify-between p-3 rounded-lg" style="background: 'rgba(0,0,0,0.2)'">
                  <div class="flex items-center gap-2">
                    <Swords :size="16" style="color: '#f87171'" />
                    <span style="color: 'var(--color-text-primary)'">宗门战报名</span>
                  </div>
                  <ChevronRight :size="18" style="color: 'var(--color-text-muted)'" />
                </div>
              </div>
            </Card>
          </template>

          <template #chat>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-1">
                <div class="space-y-2">
                  <div
                    v-for="chat in chats"
                    :key="chat.id"
                    class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                    :class="activeChat === chat.id ? 'bg-[rgba(212,168,67,0.15) border border-[var(--color-border-gold)]' : 'bg-[rgba(0,0,0,0.2) hover:bg-[rgba(212,168,67,0.05)]'"
                    @click="activeChat = chat.id"
                  >
                    <div class="relative">
                      <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img :src="chat.avatar" alt="avatar" class="w-full h-full object-cover" />
                      </div>
                      <div
                        v-if="chat.unread > 0"
                        class="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center"
                        style="background: 'var(--color-danger)'; color: 'white'"
                      >
                        {{ chat.unread }}
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-sm truncate" style="color: 'var(--color-text-primary)'">{{ chat.name }}</div>
                      <div class="text-xs truncate" style="color: 'var(--color-text-muted)'">{{ chat.lastMessage }}</div>
                    </div>
                    <div class="text-xs" style="color: 'var(--color-text-muted)'">{{ chat.time }}</div>
                  </div>
                </div>
              </div>

              <div class="md:col-span-2">
                <Card v-if="selectedChat" :title="selectedChat.name" :no-padding="true">
                  <div class="p-4 h-64 overflow-y-auto space-y-4">
                    <div
                      v-for="msg in selectedChat.messages"
                      :key="msg.id"
                      class="flex"
                      :class="msg.isSelf ? 'justify-end' : 'justify-start'"
                    >
                      <div
                        class="max-w-xs p-3 rounded-xl"
                        :style="{ background: msg.isSelf ? 'rgba(212,168,67,0.2)' : 'rgba(0,0,0,0.3)', border: msg.isSelf ? '1px solid rgba(212,168,67,0.3)' : '1px solid var(--color-border)' }"
                      >
                        <p class="text-sm" style="color: 'var(--color-text-primary)'">{{ msg.content }}</p>
                        <div class="text-xs mt-1 text-right" style="color: 'var(--color-text-muted)'">{{ msg.time }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="p-4" style="borderTop: '1px solid var(--color-border)'">
                    <div class="flex gap-2">
                      <input
                        v-model="messageInput"
                        type="text"
                        class="flex-1 px-4 py-2 rounded-lg outline-none"
                        style="background: 'rgba(0,0,0,0.3)'; border: '1px solid var(--color-border)'; color: 'var(--color-text-primary)'"
                        placeholder="输入消息..."
                        @keyup.enter="sendMessage"
                      />
                      <Button variant="gold" @click="sendMessage">发送</Button>
                    </div>
                  </div>
                </Card>
                <Card v-else class="h-80 flex items-center justify-center">
                  <div class="text-center">
                    <MessageCircle :size="48" style="color: 'var(--color-text-muted)'; margin: 0 auto 4px" />
                    <p style="color: 'var(--color-text-muted)'">选择一个聊天开始对话</p>
                  </div>
                </Card>
              </div>
            </div>
          </template>
        </Tabs>
      </Card>
    </div>
  </GameLayout>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import GameLayout from '@/components/layouts/GameLayout.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Tabs from '@/components/ui/Tabs.vue'
import { Users, UserPlus, Crown, MapPin, Swords, Castle, Scroll, ChevronRight, MessageCircle } from 'lucide-vue-next'

const tabs = [
  { label: '好友', value: 'friends' },
  { label: '队伍', value: 'team' },
  { label: '宗门', value: 'sect' },
  { label: '聊天', value: 'chat' },
]

const friends = [
  { id: 1, name: '青云剑仙', sect: '青云门', level: 90, avatar: '/images/character-art.png', online: true },
  { id: 2, name: '蜀山剑侠', sect: '蜀山派', level: 85, avatar: '/images/character-art.png', online: true },
  { id: 3, name: '昆仑道长', sect: '昆仑派', level: 82, avatar: '/images/character-art.png', online: false },
  { id: 4, name: '蓬莱仙子', sect: '蓬莱仙岛', level: 80, avatar: '/images/character-art.png', online: false },
]

const currentTeam = [
  { id: 1, name: '天道仙人', sect: '天道宗', level: 88, power: 188888, avatar: '/images/character-art.png', isLeader: true },
  { id: 2, name: '青云剑仙', sect: '青云门', level: 90, power: 666666, avatar: '/images/character-art.png', isLeader: false },
  { id: 3, name: '蜀山剑侠', sect: '蜀山派', level: 85, power: 166666, avatar: '/images/character-art.png', isLeader: false },
]

const activeChat = ref(1)

const chats = [
  { id: 1, name: '青云剑仙', avatar: '/images/character-art.png', lastMessage: '明天一起探索秘境吧', time: '10分钟前', unread: 3 },
  { id: 2, name: '天道宗', avatar: '/images/character-art.png', lastMessage: '宗主发布了新公告', time: '1小时前', unread: 1 },
  { id: 3, name: '队伍频道', avatar: '/images/character-art.png', lastMessage: '准备好了吗？', time: '2小时前', unread: 0 },
]

const selectedChat = computed(() => {
  return {
    name: '青云剑仙',
    messages: [
      { id: 1, content: '最近修炼进展如何？', time: '10:00', isSelf: false },
      { id: 2, content: '还不错，正在冲击渡劫期', time: '10:01', isSelf: true },
      { id: 3, content: '厉害！需要帮忙吗？', time: '10:02', isSelf: false },
      { id: 4, content: '好的，明天一起探索秘境吧', time: '10:05', isSelf: false },
    ],
  }
})

const messageInput = ref('')

const sendMessage = () => {
  if (messageInput.value.trim()) {
    console.log('发送消息:', messageInput.value)
    messageInput.value = ''
  }
}
</script>
